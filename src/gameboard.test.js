import { Gameboard } from "./gameboard.js";
import { Vec2, AttackKind } from "./utils.js";

test("Gameboard recieve attack from hardcode ship", () => {
  const myGameboard = Gameboard();
  myGameboard.loadDefaultShipArrangement();

  expect(myGameboard.allShipsSunk()).toBeFalsy();

  expect(myGameboard.receiveAttack(Vec2(0, 0))).toBe(AttackKind.Hit);
  expect(myGameboard.receiveAttack(Vec2(0, 0))).toBe(AttackKind.AlreadyHit);
  expect(myGameboard.receiveAttack(Vec2(1, 0))).toBe(AttackKind.Hit);
  expect(myGameboard.receiveAttack(Vec2(2, 0))).toBe(AttackKind.Hit);
  expect(myGameboard.receiveAttack(Vec2(3, 0))).toBe(AttackKind.Hit);
  expect(myGameboard.receiveAttack(Vec2(4, 0))).toBe(AttackKind.Miss);
  expect(myGameboard.receiveAttack(Vec2(3, 0))).toBe(AttackKind.AlreadyHit);

  expect(myGameboard.receiveAttack(Vec2(0, 4))).toBe(AttackKind.Hit);
  expect(myGameboard.receiveAttack(Vec2(0, 5))).toBe(AttackKind.Hit);
  expect(myGameboard.receiveAttack(Vec2(0, 5))).toBe(AttackKind.AlreadyHit);
  expect(myGameboard.receiveAttack(Vec2(0, 6))).toBe(AttackKind.Miss);
  expect(myGameboard.receiveAttack(Vec2(0, 6))).toBe(AttackKind.AlreadyMiss);

  expect(myGameboard.receiveAttack(Vec2(4, 4))).toBe(AttackKind.Hit);
  expect(myGameboard.receiveAttack(Vec2(5, 4))).toBe(AttackKind.Hit);
  expect(myGameboard.receiveAttack(Vec2(6, 4))).toBe(AttackKind.Hit);
  
  expect(myGameboard.receiveAttack(Vec2(9, 0))).toBe(AttackKind.Hit);
  expect(myGameboard.receiveAttack(Vec2(9, 1))).toBe(AttackKind.Hit);
  expect(myGameboard.receiveAttack(Vec2(9, 2))).toBe(AttackKind.Hit);
  expect(myGameboard.receiveAttack(Vec2(9, 3))).toBe(AttackKind.Hit);
  expect(myGameboard.receiveAttack(Vec2(9, 4))).toBe(AttackKind.Hit);
  expect(myGameboard.receiveAttack(Vec2(9, 5))).toBe(AttackKind.Miss);
  
  expect(myGameboard.allShipsSunk()).toBeFalsy();

  expect(myGameboard.receiveAttack(Vec2(7, 6))).toBe(AttackKind.Hit);
  expect(myGameboard.receiveAttack(Vec2(7, 7))).toBe(AttackKind.Hit);
  
  expect(myGameboard.allShipsSunk()).toBeTruthy();
});
