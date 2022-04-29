import { deepStrictEqual as assertDeepStrictEqual } from "assert";
import { equal } from "../dist/index.js";
import fastDeepEqual from "fast-deep-equal";
import { deepEqual as fastEquals } from "fast-equals";
import nanoEqual from "nano-equal";
import shallowEqualFuzzy from "shallow-equal-fuzzy";
import { isEqual as underscoreIsEqual } from "underscore";
import { isEqual as lodashIsEqual } from "lodash-es";
import deepEqual from "deep-equal";
import deepEql from "deep-eql";
import { equals as ramdaEquals } from "ramda";
import { isDeepStrictEqual as utilIsDeepStrictEqual } from "util";

import tests from "./tests.js";

import Benchmark from "benchmark";

const suite = new Benchmark.Suite();

const equalPackages = {
  "fast-deep-equal-esm": equal,
  "fast-deep-equal": fastDeepEqual,
  "fast-equals": fastEquals,
  "nano-equal": nanoEqual,
  "shallow-equal-fuzzy": shallowEqualFuzzy,
  "underscore.isEqual": underscoreIsEqual,
  "lodash.isEqual": lodashIsEqual,
  "deep-equal": deepEqual,
  "deep-eql": deepEql,
  "ramda.equals": ramdaEquals,
  "util.isDeepStrictEqual": utilIsDeepStrictEqual,
  "assert.deepStrictEqual": (a, b) => {
    try {
      assertDeepStrictEqual(a, b);
      return true;
    } catch (e) {
      return false;
    }
  },
};

for (const equalName in equalPackages) {
  let equalFunc = equalPackages[equalName];

  for (const testSuite of tests) {
    for (const test of testSuite.tests) {
      try {
        if (equalFunc(test.value1, test.value2) !== test.equal)
          console.error(
            "different result",
            equalName,
            testSuite.description,
            test.description
          );
      } catch (e) {
        console.error(equalName, testSuite.description, test.description, e);
      }
    }
  }

  suite.add(equalName, function () {
    for (const testSuite of tests) {
      for (const test of testSuite.tests) {
        if (
          test.description != "pseudo array and equivalent array are not equal"
        )
          equalFunc(test.value1, test.value2);
      }
    }
  });
}

console.log();

suite
  .on("cycle", (event) => console.log(String(event.target)))
  .on("complete", function () {
    console.log("The fastest is " + this.filter("fastest").map("name"));
  })
  .run({ async: true });
