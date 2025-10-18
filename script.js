let startBtn = document.getElementById("submit");
let p1Input = document.getElementById("player1");
let p2Input = document.getElementById("player2");
let playerSection = document.getElementById("player-inputs");
let gameSection = document.getElementById("game");
let message = document.querySelector(".message");
let cells = document.querySelectorAll(".cell");
let p1, p2, currentPlayer, turn = "x";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

startBtn.addEventListener("click", () => {
  p1 = p1Input.value.trim();
  p2 = p2Input.value.trim();

  if (!p1 || !p2) {
    alert("Please enter names for both players!");
    return;
  }

  playerSection.style.display = "none";
  gameSection.style.display = "block";
  currentPlayer = p1;
  message.textContent = `${currentPlayer}, you're up`;
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (!gameActive || board[index] !== "") return;
    board[index] = turn;
    cell.textContent = turn;

    if (checkWin()) {
      message.textContent = `${currentPlayer} congratulations you won!`;
      gameActive = false;
      highlightWin();
      return;
    }

    if (board.every(cell => cell !== "")) {
      message.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    turn = turn === "x" ? "o" : "x";
    currentPlayer = currentPlayer === p1 ? p2 : p1;
    message.textContent = `${currentPlayer}, you're up`;
  });
});

function checkWin() {
  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function highlightWin() {
  winCombos.forEach(combo => {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      document.getElementById(a + 1).classList.add("win");
      document.getElementById(b + 1).classList.add("win");
      document.getElementById(c + 1).classList.add("win");
    }
  });
}
