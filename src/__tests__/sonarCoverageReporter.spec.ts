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

import { CoverageSummary, Totals } from "istanbul-lib-coverage";
import {
  Context,
  FileWriter as FileWriterType,
  ReportNode,
} from "istanbul-lib-report";
import { mock } from "jest-mock-extended";

import { SonarCoverageReporter } from "~/src/sonarCoverageReporter";

const FileWriter =
  // eslint-disable-next-line @typescript-eslint/no-var-requires,node/global-require
  require("istanbul-lib-report/lib/file-writer") as typeof FileWriterType;

function makeReportNode(options: {
  lines: Pick<Totals, "total" | "covered">;
  branches: Pick<Totals, "total" | "covered">;
}): ReportNode {
  const node = mock<ReportNode>();

  node.getCoverageSummary.mockImplementation(() => {
    const coverageSummary = mock<CoverageSummary>();

    coverageSummary.lines = options.lines as Totals;
    coverageSummary.branches = options.branches as Totals;

    return coverageSummary;
  });

  return node;
}

function makeContext(): Context {
  const context = mock<Context>();

  context.writer = new FileWriter("coverage");

  return context;
}

describe("SonarCoverageReporter", () => {
  beforeAll(() => {
    FileWriter.startCapture();
  });

  beforeEach(() => {
    FileWriter.resetOutput();
  });

  afterAll(() => {
    FileWriter.stopCapture();
  });

  it("must print success message", () => {
    new SonarCoverageReporter().onStart(
      makeReportNode({
        lines: {
          total: 100,
          covered: 100,
        },
        branches: {
          total: 100,
          covered: 100,
        },
      }),
      makeContext(),
    );

    expect(FileWriter.getOutput()).toMatchInlineSnapshot(`
      "[32;1mSonar coverage: 100%[0m
      ================================================================================
      "
    `);
  });

  it("must print failure message", () => {
    new SonarCoverageReporter().onStart(
      makeReportNode({
        lines: {
          total: 1226,
          covered: 900,
        },
        branches: {
          total: 194,
          covered: 96,
        },
      }),
      makeContext(),
    );

    expect(FileWriter.getOutput()).toMatchInlineSnapshot(`
      "[31;1mSonar coverage: 70.1%[0m
      ================================================================================
      "
    `);
  });
});
