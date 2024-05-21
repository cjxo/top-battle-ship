import { Ship } from "./ship";
import { Vec2 } from "./utils"

test("Ship hit test", () => {
  const shipLength = 4;
  const ship = Ship(Vec2(0, 0), shipLength, true);
 
  expect(ship.hit(Vec2(0, 0))).toBeTruthy();
  expect(ship.hit(Vec2(0, 1))).toBeFalsy();
  expect(ship.hit(Vec2(2, 0))).toBeTruthy();
  expect(ship.hit(Vec2(2, 0))).toBeFalsy();
  expect(ship.hit(Vec2(1, 0))).toBeTruthy();
  expect(ship.isSunk()).toBeFalsy();
  expect(ship.hit(Vec2(3, 0))).toBeTruthy();
  expect(ship.isSunk()).toBeTruthy();
  expect(ship.hit(Vec2(4, 0))).toBeFalsy();
});
