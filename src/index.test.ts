import { equal } from ".";

describe("Scalars", () => {
  test.each([
    {
      description: "equal numbers",
      value1: 1,
      value2: 1,
      expected: true,
    },
    {
      description: "not equal numbers",
      value1: 1,
      value2: 2,
      expected: false,
    },
    {
      description: "number and array are not equal",
      value1: 1,
      value2: [],
      expected: false,
    },
    {
      description: "0 and null are not equal",
      value1: 0,
      value2: null,
      expected: false,
    },
    {
      description: "equal strings",
      value1: "a",
      value2: "a",
      expected: true,
    },
    {
      description: "not equal strings",
      value1: "a",
      value2: "b",
      expected: false,
    },
    {
      description: "empty string and null are not equal",
      value1: "",
      value2: null,
      expected: false,
    },
    {
      description: "null is equal to null",
      value1: null,
      value2: null,
      expected: true,
    },
    {
      description: "equal booleans (true)",
      value1: true,
      value2: true,
      expected: true,
    },
    {
      description: "equal booleans (false)",
      value1: false,
      value2: false,
      expected: true,
    },
    {
      description: "not equal booleans",
      value1: true,
      value2: false,
      expected: false,
    },
    {
      description: "1 and true are not equal",
      value1: 1,
      value2: true,
      expected: false,
    },
    {
      description: "0 and false are not equal",
      value1: 0,
      value2: false,
      expected: false,
    },
    {
      description: "NaN and NaN are equal",
      value1: NaN,
      value2: NaN,
      expected: true,
    },
    {
      description: "0 and -0 are equal",
      value1: 0,
      value2: -0,
      expected: true,
    },
    {
      description: "Infinity and Infinity are equal",
      value1: Infinity,
      value2: Infinity,
      expected: true,
    },
    {
      description: "Infinity and -Infinity are not equal",
      value1: Infinity,
      value2: -Infinity,
      expected: false,
    },
  ])("$description", ({ value1, value2, expected }) => {
    expect(equal(value1, value2)).toBe(expected);
  });
});

describe("Objects", () => {
  test.each([
    {
      description: "empty objects are equal",
      value1: {},
      value2: {},
      expected: true,
    },
    {
      description: 'equal objects (same properties "order")',
      value1: { a: 1, b: "2" },
      value2: { a: 1, b: "2" },
      expected: true,
    },
    {
      description: 'equal objects (different properties "order")',
      value1: { a: 1, b: "2" },
      value2: { b: "2", a: 1 },
      expected: true,
    },
    {
      description: "not equal objects (extra property)",
      value1: { a: 1, b: "2" },
      value2: { a: 1, b: "2", c: [] },
      expected: false,
    },
    {
      description: "not equal objects (different property values)",
      value1: { a: 1, b: "2", c: 3 },
      value2: { a: 1, b: "2", c: 4 },
      expected: false,
    },
    {
      description: "not equal objects (different properties)",
      value1: { a: 1, b: "2", c: 3 },
      value2: { a: 1, b: "2", d: 3 },
      expected: false,
    },
    {
      description: "equal objects (same sub-properties)",
      value1: { a: [{ b: "c" }] },
      value2: { a: [{ b: "c" }] },
      expected: true,
    },
    {
      description: "not equal objects (different sub-property value)",
      value1: { a: [{ b: "c" }] },
      value2: { a: [{ b: "d" }] },
      expected: false,
    },
    {
      description: "not equal objects (different sub-property)",
      value1: { a: [{ b: "c" }] },
      value2: { a: [{ c: "c" }] },
      expected: false,
    },
    {
      description: "empty array and empty object are not equal",
      value1: {},
      value2: [],
      expected: false,
    },
    {
      description: "object with extra undefined properties are not equal #1",
      value1: {},
      value2: { foo: undefined },
      expected: false,
    },
    {
      description: "object with extra undefined properties are not equal #2",
      value1: { foo: undefined },
      value2: {},
      expected: false,
    },
    {
      description: "object with extra undefined properties are not equal #3",
      value1: { foo: undefined },
      value2: { bar: undefined },
      expected: false,
    },
    {
      description: "nulls are equal",
      value1: null,
      value2: null,
      expected: true,
    },
    {
      description: "null and undefined are not equal",
      value1: null,
      value2: undefined,
      expected: false,
    },
    {
      description: "null and empty object are not equal",
      value1: null,
      value2: {},
      expected: false,
    },
    {
      description: "undefined and empty object are not equal",
      value1: undefined,
      value2: {},
      expected: false,
    },
  ])("$description", ({ value1, value2, expected }) => {
    expect(equal(value1, value2)).toBe(expected);
  });

  test("objects with different `toString` functions returning same values are not equal", () => {
    expect(
      equal(
        { toString: () => "Hello world!" },
        { toString: () => "Hello world!" }
      )
    ).toBe(false);
  });

  test("objects with `toString` functions returning different values are not equal", () => {
    expect(
      equal({ toString: () => "Hello world!" }, { toString: () => "" })
    ).toBe(false);
  });
});

