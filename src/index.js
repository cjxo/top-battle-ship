import { Player } from "./player.js";
import { Vec2, AttackKind } from "./utils.js";
import "./styles.css";

const divPlayerBoard = document.createElement("div");
divPlayerBoard.setAttribute("class", "board");

const divEnemyBoard = document.createElement("div");
divEnemyBoard.setAttribute("class", "board");

document.body.append(divPlayerBoard, divEnemyBoard);

// TODO: AI THAT DOES THIS
let enemyNextMove = Vec2(0, 0);

function domBuildBoardCells(player, enemy) {
  while (divPlayerBoard.firstChild) {
    divPlayerBoard.firstChild.remove();
  }

  while (divEnemyBoard.firstChild) {
    divEnemyBoard.firstChild.remove();
  }

  for (let rowIndex = 0; rowIndex < 10; ++rowIndex) {
    const divRow = document.createElement("div");
    divRow.setAttribute("class", "board-row");
    for (let cellIndex = 0; cellIndex < 10; ++cellIndex) {
      const btnCell = document.createElement("button");
      btnCell.setAttribute("class", "board-cell");
      divRow.appendChild(btnCell);

      const cellState = player.gameboard.queryCell(Vec2(cellIndex, rowIndex));
      if (cellState === AttackKind.NoAttempt) {
        btnCell.classList.add("hit-no-attempt");
      } else if (cellState === "ship") {
        btnCell.classList.add("player-ship");
      } else if (cellState === AttackKind.Hit) {
        btnCell.classList.add("hit-hit");
      } else if (cellState === AttackKind.Miss) {
        btnCell.classList.add("hit-miss");
      }
    }

    divPlayerBoard.appendChild(divRow);
  }

  for (let rowIndex = 0; rowIndex < 10; ++rowIndex) {
    const divRow = document.createElement("div");
    divRow.setAttribute("class", "board-row");
    for (let cellIndex = 0; cellIndex < 10; ++cellIndex) {
      const btnCell = document.createElement("button");
      btnCell.setAttribute("class", "board-cell hoverable");
      divRow.appendChild(btnCell);

      const cellState = enemy.gameboard.queryCell(Vec2(cellIndex, rowIndex));
      if ((cellState === AttackKind.NoAttempt) || 
          (cellState === "ship")) {
        btnCell.classList.add("hit-no-attempt");
      } else if (cellState === AttackKind.Miss) {
        btnCell.classList.add("hit-miss");
      } else if (cellState === AttackKind.Hit) {
        btnCell.classList.add("hit-hit");
      }

      btnCell.addEventListener("click", () => {
        if ((cellState === AttackKind.NoAttempt) || 
          (cellState === "ship")) {
          enemy.gameboard.receiveAttack(Vec2(cellIndex, rowIndex));

          // TODO: implement AI here
          player.gameboard.receiveAttack(Vec2(enemyNextMove.x, enemyNextMove.y));
          enemyNextMove.add(Vec2(1, 0));
          if (enemyNextMove.x > 9) {
            enemyNextMove.x = 0;
            enemyNextMove.y = enemyNextMove.y + 1;
          }

          domBuildBoardCells(player, enemy);
        }
      });
    }

    divEnemyBoard.appendChild(divRow);
  }
}

const player = Player();
const enemy = Player();

domBuildBoardCells(player, enemy);