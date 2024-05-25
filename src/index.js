import { Player, CPUPlayer } from "./player.js";
import { Vec2, AttackKind } from "./utils.js";
import "./styles.css";

function DomBattleship() {
  const player = Player();
  const enemy = CPUPlayer();

  const divPlayerBoard = createBoard("You");
  const divEnemyBoard = createBoard("CPU");
  const randomizeBtn = document.querySelector("body > button");
  randomizeBtn.addEventListener("click", () => {
    player.gameboard.randomizeShips();
    resetBoard();
  });

  function resetGame() {
    player.reset(true);
    enemy.reset(true);
    resetBoard();
  }
  
  function gameOverDialog(playerWon) {
    const dlg = document.createElement("dialog");
    const btnNextGame = document.createElement("button");
    btnNextGame.textContent = "Next Game";
    btnNextGame.addEventListener("click", () => {
      dlg.remove();
      resetGame();
    });
  
    const divGameOver = document.createElement("div");
    divGameOver.textContent = "Game Over!";
  
    const divWon = document.createElement("div");
    divWon.setAttribute("class", "who-won");
    if (playerWon) {
      divWon.textContent = "You Won!";
    } else {
      divWon.textContent = "CPU Won!";
    }
  
    dlg.append(divGameOver, divWon, btnNextGame);
  
    document.body.append(dlg);
    
    dlg.showModal();
  }

  function createBoard(playerName) {
    const divBoard = document.createElement("div");
    divBoard.setAttribute("class", "board");
  
    const divName = document.createElement("div");
    divName.setAttribute("class", "player-name");
    divName.textContent = playerName;
  
    const divCellGroup = document.createElement("div");
    divCellGroup.setAttribute("class", "cell-group");
  
    divBoard.append(divName, divCellGroup);
  
    document.querySelector(".game").append(divBoard);
  
    return divBoard;
  }

  function clearBoard(board) {
    const cellGroup = board.querySelector(".cell-group");
    while (cellGroup.firstChild) {
      cellGroup.firstChild.remove();
    }
  }

  function someoneHasWon() {
    return player.gameboard.allShipsSunk() || enemy.gameboard.allShipsSunk();
  }

  function determineWinner() {
    if (player.gameboard.allShipsSunk()) {
      // enemy won
      gameOverDialog(false);
    } else if (enemy.gameboard.allShipsSunk()) {
      // player won
      gameOverDialog(true);
    }
  }

  function resetBoard() {
    clearBoard(divPlayerBoard);
    clearBoard(divEnemyBoard);
  
    const playerCellGroup = divPlayerBoard.querySelector(".cell-group");
    const enemyCellGroup = divEnemyBoard.querySelector(".cell-group");
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
        }
      }
  
      playerCellGroup.appendChild(divRow);
    }
  
    for (let rowIndex = 0; rowIndex < 10; ++rowIndex) {
      const divRow = document.createElement("div");
      divRow.setAttribute("class", "board-row");
      for (let cellIndex = 0; cellIndex < 10; ++cellIndex) {
        const btnCell = document.createElement("button");
        btnCell.setAttribute("class", "board-cell");
        divRow.appendChild(btnCell);
  
        btnCell.classList.add("hit-no-attempt", "hoverable");
        
        btnCell.addEventListener("click", () => {
          const newCellState = enemy.gameboard.queryCell(Vec2(cellIndex, rowIndex))
          if (((newCellState === AttackKind.NoAttempt) || 
              (newCellState === "ship")) &&
              !someoneHasWon(player, enemy)) {
            console.log(enemy.gameboard.queryCell(Vec2(cellIndex, rowIndex)));
            btnCell.classList.remove("hoverable");
  
            switch (enemy.receiveAttack(Vec2(cellIndex, rowIndex))) {
              case AttackKind.Hit: {
                btnCell.classList.add("hit-hit");
              } break;
  
              case AttackKind.Miss: {
                btnCell.classList.add("hit-miss");
              } break;
            };
            
            const enemyMove = enemy.getRandomMove();
            const playerBtn = playerCellGroup.children[enemyMove.y].children[enemyMove.x];
            switch (player.receiveAttack(enemyMove)) {
              case AttackKind.Hit: {
                console.log("Hi");
                playerBtn.classList.remove("player-ship");
                playerBtn.classList.add("hit-hit");
              } break;
  
              case AttackKind.Miss: {
                playerBtn.classList.add("hit-miss");
              } break;
            }
            
            determineWinner(player, enemy);
          }
        });
      }
  
      enemyCellGroup.appendChild(divRow);
    }
  }

  return { 
    run() {
      resetGame();
    }
  }
}

// what we need todo tomr: Finish up ship randomizer. Thats it.
const battleship = DomBattleship();
battleship.run();