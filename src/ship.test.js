import { Ship } from "./ship";
import { Vec2, AttackKind } from "./utils"

test("Ship hit test", () => {
  const shipLength = 4;
  const ship = Ship(Vec2(0, 0), shipLength, true);
 
  expect(ship.hit(Vec2(0, 0))).toBe(AttackKind.Hit);
  expect(ship.hit(Vec2(0, 1))).toBe(AttackKind.Miss);
  expect(ship.hit(Vec2(2, 0))).toBe(AttackKind.Hit);
  expect(ship.hit(Vec2(2, 0))).toBe(AttackKind.AlreadyHit);
  expect(ship.hit(Vec2(1, 0))).toBe(AttackKind.Hit);
  expect(ship.isSunk()).toBeFalsy();
  expect(ship.hit(Vec2(3, 0))).toBe(AttackKind.Hit);
  expect(ship.isSunk()).toBeTruthy();
  expect(ship.hit(Vec2(4, 0))).toBe(AttackKind.Miss);
});
