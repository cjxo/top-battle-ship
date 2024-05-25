import { Gameboard } from "./gameboard.js";
import { Vec2 } from "./utils.js";

function Player() {
  let gameboard = Gameboard();

  function receiveAttack(coord) {
    return gameboard.receiveAttack(coord);
  }

  function reset(randomizeShips) {
    gameboard = Gameboard();
    if (randomizeShips) {
      gameboard.randomizeShips();
    } else{
      gameboard.loadDefaultShipArrangement();
    }
  }
  
  return {
    get gameboard() {
      return gameboard;
    },
    receiveAttack,
    reset,
  }
}

function CPUPlayer() {  
  const playerPart = Player();
  let validMoves = new Array(100);
  for (let i = 0; i < 100; ++i) {
    validMoves[i] = i;
  }

  function getRandomMove() {
    if (validMoves.length) {
      const idx = Math.floor(Math.random() * validMoves.length);
      const boardIdx = validMoves[idx];
      validMoves.splice(idx, 1);
      return Vec2(boardIdx % 10, Math.floor(boardIdx / 10));
    } else {
      return null;
    }
  }


  // why this no work?????
  //return Object.assign({}, playerPart, { getRandomMove });
  return {
    get gameboard() {
      return playerPart.gameboard
    },
    receiveAttack: playerPart.receiveAttack,
    reset: playerPart.reset,
    getRandomMove
  }
}

export { Player, CPUPlayer };
