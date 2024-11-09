class Ball {
  constructor(x, y, w, h, s) {
    this.x = x;
    this.y = y;
    this.xOriginal = this.x;
    this.yOriginal = this.y;
    this.height = h;
    this.width = w;
    this.xSpeed = s;
    this.ySpeed = s;
  }
  draw(context) {
    context.beginPath();
    context.fillStyle = "white";
    context.fillRect(this.x, this.y, this.width, this.height);
    context.closePath();
  }
  move() {
    this.x += this.xSpeed;
    this.y -= this.ySpeed;
    if (this.x >= 100 - border || this.x <= 0 + border) {
      this.xSpeed *= -1;
    }
    if (this.y <= 0 - border) {
      this.ySpeed *= -1;
    }
    collisionCheck();
  }
  fall() {
    if (this.y >= 684) {
      let z = Math.floor(Math.random() * 2);
      if (z == 1) {
        this.xSpeed *= -1;
      }

      this.x = this.xOriginal;
      this.y = this.yOriginal;
      this.ySpeed *= -1;
      lives -= 1;
    }
  }
}

class Board {
  constructor(x, w, h, s) {
    this.speed = s;
    this.x = x;
    this.y = 648;
    this.height = h;
    this.width = w;
  }
  draw(context) {
    context.fillStyle = "red";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
  move(e) {
    if (
      e.code == "ArrowLeft" &&
      this.x - this.width / 2 - border - this.speed > 0
    ) {
      this.x -= this.speed;
    } else if (
      e.code == "ArrowRight" &&
      this.x - this.width / 2 + border + this.speed < canvasWidth - border
    ) {
      this.x += this.speed;
    }
  }
}
class Brick {
  constructor(x, y, w, h, line) {
    this.x = x;
    this.y = y;
    this.height = h;
    this.width = w;
    this.line = line;
    this.exist = true;
  }
  draw(context) {
    if (this.exist == true) {
      if (this.line < 2) {
        context.fillStyle = "red";
      } else if (this.line < 4) {
        context.fillStyle = "orange";
      } else if (this.line < 6) {
        context.fillStyle = "yellow";
      } else if (this.line < 8) {
        context.fillStyle = "#33FF33";
      } else if (this.line < 10) {
        context.fillStyle = "#0080FF";
      }
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}

let brickArray = [];
let lives = 3;
let point = 0;
const border = 10;
let pass = false;
let animationFrameId;
let go;
let canvas;
let context;
let canvasWidth;
let canvasHeight;
let ball;
let board;
window.onload = function () {
  pass = true;
  canvas = document.getElementById("gameCanvas");
  context = canvas.getContext("2d");
  canvasWidth = canvas.width;
  canvasHeight = canvas.height;
  ball = new Ball(640, 504, 20, 20, 3);
  board = new Board(640, 128, 50, 21);
  createBrickContainer();
  drawBricks();
  requestAnimationFrame(update);
  document.addEventListener("keydown", (e) => board.move(e));
  pointsLivesUpdate();
  go = document.getElementById("gameOver");
};

function createBrickContainer() {
  const rows = 10;
  const cols = 40;
  let startY = canvasHeight * 0.1;
  let endY = canvasHeight * 0.5;
  const brickWidth = canvasWidth / cols;
  const brickHeight = (endY - startY) / rows;
  const maxRows = (endY - startY) / brickHeight;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < maxRows; j++) {
      let x = i * brickWidth;
      let y = startY + j * brickHeight;
      brickArray.push(new Brick(x, y, brickWidth, brickHeight, j));
    }
  }
}

function drawBricks() {
  brickArray.forEach((brick) => {
    brick.draw(context);
  });
}

function update() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  board.draw(context);
  ball.draw(context);
  ball.move();
  ball.fall();
  drawBricks();
  pointsLivesUpdate();
  animationFrameId = requestAnimationFrame(update);
  endGame();
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function collisionCheck() {
  const ballLeft = ball.x;
  const ballRight = ball.x + ball.width;
  const ballTop = ball.y;
  const ballBottom = ball.y + ball.height;
  const boardLeft = board.x;
  const boardRight = board.x + board.width;
  const boardTop = board.y;
  const boardBottom = board.y + board.height;
  if (
    ballBottom >= boardTop &&
    ballRight >= boardLeft &&
    ballLeft <= boardRight
  ) {
    ball.ySpeed *= -1;
    ball.y -= 1;
  }
  for (let b of brickArray) {
    const brickLeft = b.x;
    const brickRight = b.x + b.width;
    const brickTop = b.y;
    const brickBottom = b.y + b.height;
    if (
      ballBottom >= brickTop &&
      ballRight >= brickLeft &&
      ballLeft <= brickRight &&
      ballTop <= brickBottom &&
      b.exist == true
    ) {
      const collisionFromTop = Math.abs(ballBottom - brickTop);
      const collisionFromBottom = Math.abs(ballTop - brickBottom);
      const collisionFromLeft = Math.abs(ballRight - brickLeft);
      const collisionFromRight = Math.abs(ballLeft - brickRight);

      const minCollision = Math.min(
        collisionFromTop,
        collisionFromBottom,
        collisionFromLeft,
        collisionFromRight
      );

      if (minCollision === collisionFromTop) {
        ball.ySpeed *= -1;
        ball.y -= 1;
      } else if (minCollision === collisionFromBottom) {
        ball.ySpeed *= -1;
        ball.y += 1;
      } else if (minCollision === collisionFromLeft) {
        ball.xSpeed *= -1;
        ball.x -= 1;
      } else if (minCollision === collisionFromRight) {
        ball.xSpeed *= -1;
        ball.x += 1;
      }
      context.clearRect(b.x, b.y, b.width, b.height);
      context.fillStyle = "white";
      context.fillRect(b.x, b.y, b.width, b.height);
      await delay(100);
      context.clearRect(b.x, b.y, b.width, b.height);
      b.exist = false;
      point += 1;
      break;
    }
  }
}

function pointsLivesUpdate() {
  const pointsLives = document.querySelector(".PointsLives");
  //pointsLives.innerHTML = "Points:" + point + "<br>Lives:" + lives;
  if (pointsLives) {
    pointsLives.innerHTML = "Points: " + point + "<br>Lives: " + lives;
  } else {
    console.error("A .PointsLives elem nem található!");
  }
}

function endGame() {
  if (lives <= 0) {
    pass = false;
    go.style.display = "flex";
    cancelAnimationFrame(animationFrameId);
  }
}