describe("Arrays", () => {
  test.each([
    {
      description: "two empty arrays are equal",
      value1: [],
      value2: [],
      expected: true,
    },
    {
      description: "equal arrays",
      value1: [1, 2, 3],
      value2: [1, 2, 3],
      expected: true,
    },
    {
      description: "not equal arrays (different item)",
      value1: [1, 2, 3],
      value2: [1, 2, 4],
      expected: false,
    },
    {
      description: "not equal arrays (different length)",
      value1: [1, 2, 3],
      value2: [1, 2],
      expected: false,
    },
    {
      description: "equal arrays of objects",
      value1: [{ a: "a" }, { b: "b" }],
      value2: [{ a: "a" }, { b: "b" }],
      expected: true,
    },
    {
      description: "not equal arrays of objects",
      value1: [{ a: "a" }, { b: "b" }],
      value2: [{ a: "a" }, { b: "c" }],
      expected: false,
    },
    {
      description: "pseudo array and equivalent array are not equal",
      value1: { "0": 0, "1": 1, length: 2 },
      value2: [0, 1],
      expected: false,
    },
  ])("$description", ({ value1, value2, expected }) => {
    expect(equal(value1, value2)).toBe(expected);
  });
});

describe("Date objects", () => {
  test.each([
    {
      description: "equal date objects",
      value1: new Date("2017-06-16T21:36:48.362Z"),
      value2: new Date("2017-06-16T21:36:48.362Z"),
      expected: true,
    },
    {
      description: "not equal date objects",
      value1: new Date("2017-06-16T21:36:48.362Z"),
      value2: new Date("2017-01-01T00:00:00.000Z"),
      expected: false,
    },
    {
      description: "date and string are not equal",
      value1: new Date("2017-06-16T21:36:48.362Z"),
      value2: "2017-06-16T21:36:48.362Z",
      expected: false,
    },
    {
      description: "date and object are not equal",
      value1: new Date("2017-06-16T21:36:48.362Z"),
      value2: {},
      expected: false,
    },
  ])("$description", ({ value1, value2, expected }) => {
    expect(equal(value1, value2)).toBe(expected);
  });
});

describe("RegExp objects", () => {
  test.each([
    {
      description: "equal RegExp objects",
      value1: /foo/,
      value2: /foo/,
      expected: true,
    },
    {
      description: "not equal RegExp objects (different pattern)",
      value1: /foo/,
      value2: /bar/,
      expected: false,
    },
    {
      description: "not equal RegExp objects (different flags)",
      value1: /foo/,
      value2: /foo/i,
      expected: false,
    },
    {
      description: "RegExp and string are not equal",
      value1: /foo/,
      value2: "foo",
      expected: false,
    },
    {
      description: "RegExp and object are not equal",
      value1: /foo/,
      value2: {},
      expected: false,
    },
  ])("$description", ({ value1, value2, expected }) => {
    expect(equal(value1, value2)).toBe(expected);
  });
});

describe("Functions", () => {
  function func1() {}
  function func2() {}

  test.each([
    {
      description: "same function is equal",
      value1: func1,
      value2: func1,
      expected: true,
    },
    {
      description: "different functions are not equal",
      value1: func1,
      value2: func2,
      expected: false,
    },
  ])("$description", ({ value1, value2, expected }) => {
    expect(equal(value1, value2)).toBe(expected);
  });
});

describe("Sample objects", () => {
  test.each([
    {
      description: "big object",
      value1: {
        prop1: "value1",
        prop2: "value2",
        prop3: "value3",
        prop4: {
          subProp1: "sub value1",
          subProp2: {
            subSubProp1: "sub sub value1",
            subSubProp2: [1, 2, { prop2: 1, prop: 2 }, 4, 5],
          },
        },
        prop5: 1000,
        prop6: new Date(2016, 2, 10),
      },
      value2: {
        prop5: 1000,
        prop3: "value3",
        prop1: "value1",
        prop2: "value2",
        prop6: new Date("2016/03/10"),
        prop4: {
          subProp2: {
            subSubProp1: "sub sub value1",
            subSubProp2: [1, 2, { prop2: 1, prop: 2 }, 4, 5],
          },
          subProp1: "sub value1",
        },
      },
      expected: true,
    },
  ])("$description", ({ value1, value2, expected }) => {
    expect(equal(value1, value2)).toBe(expected);
  });
});

