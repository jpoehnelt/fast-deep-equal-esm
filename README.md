# fast-deep-equal-esm
The fastest deep equal with ES6 Map, Set and Typed arrays support.

[![npm](https://img.shields.io/npm/v/eleventy-plugin-related)](https://www.npmjs.com/package/eleventy-plugin-related)
![Build](https://github.com/jpoehnelt/eleventy-plugin-related/workflows/Build/badge.svg)
![Release](https://github.com/jpoehnelt/eleventy-plugin-related/workflows/Release/badge.svg)

## Install

```bash
npm install fast-deep-equal-esm
```

## Features

- ESM module
- Checks equality of Date and RegExp objects by value.
- Maps
- Sets
- Typed arrays

## Usage

```js
import { equal } from 'fast-deep-equal-esm';

console.log(equal({foo: 'bar'}, {foo: 'bar'})); // true
console.log(equal(Int16Array([1, 2]), Int16Array([1, 2]))); // true
```

## Differences from fast-deep-equal

See https://github.com/epoberezkin/fast-deep-equal/pull/105#issuecomment-898955074.

- ESM module
- Written in TypeScript
- No specific React support
- No longer compares the output of the `Object.toString()` method.

## Performance benchmark

```
fast-deep-equal-esm x 228,022 ops/sec ±0.44% (94 runs sampled)
fast-deep-equal x 228,304 ops/sec ±1.83% (90 runs sampled)
fast-equals x 245,100 ops/sec ±0.42% (95 runs sampled)
nano-equal x 167,185 ops/sec ±0.59% (90 runs sampled)
shallow-equal-fuzzy x 129,680 ops/sec ±0.39% (94 runs sampled)
underscore.isEqual x 83,300 ops/sec ±0.81% (95 runs sampled)
lodash.isEqual x 38,110 ops/sec ±0.77% (91 runs sampled)
deep-equal x 180 ops/sec ±1.18% (66 runs sampled)
deep-eql x 26,980 ops/sec ±1.06% (92 runs sampled)
ramda.equals x 23,339 ops/sec ±2.08% (93 runs sampled)
util.isDeepStrictEqual x 52,615 ops/sec ±0.79% (94 runs sampled)
assert.deepStrictEqual x 728 ops/sec ±0.63% (92 runs sampled)
```

```bash
npm run benchmark
```

__Please note__: this benchmark runs against the available test cases. To choose the most performant library for your application, it is recommended to benchmark against your data and to NOT expect this benchmark to reflect the performance difference in your application.


## License

This is a significant rewrite of the original [fast-deep-equal](https://github.com/epoberezkin/fast-deep-equal)

[MIT](https://github.com/jpoehnelt/fast-deep-equal-esm/blob/master/LICENSE)
