import { Vec2 } from "./utils";

test("Vector equality test", () => {
  expect(Vec2(1, 1).isEqual(Vec2(1, 1))).toBeTruthy();
  expect(Vec2(0, 0).isEqual(Vec2(0, 0))).toBeTruthy();
  expect(Vec2(100, 0).isEqual(Vec2(0, 100))).toBeFalsy();
});

test("Vector added test", () => {
  const someVec = Vec2(1, 1);
  const added = someVec.added(Vec2(3, 4));
  expect(added.isEqual(Vec2(4, 5))).toBeTruthy();
});

test("Vector add test", () => {
  const someVec = Vec2(1, 1);
  someVec.add(Vec2(90, 10));
  expect(someVec.isEqual(Vec2(91, 11))).toBeTruthy();
});