class MyMap extends Map {}
class MySet extends Set {}
var emptyObj = {};

var skipBigInt = typeof BigInt == "undefined";
var skipBigIntArray = typeof BigUint64Array == "undefined";

describe("bigint", () => {
  test.each([
    {
      description: "equal bigints",
      value1: skipBigInt || BigInt(1),
      value2: skipBigInt || BigInt(1),
      expected: true,
      skip: skipBigInt,
    },
    {
      description: "not equal bigints",
      value1: skipBigInt || BigInt(1),
      value2: skipBigInt || BigInt(2),
      expected: false,
      skip: skipBigInt,
    },
  ])("$description", ({ value1, value2, expected }) => {
    expect(equal(value1, value2)).toBe(expected);
  });
});

describe("Maps", () => {
  class MyMap extends Map<any, any> {}

  test.each([
    {
      description: "empty maps are equal",
      value1: new Map(),
      value2: new Map(),
      expected: true,
    },
    {
      description: "empty maps of different class are not equal",
      value1: new Map(),
      value2: new MyMap(),
      expected: false,
    },
    {
      description: 'equal maps (same key "order")',
      value1: new Map([
        ["a", 1],
        ["b", 2],
      ]),
      value2: new Map([
        ["a", 1],
        ["b", 2],
      ]),
      expected: true,
    },
    {
      description:
        'not equal maps (same key "order" - instances of different classes)',
      value1: new Map([
        ["a", 1],
        ["b", 2],
      ]),
      value2: new MyMap([
        ["a", 1],
        ["b", 2],
      ]),
      expected: false,
    },
    {
      description: 'equal maps (different key "order")',
      value1: new Map([
        ["a", 1],
        ["b", 2],
      ]),
      value2: new Map([
        ["b", 2],
        ["a", 1],
      ]),
      expected: true,
    },
    {
      description:
        'equal maps (different key "order" - instances of the same subclass)',
      value1: new MyMap([
        ["a", 1],
        ["b", 2],
      ]),
      value2: new MyMap([
        ["b", 2],
        ["a", 1],
      ]),
      expected: true,
    },
    {
      description: "not equal maps (extra key)",
      value1: new Map([
        ["a", 1],
        ["b", 2],
      ]),
      value2: new Map([
        ["a", 1],
        ["b", 2],
        ["c", 3],
      ]),
      expected: false,
    },
    {
      description: "not equal maps (different key value)",
      value1: new Map([
        ["a", 1],
        ["b", 2],
        ["c", 3],
      ]),
      value2: new Map([
        ["a", 1],
        ["b", 2],
        ["c", 4],
      ]),
      expected: false,
    },
    {
      description: "not equal maps (different keys)",
      value1: new Map([
        ["a", 1],
        ["b", 2],
        ["c", 3],
      ]),
      value2: new Map([
        ["a", 1],
        ["b", 2],
        ["d", 3],
      ]),
      expected: false,
    },
    {
      description: "equal maps (same sub-keys)",
      value1: new Map([["a", [new Map([["b", "c"]])]]]),
      value2: new Map([["a", [new Map([["b", "c"]])]]]),
      expected: true,
    },
    {
      description: "not equal maps (different sub-key value)",
      value1: new Map([["a", [new Map([["b", "c"]])]]]),
      value2: new Map([["a", [new Map([["b", "d"]])]]]),
      expected: false,
    },
    {
      description: "not equal maps (different sub-key)",
      value1: new Map([["a", [new Map([["b", "c"]])]]]),
      value2: new Map([["a", [new Map([["c", "c"]])]]]),
      expected: false,
    },
    {
      description: "empty map and empty object are not equal",
      value1: {},
      value2: new Map(),
      expected: false,
    },
    {
      description: "map with extra undefined key is not equal #1",
      value1: new Map([]),
      value2: new Map([["foo", undefined]]),
      expected: false,
    },
    {
      description: "map with extra undefined key is not equal #2",
      value1: new Map([["foo", undefined]]),
      value2: new Map([]),
      expected: false,
    },
    {
      description: "maps with extra undefined keys are not equal #3",
      value1: new Map([["foo", undefined]]),
      value2: new Map([["bar", undefined]]),
      expected: false,
    },
    {
      description: "null and empty map are not equal",
      value1: null,
      value2: new Map(),
      expected: false,
    },
    {
      description: "undefined and empty map are not equal",
      value1: undefined,
      value2: new Map(),
      expected: false,
    },
    {
      description: "map and a pseudo map are not equal",
      value1: new Map(),
      value2: {
        constructor: Map,
        size: 0,
        has: () => true,
        get: () => 1,
      },
      expected: false,
    },
  ])("$description", ({ value1, value2, expected }) => {
    expect(equal(value1, value2)).toBe(expected);
  });
});

