Directory structure:
└── gamote-lottie-react/
    ├── README.md
    ├── CODE_OF_CONDUCT.md
    ├── CONTRIBUTING.md
    ├── doczrc.js
    ├── jest.config.ts
    ├── LICENSE
    ├── package.json
    ├── rollup.config.js
    ├── tsconfig.eslint.json
    ├── tsconfig.json
    ├── .babelrc
    ├── .eslintrc.js
    ├── .nvmrc
    ├── .prettierrc.json
    ├── .travis.yml
    ├── docs/
    │   ├── assets/
    │   │   ├── groovyWalk.json
    │   │   ├── hamster.json
    │   │   ├── likeButton.json
    │   │   └── robotAnimation.json
    │   ├── components/
    │   │   └── Lottie/
    │   │       ├── LottieExamples.js
    │   │       ├── LottieWithInteractivity.js
    │   │       └── README.mdx
    │   └── hooks/
    │       ├── useLottie/
    │       │   ├── README.mdx
    │       │   └── UseLottieExamples.js
    │       └── useLottieInteractivity/
    │           ├── CursorDiagonalSync.js
    │           ├── CursorHorizontalSync.js
    │           ├── PlaySegmentsOnHover.js
    │           ├── README.mdx
    │           ├── ScrollWithOffset.js
    │           ├── ScrollWithOffsetAndLoop.js
    │           └── UseInteractivityBasic.js
    ├── src/
    │   ├── globals.d.ts
    │   ├── index.tsx
    │   ├── types.ts
    │   ├── __tests__/
    │   │   ├── Lottie.test.tsx
    │   │   ├── useLottie.test.tsx
    │   │   ├── useLottieInteractivity.test.tsx
    │   │   └── assets/
    │   │       └── groovyWalk.json
    │   ├── components/
    │   │   └── Lottie.ts
    │   └── hooks/
    │       ├── useLottie.tsx
    │       └── useLottieInteractivity.tsx
    └── .github/
        ├── FUNDING.yml
        └── ISSUE_TEMPLATE/
            ├── bug_report.md
            ├── custom.md
            └── feature_request.md


Files Content:

(Files content cropped to 300k characters, download full ingest to see more)
================================================
FILE: README.md
================================================
# lottie-react

