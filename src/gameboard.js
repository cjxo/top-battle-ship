import { Vec2, AttackKind } from "./utils.js";
import { Ship } from "./ship.js";

function Gameboard() {
  // five ships per board???? Is this good?
  const shipArray = new Array(5);
  const attackMatrix = new Array(100).fill(AttackKind.NoAttempt);
  
  function markAttackMatrix() {
    attackMatrix.fill(AttackKind.NoAttempt);
    
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
  }

  function randomizeShips() {    
    const possibleCells = new Array(100);
    const possibleLengths = [5, 4, 3, 2, 2];
    for (let i = 0; i < 100; ++i) {
      possibleCells[i] = i;
    }

    function testCells(cell, shipLength, iMultiplier) {
      let isGood = true;
      for (let i = 1; i < shipLength; ++i) {
        if (possibleCells[cell + i * iMultiplier] === -1) {
          isGood = false;
          break;
        }
      }

      return isGood;
    }

    for (let shipIndex = 0; shipIndex < shipArray.length; ++shipIndex) {
      const randomLengthIndex = Math.floor(Math.random() * possibleLengths.length);
      const length = possibleLengths[randomLengthIndex];
      const isHori = Math.random() > 0.5;
      let P = null;
      possibleLengths.splice(randomLengthIndex, 1);

      let accept = false;
      while (!accept) {
        const randomCellIndex = Math.floor(Math.random() * possibleCells.length);
        const originalCell = possibleCells[randomCellIndex];
        if (originalCell !== -1) {
          if (isHori) {
            if (((originalCell % 10) + length) < 10) {
              accept = testCells(originalCell, length, 1);
            }
          } else {
            if ((Math.floor(originalCell / 10) + length) < 10) {
              accept = testCells(originalCell, length, 10);
            }
          }
          
          if (accept) {
            P = Vec2(originalCell % 10, Math.floor(originalCell / 10));
            if (isHori) {
              if ((randomCellIndex % 10) > 0) {
                possibleCells[randomCellIndex - 1] = -1;
              }
  
              if (((randomCellIndex % 10) + length + 1) < 10) {
                possibleCells[randomCellIndex + length + 1] = -1;
              }

              if ((randomCellIndex - 10) >= 0) {
                for (let i = 0; i < length; ++i) {
                  possibleCells[randomCellIndex - 10 + i] = -1;
                }
              }

              if ((randomCellIndex + 10) < 100) {
                for (let i = 0; i < length; ++i) {
                  possibleCells[randomCellIndex + 10 + i] = -1;
                }
              }

              for (let i = 0; i < length; ++i) {
                possibleCells[randomCellIndex + i] = -1;
              }
            } else {
              if ((randomCellIndex - 10) > 0) {
                possibleCells[randomCellIndex - 10] = -1;
              }

              if (Math.floor((randomCellIndex + length * 10) / 10) < 10) {
                possibleCells[randomCellIndex + length * 10] = -1;
              }

              if ((randomCellIndex % 10) > 0) {
                for (let i = 0; i < length; ++i) {
                  possibleCells[(randomCellIndex - 1) + i * 10] = -1;
                }
              }

              if (((randomCellIndex % 10) + 1) < 10) {
                for (let i = 0; i < length; ++i) {
                  possibleCells[(randomCellIndex + 1) + i * 10] = -1;
                }
              }              

              for (let i = 0; i < length; ++i) {
                possibleCells[randomCellIndex + i * 10] = -1;
              }
            }
          }
        }
      }

      shipArray[shipIndex] = Ship(P, length, isHori);
    }

    markAttackMatrix();
  }

  function loadDefaultShipArrangement() {
    // NOTE: for now, hardcode ships 
    shipArray[0] = Ship(Vec2(0, 0), 4, true);
    shipArray[1] = Ship(Vec2(0, 4), 2, false);
    shipArray[2] = Ship(Vec2(4, 4), 3, true);
    shipArray[3] = Ship(Vec2(9, 0), 5, false);
    shipArray[4] = Ship(Vec2(7, 6), 2, false);

    markAttackMatrix();
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
    randomizeShips,
    loadDefaultShipArrangement
  };
}

export { Gameboard };