describe("Sets", () => {
  class MySet extends Set {}

  test.each([
    {
      description: "empty sets are equal",
      value1: new Set(),
      value2: new Set(),
      expected: true,
    },
    {
      description: "empty sets of different class are not equal",
      value1: new Set(),
      value2: new MySet(),
      expected: false,
    },
    {
      description: 'equal sets (same value "order")',
      value1: new Set(["a", "b"]),
      value2: new Set(["a", "b"]),
      expected: true,
    },
    {
      description:
        'not equal sets (same value "order" - instances of different classes)',
      value1: new Set(["a", "b"]),
      value2: new MySet(["a", "b"]),
      expected: false,
    },
    {
      description: 'equal sets (different value "order")',
      value1: new Set(["a", "b"]),
      value2: new Set(["b", "a"]),
      expected: true,
    },
    {
      description:
        'equal sets (different value "order" - instances of the same subclass)',
      value1: new MySet(["a", "b"]),
      value2: new MySet(["b", "a"]),
      expected: true,
    },
    {
      description: "not equal sets (extra value)",
      value1: new Set(["a", "b"]),
      value2: new Set(["a", "b", "c"]),
      expected: false,
    },
    {
      description: "not equal sets (different values)",
      value1: new Set(["a", "b", "c"]),
      value2: new Set(["a", "b", "d"]),
      expected: false,
    },
    {
      description: "not equal sets (different instances of objects)",
      value1: new Set(["a", {}]),
      value2: new Set(["a", {}]),
      expected: false,
    },
    {
      description: "equal sets (same instances of objects)",
      value1: new Set(["a", emptyObj]),
      value2: new Set(["a", emptyObj]),
      expected: true,
    },
    {
      description: "empty set and empty object are not equal",
      value1: {},
      value2: new Set(),
      expected: false,
    },
    {
      description: "empty set and empty array are not equal",
      value1: [],
      value2: new Set(),
      expected: false,
    },
    {
      description: "set with extra undefined value is not equal #1",
      value1: new Set([]),
      value2: new Set([undefined]),
      expected: false,
    },
    {
      description: "set with extra undefined value is not equal #2",
      value1: new Set([undefined]),
      value2: new Set([]),
      expected: false,
    },
    {
      description: "set and pseudo set are not equal",
      value1: new Set(),
      value2: {
        constructor: Set,
        size: 0,
        has: () => true,
      },
      expected: false,
    },
  ])("$description", ({ value1, value2, expected }) => {
    expect(equal(value1, value2)).toBe(expected);
  });
});

describe("Typed arrays", () => {
  test.each([
    {
      description: "two empty arrays of the same class are equal",
      value1: new Int32Array([]),
      value2: new Int32Array([]),
      expected: true,
    },
    {
      description: "two empty arrays of the different class are not equal",
      value1: new Int32Array([]),
      value2: new Int16Array([]),
      expected: false,
    },
    {
      description: "equal arrays",
      value1: new Int32Array([1, 2, 3]),
      value2: new Int32Array([1, 2, 3]),
      expected: true,
    },
    {
      description: "equal BigUint64Array arrays",
      value1: skipBigIntArray || new BigUint64Array([21n, 31n]),
      value2: skipBigIntArray || new BigUint64Array([21n, 31n]),
      expected: true,
      skip: skipBigIntArray,
    },
    {
      description: "not equal BigUint64Array arrays",
      value1: skipBigIntArray || new BigUint64Array([21n, 31n]),
      value2: skipBigIntArray || new BigUint64Array([21n, 21n]),
      expected: false,
      skip: skipBigIntArray,
    },
    {
      description: "not equal arrays (same items, different class)",
      value1: new Int32Array([1, 2, 3]),
      value2: new Int16Array([1, 2, 3]),
      expected: false,
    },
    {
      description: "not equal arrays (different item)",
      value1: new Int32Array([1, 2, 3]),
      value2: new Int32Array([1, 2, 4]),
      expected: false,
    },
    {
      description: "not equal arrays (different length)",
      value1: new Int32Array([1, 2, 3]),
      value2: new Int32Array([1, 2]),
      expected: false,
    },
    {
      description: "pseudo array and equivalent typed array are not equal",
      value1: { "0": 1, "1": 2, length: 2, constructor: Int32Array },
      value2: new Int32Array([1, 2]),
      expected: false,
    },
  ])("$description", ({ value1, value2, expected }) => {
    expect(equal(value1, value2)).toBe(expected);
  });
});
