/*
 * Copyright 2022 Byndyusoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { CoverageSummary } from "istanbul-lib-coverage";
import { Context, ReportBase, ReportNode } from "istanbul-lib-report";

import { ISonarCoverageReporterOptions } from "./sonarCoverageReporterOptionsInterface";

export class SonarCoverageReporter extends ReportBase {
  private readonly __threshold: number;

  public constructor(options?: ISonarCoverageReporterOptions) {
    super();

    this.__threshold = options?.threshold ?? 80;
  }

  private static __calculateCoverage(summary: CoverageSummary): number {
    // Algorithm was found here https://github.com/Waidd/sonarcov-watchdog/blob/3907a8e597fd9d3058beb4366d937f990b0d9b2b/src/index.js#L40-L57

    const linesFound = summary.lines.total;
    const linesHit = summary.lines.covered;
    const branchesFound = summary.branches.total;
    const branchesHit = summary.branches.covered;

    let coverage =
      ((branchesHit + linesHit) / (branchesFound + linesFound)) * 100;

    coverage = Math.round(coverage * 10) / 10;

    return coverage;
  }

  public onStart(node: ReportNode, context: Context): void {
    const summary = node.getCoverageSummary(false);
    const cw = context.writer.writeFile(null);

    const coverage = SonarCoverageReporter.__calculateCoverage(summary);
    const color = this.__getColorForCoverage(coverage);

    cw.println(cw.colorize(`Sonar coverage: ${coverage}%`, color));
    cw.println(Array.from({ length: 80 }).fill("=").join(""));
    cw.close();
  }

  private __getColorForCoverage(coverage: number): "low" | "high" | "medium" {
    if (coverage < this.__threshold) {
      return "low";
    }

    return "high";
  }
}
