import { Gameboard } from "./gameboard.js";

function Player(isBot) {
  const gameboard = Gameboard();
  return {
    get isBot() {
      return isBot;
    },
    get gameboard() {
      return gameboard;
    },
  }
}

export { Player };
