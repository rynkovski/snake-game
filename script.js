//score
let score = 0;
localStorage.setItem("score", score);
// let highScore = parseInt(localStorage.getItem("score"));

//board
const blockSize = 25;
const rows = 20;
const cols = 20;
let board;
let context;

//snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

//snake body
let snakeBody = [];

//food
let foodX;
let foodY;

let gameOver = false;

window.onload = StartGame();

function StartGame() {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");
  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 1000 / 10);
}

function update() {
  if (gameOver) {
    return;
  }
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    score = score + 1;
    document.getElementById("score").innerText = `${score}`;
    updateHighscore(score);
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }
  context.fillStyle = "lime";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  //game over conditions
  if (
    snakeX < 0 ||
    snakeX > cols * blockSize - 1 ||
    snakeY < 0 ||
    snakeY > rows * blockSize - 1
  ) {
    gameOver = true;
    alert("Game Over");
  }
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over");
    }
  }
}

function changeDirection(e) {
  if (e.code === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * cols) * blockSize;
}

function updateHighscore(newScore) {
  // get current highscore
  const oldHighscore = parseInt(localStorage.getItem("score"));

  if (
    oldHighscore == null || // if it doesn't exist yet
    oldHighscore < newScore
  ) {
    // or if it's smaller than the new score (I assume bigger means better here)
    // current highscore needs to be updated
    localStorage.setItem("score", newScore);
    // html needs to be updated
    document.getElementById("high-score").innerText = `${score}`;
  }
}
// restart button
document.querySelector("#restart").addEventListener("click", () => {
  gameOver = false;
  score = 0;
  document.getElementById("score").innerText = `${score}`;
  velocityX = 0;
  velocityY = 0;
  snakeBody = [];
  snakeX = blockSize * 5;
  snakeY = blockSize * 5;
});
