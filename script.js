document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");

  const cells = document.querySelectorAll(".square");
  const restartButton = document.getElementById("restartButton");
  const X_CLASS = "x";
  const O_CLASS = "o";
  let oTurn = false;

  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (!cell.textContent.trim()) {
        const currentClass = oTurn ? O_CLASS : X_CLASS;
        cell.textContent = currentClass;
        // console.log(oTurn, [cell.textContent, cell.id, currentClass]);
        if (checkWin(currentClass)) {
          endGame(false, currentClass);
        } else if (isDraw()) {
          endGame(true);
        } else {
          oTurn = !oTurn;
        }
      }
    });
  });

  restartButton.addEventListener("click", startGame);

  function startGame() {
    cells.forEach((cell) => {
      cell.textContent = "";
    });
    oTurn = false;
  }

  function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some((combination) => {
      console.log("combination", combination);
      return combination.every((index) => {
        return cells[index].textContent === currentClass;
      });
    });
  }

  function isDraw() {
    return [...cells].every((cell) => {
      return cell.textContent === X_CLASS || cell.textContent === O_CLASS;
    });
  }

  function endGame(draw) {
    if (draw) {
      alert("It's a draw!");
    } else {
      oTurn = false;
      alert(`${oTurn ? "O's" : "X's"} Wins!`);
      cells.forEach((cell) => {
        cell.textContent = "";
      });
    }
  }
});