[![npm version](https://img.shields.io/npm/v/lottie-react)](https://www.npmjs.com/package/lottie-react) [![npm downloads/month](https://img.shields.io/npm/dm/lottie-react)](https://www.npmjs.com/package/lottie-react) [![Known Vulnerabilities](https://snyk.io/test/github/Gamote/lottie-react/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Gamote/lottie-react?targetFile=package.json) [![Coverage Status](https://coveralls.io/repos/github/Gamote/lottie-react/badge.svg?branch=master)](https://coveralls.io/github/Gamote/lottie-react?branch=master) [![Tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Gamote/lottie-react/blob/master/LICENSE)

This project is meant to give developers full control over **[Lottie](https://airbnb.design/lottie/)** instance with minimal implementation by wrapping **[lottie-web](https://github.com/airbnb/lottie-web)** in a Component or Hook that can be easily used in **React** applications.

## Installation

1. Make sure you have the peer-dependencies installed: `react` and `react-dom`.

    > _**Note:** This library is using React Hooks so the **minimum** version required for both **react** and **react-dom** is **v16.8.0**._

2. Install `lottie-react` using **yarn**

    ```shell
    yarn add lottie-react
    ```
   
    or **npm**

    ```shell
    npm i lottie-react
    ```

## Usage

### Using the component ([try it](https://codesandbox.io/s/lottie-react-component-2k13t))

```tsx
import React from "react";
import Lottie from "lottie-react";
import groovyWalkAnimation from "./groovyWalk.json";

const App = () => <Lottie animationData={groovyWalkAnimation} loop={true} />;

export default App;
```

### Using the Hook ([try it](https://codesandbox.io/s/lottie-react-hook-13nio))

```tsx
import React from "react";
import { useLottie } from "lottie-react";
import groovyWalkAnimation from "./groovyWalk.json";

const App = () => {
  const options = {
    animationData: groovyWalkAnimation,
    loop: true
  };

  const { View } = useLottie(options);

  return <>{View}</>;
};

export default App;
```

### 📄 Documentation

Checkout the [**documentation**](https://lottiereact.com) at [**https://lottiereact.com**](https://lottiereact.com) for more information and examples.

## Tests

Run the tests using the `yarn test` command.

### Coverage report
```text
-----------------------------|---------|----------|---------|---------|-------------------
File                         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------------|---------|----------|---------|---------|-------------------
All files                    |     100 |      100 |     100 |     100 |                   
 components                  |     100 |      100 |     100 |     100 |                   
  Lottie.ts                  |     100 |      100 |     100 |     100 |                   
 hooks                       |     100 |      100 |     100 |     100 |                   
  useLottie.tsx              |     100 |      100 |     100 |     100 |                   
  useLottieInteractivity.tsx |     100 |      100 |     100 |     100 |                   
-----------------------------|---------|----------|---------|---------|-------------------
```

## Contribution

Any **questions** or **suggestions**? Use the [**Discussions**](https://github.com/Gamote/lottie-react/discussions) tab. Any **issues**? Don't hesitate to document it in the [**Issues**](https://github.com/Gamote/lottie-react/issues) tab, and we will do our best to investigate it and fix it. Any **solutions**? You are very welcomed to open a [**pull request**](https://github.com/Gamote/lottie-react/pulls).

> 👩‍💻 `v3` is under development and is planning to bring a lot of features and improvements. But unfortunately, at the moment all the maintainers are super busy with work related projects. You can check out the progress under the `v3` branch. And of course, you are encouraged to contribute. :)

Thank you for investing your time in contributing to our project! ✨

## Projects to check out

- [lottie-web](https://github.com/airbnb/lottie-web) - Lottie implementation for Web. Our project is based on it, and you might want to check it out in order to have a better understanding on what's behind this package or what features could you expect to have in the future.
- [lottie-android](https://github.com/airbnb/lottie-android) - Lottie implementation for Android
- [lottie-ios](https://github.com/airbnb/lottie-ios) - Lottie implementation for iOS
- [lottie-react-native](https://github.com/react-native-community/lottie-react-native) - Lottie implementation for React Native
- [LottieFiles](https://lottiefiles.com/) - Are you looking for animations files? LottieFiles has a lot of them!

## License

**lottie-react** is available under the [MIT license](https://github.com/Gamote/lottie-react/blob/main/LICENSE).

Thanks to [David Probst Jr](https://lottiefiles.com/davidprobstjr) for the animations used in the examples.



================================================
FILE: CODE_OF_CONDUCT.md
================================================
# Contributor Covenant Code of Conduct

## Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, sex characteristics, gender identity and expression,
level of experience, education, socio-economic status, nationality, personal
appearance, race, religion, or sexual identity and orientation.

## Our Standards

Examples of behavior that contributes to creating a positive environment
include:

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

* The use of sexualized language or imagery and unwelcome sexual attention or
 advances
* Trolling, insulting/derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or electronic
 address, without explicit permission
* Other conduct which could reasonably be considered inappropriate in a
 professional setting

## Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behavior and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned to this Code of Conduct, or to ban temporarily or
permanently any contributor for other behaviors that they deem inappropriate,
threatening, offensive, or harmful.

## Scope

This Code of Conduct applies both within project spaces and in public spaces
when an individual is representing the project or its community. Examples of
representing a project or community include using an official project e-mail
address, posting via an official social media account, or acting as an appointed
representative at an online or offline event. Representation of a project may be
further defined and clarified by project maintainers.

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported by contacting the project team at contact@gamote.ro. All
complaints will be reviewed and investigated and will result in a response that
is deemed necessary and appropriate to the circumstances. The project team is
obligated to maintain confidentiality with regard to the reporter of an incident.
Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good
faith may face temporary or permanent repercussions as determined by other
members of the project's leadership.

## Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4,
available at https://www.contributor-covenant.org/version/1/4/code-of-conduct.html

[homepage]: https://www.contributor-covenant.org

For answers to common questions about this code of conduct, see
https://www.contributor-covenant.org/faq


================================================
FILE: CONTRIBUTING.md
================================================
# CONTRIBUTING

Let us know if you have any suggestions or contributions. This package has the mission to help developers, so if you have any features that you think we should prioritize, reach out to us.


================================================
FILE: doczrc.js
================================================
export default {
  menu: ["Components", "Hooks"],
  src: "docs",
  dest: "docs-dist",
  base: "/", // GitHub Pages sub-path
  ignore: ["README.md"],
  title: "Lottie for React",
  themeConfig: {
    initialColorMode: "light",
  },
};



================================================
FILE: jest.config.ts
================================================
import type { Config } from "@jest/types";

export default async (): Promise<Config.InitialOptions> => {
  return {
    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ["<rootDir>/src"],

    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },

    // Runs special logic, such as cleaning up components
    // when using React Testing Library and adds special
    // extended assertions to Jest
    setupFilesAfterEnv: [
      // "@testing-library/react/cleanup-after-each",
      "@testing-library/jest-dom/extend-expect",
      "jest-canvas-mock",
    ],

    // Test spec file resolution pattern
    // Matches parent folder `__tests__` and filename
    // should contain `test` or `spec`.
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

    // Module file extensions for importing
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

    // All imported modules in your tests should be mocked automatically
    // automock: false,

    // Stop running tests after `n` failures
    // bail: 0,

    // The directory where Jest should store its cached dependency information
    // cacheDirectory: "/private/var/folders/t5/3rr3f6y11j33hb3zrmm66nh80000gn/T/jest_dx",

    // Automatically clear mock calls and instances between every test
    // clearMocks: true,

    // Indicates whether the coverage information should be collected while executing the test
    // collectCoverage: false,

    // An array of glob patterns indicating a set of files for which coverage information should be collected
    // collectCoverageFrom: undefined,

    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",

    // An array of regexp pattern strings used to skip coverage collection
    // coveragePathIgnorePatterns: [
    //   "/node_modules/"
    // ],

    // A list of reporter names that Jest uses when writing coverage reports
    // coverageReporters: [
    //   "json",
    //   "text",
    //   "lcov",
    //   "clover"
    // ],

    // An object that configures minimum threshold enforcement for coverage results
    // coverageThreshold: undefined,

    // A path to a custom dependency extractor
    // dependencyExtractor: undefined,

    // Make calling deprecated APIs throw helpful error messages
    // errorOnDeprecated: false,

    // Force coverage collection from ignored files using an array of glob patterns
    // forceCoverageMatch: [],

    // A path to a module which exports an async function that is triggered once before all test suites
    // globalSetup: undefined,

    // A path to a module which exports an async function that is triggered once after all test suites
    // globalTeardown: undefined,

    // A set of global variables that need to be available in all test environments
    globals: {
      "ts-jest": {
        diagnostics: false,
      },
    },

    // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
    // maxWorkers: "50%",

    // An array of directory names to be searched recursively up from the requiring module's location
    // moduleDirectories: [
    //   "node_modules"
    // ],

    // An array of file extensions your modules use
    // moduleFileExtensions: [
    //   "js",
    //   "json",
    //   "jsx",
    //   "ts",
    //   "tsx",
    //   "node"
    // ],

    // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
    // moduleNameMapper: {},

    // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
    // modulePathIgnorePatterns: [],

    // Activates notifications for test results
    // notify: false,

    // An enum that specifies notification mode. Requires { notify: true }
    // notifyMode: "failure-change",

    // A preset that is used as a base for Jest's configuration
    // preset: undefined,

    // Run tests from one or more projects
    // projects: undefined,

    // Use this configuration option to add custom reporters to Jest
    // reporters: undefined,

    // Automatically reset mock state between every test
    // resetMocks: false,

    // Reset the module registry before running each individual test
    // resetModules: false,

    // A path to a custom resolver
    // resolver: undefined,

    // Automatically restore mock state between every test
    // restoreMocks: false,

    // The root directory that Jest should scan for tests and modules within
    // rootDir: undefined,

    // A list of paths to directories that Jest should use to search for files in
    // roots: [
    //   "<rootDir>"
    // ],

    // Allows you to use a custom runner instead of Jest's default test runner
    // runner: "jest-runner",

    // The paths to modules that run some code to configure or set up the testing environment before each test
    // setupFiles: [],

    // A list of paths to snapshot serializer modules Jest should use for snapshot testing
    // snapshotSerializers: [],

    // The test environment that will be used for testing
    // testEnvironment: "jest-environment-jsdom",

    // Options that will be passed to the testEnvironment
    // testEnvironmentOptions: {},

    // Adds a location field to test results
    // testLocationInResults: false,

    // The glob patterns Jest uses to detect test files
    // testMatch: [
    //   "**/__tests__/**/*.[jt]s?(x)",
    //   "**/?(*.)+(spec|test).[tj]s?(x)"
    // ],

    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    // testPathIgnorePatterns: [
    //   "/node_modules/"
    // ],

    // The regexp pattern or array of patterns that Jest uses to detect test files
    // testRegex: [],

    // This option allows the use of a custom results processor
    // testResultsProcessor: undefined,

    // This option allows use of a custom test runner
    // testRunner: "jasmine2",

    // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
    // testURL: "http://localhost",

    // Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"
    // timers: "real",

    // A map from regular expressions to paths to transformers
    // transform: undefined,

    // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
    // transformIgnorePatterns: [
    //   "/node_modules/"
    // ],

    // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
    // unmockedModulePathPatterns: undefined,

    // Indicates whether each individual test should be reported during the run
    // verbose: undefined,

    // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
    // watchPathIgnorePatterns: [],

    // Whether to use watchman for file crawling
    // watchman: true,
  };
};



================================================
FILE: LICENSE
================================================
The MIT License

Copyright David Gamote and other contributors.

This software consists of voluntary contributions made by many
individuals. For exact contribution history, see the revision history
available on GitHub.

The following license applies to all parts of this software except as
documented below:

====

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

====

Copyright and related rights for sample code are waived via CC0. Sample
code is defined as all source code displayed within the prose of the
documentation.

CC0: http://creativecommons.org/publicdomain/zero/1.0/

====

Files located in the node_modules and vendor directories are externally
maintained libraries used by this software which have their own
licenses; we recommend you read them, as their terms may differ from the
terms above.



================================================
FILE: package.json
================================================
{
  "name": "lottie-react",
  "version": "2.4.1",
  "description": "Lottie for React",
  "keywords": [
    "lottie",
    "react",
    "lottie react",
    "react lottie",
    "lottie web",
    "animation",
    "component",
    "hook"
  ],
  "homepage": "https://lottiereact.com",
  "bugs": {
    "url": "https://github.com/Gamote/lottie-react/issues"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Gamote/lottie-react.git"
  },
  "license": "MIT",
  "author": "David Gamote",
  "main": "build/index.js",
  "module": "build/index.es.js",
  "browser": "build/index.umd.js",
  "types": "build/index.d.ts",
  "style": "build/index.css",
  "files": [
    "/build"
  ],
  "scripts": {
    "build": "run-s tsc:compile rollup:compile",
    "postbuild": "npm pack && tar -xvzf *.tgz && rm -rf package *.tgz",
    "build:watch": "run-p tsc:compile:watch rollup:compile:watch",
    "coverage": "jest --coverage && cat ./coverage/lcov.info | coveralls",
    "docz:build": "docz build",
    "deploy:docs": "echo 'lottiereact.com' > ./docs-dist/CNAME && gh-pages -d docs-dist",
    "docz:dev": "docz dev",
    "docz:serve": "docz build && docz serve",
    "prepublishOnly": "rm -rf build && yarn build",
    "rollup:compile": "rollup -c",
    "rollup:compile:watch": "rollup -c -w",
    "test": "jest",
    "test:watch": "jest --watch",
    "tsc:compile": "tsc",
    "tsc:compile:watch": "tsc --watch"
  },
  "dependencies": {
    "lottie-web": "^5.10.2"
  },
  "devDependencies": {
    "@babel/core": "^7.16.7",
    "@babel/preset-env": "^7.16.8",
    "@babel/preset-react": "^7.16.7",
    "@jest/types": "^27.4.2",
    "@rollup/plugin-commonjs": "^21.0.1",
    "@rollup/plugin-node-resolve": "^13.1.3",
    "@testing-library/jest-dom": "^5.16.1",
    "@testing-library/react": "^12.1.2",
    "@testing-library/react-hooks": "^7.0.2",
    "@types/jest": "^27.4.0",
    "@types/react": "^18.0.14",
    "@types/react-dom": "^18.0.5",
    "@typescript-eslint/eslint-plugin": "^5.29.0",
    "@typescript-eslint/parser": "^5.29.0",
    "autoprefixer": "^10.4.2",
    "babel-loader": "^8.2.3",
    "coveralls": "^3.1.1",
    "docz": "^2.3.1",
    "eslint": "^8.18.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-import": "^2.26.0",
    "eslint-plugin-jsx-a11y": "^6.5.1",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-promise": "^6.0.0",
    "eslint-plugin-react": "^7.30.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "get-pkg-repo": "^5.0.0",
    "gh-pages": "^3.2.3",
    "jest": "^27.4.7",
    "jest-canvas-mock": "^2.3.1",
    "sass": "^1.83.4",
    "npm-run-all": "4.1.5",
    "prettier": "^2.8.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-test-renderer": "^17.0.2",
    "rollup": "^2.64.0",
    "rollup-plugin-babel": "^4.4.0",
    "rollup-plugin-dts": "^4.1.0",
    "rollup-plugin-peer-deps-external": "^2.2.4",
    "rollup-plugin-postcss": "^4.0.2",
    "rollup-plugin-terser": "^7.0.2",
    "ts-jest": "^27.1.3",
    "ts-node": "^10.9.1",
    "tslib": "^2.5.0",
    "typescript": "^4.9.5"
  },
  "peerDependencies": {
    "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
    "react-dom": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
  },
  "packageManager": "yarn@1.22.22+sha512.a6b2f7906b721bba3d67d4aff083df04dad64c399707841b7acf00f6b133b7ac24255f2652fa22ae3534329dc6180534e98d17432037ff6fd140556e2bb3137e"
}



================================================
FILE: rollup.config.js
================================================
import babel from "rollup-plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts";

import packageJSON from "./package.json";

/**
 * We are using 'build/compiled/index.js' instead of 'src/index.tsx'
 * because we need to compile the code first.
 *
 * We could've used the '@rollup/plugin-typescript' but that plugin
 * doesn't allow us to rename the files on output. So we decided to
 * compile the code and after that to run the rollup command using
 * the index file generated by the compilation.
 *
 * @type {string}
 */
const input = "./compiled/index.js";

/**
 * Get the extension for the minified files
 * @param pathToFile
 * @return string
 */
const minifyExtension = (pathToFile) => pathToFile.replace(/\.js$/, ".min.js");

/**
 * Get the extension for the TS definition files
 * @param pathToFile
 * @return string
 */
const dtsExtension = (pathToFile) => pathToFile.replace(".js", ".d.ts");

/**
 * Definition of the common plugins used in the rollup configurations
 */
const reusablePluginList = [
  postcss({
    plugins: [autoprefixer],
  }),
  babel({
    exclude: "node_modules/**",
  }),
  external(),
  resolve(),
  commonjs(),
];

/**
 * Definition of the rollup configurations
 */
const exports = {
  cjs: {
    input,
    output: {
      file: packageJSON.main,
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    external: ["lottie-web"],
    plugins: reusablePluginList,
  },
  cjs_min: {
    input,
    output: {
      file: minifyExtension(packageJSON.main),
      format: "cjs",
      exports: "named",
    },
    external: ["lottie-web"],
    plugins: [...reusablePluginList, terser()],
  },
  umd: {
    input,
    output: {
      file: packageJSON.browser,
      format: "umd",
      sourcemap: true,
      name: "lottie-react",
      exports: "named",
      globals: {
        react: "React",
        "lottie-web": "Lottie",
      },
    },
    external: ["lottie-web"],
    plugins: reusablePluginList,
  },
  umd_min: {
    input,
    output: {
      file: minifyExtension(packageJSON.browser),
      format: "umd",
      exports: "named",
      name: "lottie-react",
      globals: {
        react: "React",
        "lottie-web": "Lottie",
      },
    },
    external: ["lottie-web"],
    plugins: [...reusablePluginList, terser()],
  },
  es: {
    input,
    output: {
      file: packageJSON.module,
      format: "es",
      sourcemap: true,
      exports: "named",
    },
    external: ["lottie-web"],
    plugins: reusablePluginList,
  },
  es_min: {
    input,
    output: {
      file: minifyExtension(packageJSON.module),
      format: "es",
      exports: "named",
    },
    external: ["lottie-web"],
    plugins: [...reusablePluginList, terser()],
  },
  dts: {
    input: dtsExtension(input),
    output: {
      file: packageJSON.types,
      format: "es",
    },
    plugins: [dts()],
  },
};

export default [
  exports.cjs,
  exports.cjs_min,
  exports.umd,
  exports.umd_min,
  exports.es,
  exports.es_min,
  exports.dts,
];



================================================
FILE: tsconfig.eslint.json
================================================
{
  "extends": "./tsconfig.json",
  "include": [
    "./src/**/*"
  ],
  "exclude": [
    "./src/__tests__"
  ]
}



================================================
FILE: tsconfig.json
================================================
{
	"compilerOptions": {
		/* Basic Options */
		"target": "ES2018" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */,
		"allowJs": true /* Allow javascript files to be compiled. */,
		"jsx": "react" /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */,
		"declaration": true /* Generates corresponding '.d.ts' file. */,
		"outDir": "./compiled" /* Redirect output structure to the directory. */,

		/* Strict Type-Checking Options */
		"strict": true /* Enable all strict type-checking options. */,

		/* Module Resolution Options */
		"moduleResolution": "node" /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */,
		"allowSyntheticDefaultImports": true,
		"esModuleInterop": true /* Enabled for compatibility with Jest (and Babel) */,
		"skipLibCheck": true,

		/* Advanced Options */
		"resolveJsonModule": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
	},
	"include": ["./src/**/*"],
	"exclude": ["./src/__tests__"]
}



================================================
FILE: .babelrc
================================================
{
	"presets": ["@babel/preset-env", "@babel/preset-react"]
}



================================================
FILE: .eslintrc.js
================================================
const { peerDependencies } = require("./package.json");

module.exports = {
  env: {
    /* (i) An environment provides predefined global variables */
    browser: true, // Browser global variables
    node: true, // Node.js global variables and Node.js scoping
    es2021: true, // Adds all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12
  },
  parserOptions: {
    ecmaVersion: 2021, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allow imports of code placed in ECMAScript modules
    ecmaFeatures: {
      /* (i) Which additional language features you'd like to use */
      jsx: true, // Enable JSX
    },
  },
  plugins: [
    /* (i) Place to define plugins, normally there is no need for this as "extends" will automatically import the plugin */
  ],
  extends: [
    "eslint:recommended", // Rules recommended by ESLint (eslint)
    "plugin:react/recommended", // React rules (eslint-plugin-react)
    "plugin:react-hooks/recommended", // React Hooks rules (eslint-plugin-react-hooks)
    "plugin:jsx-a11y/recommended", // Accessibility rules (eslint-plugin-jsx-a11y)
    "plugin:import/errors", // Recommended errors for import (eslint-plugin-import)
    "plugin:import/warnings", // Recommended warnings for import (eslint-plugin-import)
    "plugin:import/typescript", // Typescript support for the import rules (eslint-plugin-import)
    "plugin:promise/recommended", // Enforce best practices for JavaScript promises (eslint-plugin-promise)
    "plugin:prettier/recommended", // This will display Prettier errors as ESLint errors. (!) Make sure this is always the last configuration in the extends array. (eslint-plugin-prettier & eslint-config-prettier)
  ],
  /* (i) Apply TypeScript rules just to TypeScript files */
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser", // Specifies the ESLint parser
      parserOptions: {
        tsconfigRootDir: __dirname, // Required by `@typescript-eslint/recommended-requiring-type-checking`
        project: ["./tsconfig.eslint.json"], // Required by `@typescript-eslint/recommended-requiring-type-checking`
      },
      extends: [
        "plugin:@typescript-eslint/recommended", // TypeScript rules (@typescript-eslint/eslint-plugin)
        "plugin:@typescript-eslint/recommended-requiring-type-checking", // Linting with Type Information. More info: https://git.io/JEDmJ (@typescript-eslint/eslint-plugin)
      ],
    },
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  rules: {
    /* (i) Place to specify ESLint rules. Can be used to overwrite rules specified by the extended configs */

    // Define extensions that shouldn't be specified on import
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],

    // Enforce a convention in module import order
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
        },
        // this is the default order except for added `internal` in the middle
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "never",
      },
    ],

    "no-console": "warn", // Warning for console logging
    "arrow-body-style": ["error", "as-needed"], // Disallow the use of braces around arrow function body when is not needed
    "prefer-arrow-callback": "error", // Produce error anywhere an arrow function can be used instead of a function expression

    // React rules
    "react/prop-types": 0, // Disable the requirement for prop types definitions, we will use TypeScript's types for component props instead
    "react/jsx-filename-extension": [2, { extensions: [".tsx"] }], // Allow JSX only in `.tsx` files
    "react/react-in-jsx-scope": 0, // `React` doesn't need to be imported in React 17
    "react/destructuring-assignment": 2, // Always destructure component `props`

    // React Hooks rules
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks hook dependencies

    // Disable the `import/no-unresolved` rule for peer dependencies
    // This is useful when you develop a React library and `react` it's not present in `dependencies`
    // nor in `devDependencies` but it is specified in the `peerDependencies`
    // More info: https://github.com/import-js/eslint-plugin-import/issues/825#issuecomment-542618188
    "import/no-unresolved": [
      "error",
      { ignore: Object.keys(peerDependencies) },
    ],
  },
  settings: {
    react: {
      version: "detect", // Tells `eslint-plugin-react` to automatically detect the version of React to use
    },
  },
};



================================================
FILE: .nvmrc
================================================
22.13.0


================================================
FILE: .prettierrc.json
================================================
{
	"tabWidth": 2,
	"trailingComma": "all"
}



================================================
FILE: .travis.yml
================================================
language: node_js
node_js:
  - lts/*

cache:
  directories:
    - node_modules

#script:
#  - yarn test
#
#after_success:
#  - yarn coverage

before_deploy:
  - "yarn docz:build"

deploy:
  provider: pages
  skip_cleanup: true
  github_token: $GITHUB_TOKEN
  local_dir: docs-dist
  on:
    branch: main