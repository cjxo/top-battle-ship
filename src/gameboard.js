import { Vec2, AttackKind } from "./utils.js";
import { Ship } from "./ship.js";

function Gameboard() {
  // five ships per board???? Is this good?
  const shipArray = new Array(5);

  const attackMatrix = new Array(100).fill(AttackKind.NoAttempt);

  // NOTE: for now, hardcode ships 
  shipArray[0] = Ship(Vec2(0, 0), 4, true);
  shipArray[1] = Ship(Vec2(0, 4), 2, false);
  shipArray[2] = Ship(Vec2(4, 4), 3, true);
  shipArray[3] = Ship(Vec2(9, 0), 5, false);
  shipArray[4] = Ship(Vec2(7, 6), 2, false);
  
  shipArray.forEach(ship => {
    let baseindex = ship.startP.y * 10 + ship.startP.x;
    if (ship.hori) {
      for (let i = 0; i < ship.length; ++i) {
        attackMatrix[baseindex] = ship;
        baseindex += 1;
      }
    } else {
      for (let i = 0; i < ship.length; ++i) {
        attackMatrix[baseindex] = ship;
        baseindex += 10;
      }
    }
  });

  function randomizeShips() {    
    // TODO TOMR
  }

  function receiveAttack(coord) {
    if (!(((coord.x < 10) && (coord.x >= 0)) || ((coord.y < 10) && (coord.y >= 0)))) {
      return AttackKind.Miss;
    }

    const index = coord.y * 10 + coord.x;
    if (attackMatrix[index] === AttackKind.Hit) {
      return AttackKind.AlreadyHit;
    }

    if (attackMatrix[index] === AttackKind.Miss) {
      return AttackKind.AlreadyMiss;
    }
    
    let hitKind = AttackKind.Miss;
    if (attackMatrix[index] === AttackKind.NoAttempt) {
      attackMatrix[index] = hitKind;
    } else if (typeof attackMatrix[index] !== "number") {
      hitKind = attackMatrix[index].hit(coord);
      attackMatrix[index] = hitKind;
    }

    return hitKind;
  }

  function queryCell(coord) {
    if (((coord.x < 10) && (coord.x >= 0)) || ((coord.y < 10) && (coord.y >= 0))) {
      if (typeof attackMatrix[coord.y * 10 + coord.x] === "object") {
        return "ship";
      } else {
        return attackMatrix[coord.y * 10 + coord.x];
      }
    } else {
      return AttackKind.Miss;
    }
  }

  function allShipsSunk() {
    for (const ship of shipArray) {
      if (!ship.isSunk()) {
        return false;
      }
    }
    
    return true;
  }

  return {
    get missedAttacks() {
      return missedAttacks;
    },
    get ships() {
      return shipArray;
    },
    queryCell,
    receiveAttack,
    allShipsSunk,
    randomizeShips
  };
}

export { Gameboard };
