import { Vec2 } from "./utils.js";
import { Ship } from "./ship.js";

function Gameboard() {
  const shipArray = new Array(5);
  let missedAttacks = 0;

  function receiveAttack(coord) {

  }

  function allShipsSunk() {
    return false;
  }

  return {
    get missedAttacks() {
      return missedAttacks;
    },
    receiveAttack,
    allShipsSunk
  };
}

export { Gameboard };
