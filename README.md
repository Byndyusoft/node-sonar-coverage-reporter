# node-sonar-coverage-reporter

[![npm@latest](https://img.shields.io/npm/v/@byndyusoft/sonar-coverage-reporter/latest.svg)](https://www.npmjs.com/package/@byndyusoft/sonar-coverage-reporter)
[![test](https://github.com/Byndyusoft/node-sonar-coverage-reporter/actions/workflows/test.yaml/badge.svg?branch=master)](https://github.com/Byndyusoft/node-sonar-coverage-reporter/actions/workflows/test.yaml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

SonarQube coverage reporter for Istanbul

## Requirements

- Node.js v14 LTS or later
- npm or yarn

## Install

```bash
npm install --save-dev @byndyusoft/sonar-coverage-reporter
```

or

```bash
yarn add --dev @byndyusoft/sonar-coverage-reporter
```

## Usage

Add coverage reporter to your Jest configuration:

```json
{ "coverageReporters": ["@byndyusoft/sonar-coverage-reporter"] }
```

With [options](./src/sonarCoverageReporterOptionsInterface.ts):

```json
{
  "coverageReporters": [
    ["@byndyusoft/sonar-coverage-reporter", { "threshold": 100 }]
  ]
}
```

## Maintainers

- [@Byndyusoft/owners](https://github.com/orgs/Byndyusoft/teams/owners) <<github.maintain@byndyusoft.com>>
- [@Byndyusoft/team](https://github.com/orgs/Byndyusoft/teams/team)
- [@KillWolfVlad](https://github.com/KillWolfVlad)

## License

This repository is released under version 2.0 of the
[Apache License](https://www.apache.org/licenses/LICENSE-2.0).
