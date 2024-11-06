let board;
let ball;
const border = 0.7;
window.onload = function () {
  board = {
    element: document.getElementById("deszka"),
    x: 50,
    width: 10,
    height: 4,
    speed: 2,
  };
  ball = {
    element: document.getElementById("labda"),
    xSpeed: 0.4,
    ySpeed: 0.4,
    x: 50,
    y: 80,
  };

  initializeBricks();
  requestAnimationFrame(update);
  document.addEventListener("keydown", boardMove);
};
function initializeBricks() {
  const bricksContainer = document.querySelector(".Bricks");
  const rows = 10;
  const cols = 40;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const b = document.createElement("div");
      if (i < 2) {
        b.style.backgroundColor = "red";
      } else if (i < 4) {
        b.style.backgroundColor = "orange";
      } else if (i < 6) {
        b.style.backgroundColor = "yellow";
      } else if (i < 8) {
        b.style.backgroundColor = "#33FF33";
      } else if (i < 10) {
        b.style.backgroundColor = "#0080FF";
      }
      b.classList.add("Brick");
      bricksContainer.appendChild(b);
    }
  }
}
function update() {
  board.element.style.left = `${board.x}%`;
  ball.element.style.left = `${ball.x}%`;
  ball.element.style.top = `${ball.y}%`;
  requestAnimationFrame(update);
  ballMove();
}

function boardMove(e) {
  if (
    e.code == "ArrowLeft" &&
    board.x - board.width / 2 - border - board.speed > 0
  ) {
    board.x -= board.speed;
  } else if (
    e.code == "ArrowRight" &&
    board.x + board.width / 2 + border + board.speed < 100
  ) {
    board.x += board.speed;
  }
}

function ballMove() {
  ball.x += ball.xSpeed;
  ball.y -= ball.ySpeed;
  if (ball.x >= 100 - border || ball.x <= 0 + border) {
    ball.xSpeed *= -1;
  }
  if (ball.y <= 0 - border) {
    ball.ySpeed *= -1;
  }
  collisionCheck();
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function collisionCheck() {
  const ballRect = ball.element.getBoundingClientRect();
  const boardRect = board.element.getBoundingClientRect();

  if (
    ballRect.bottom >= boardRect.top &&
    //ballRect.top <= boardRect.bottom &&
    ballRect.right >= boardRect.left &&
    ballRect.left <= boardRect.right
  ) {
    ball.ySpeed *= -1;
    ball.y -= 1;
  }
  for (let b of bricks) {
    const brickRect = b.getBoundingClientRect();
    if (ballRect.top <= brickRect.bottom || ballRect.bottom >= brickRect.top) {
      ball.ySpeed *= -1;
      b.style.backgroundColor = "white";
      await delay(100);
      b.parentNode.removeChild(b);
    }
    if (ballRect.right >= brickRect.left || ballRect.left <= brickRect.right) {
      ball.xSpeed *= -1;
    }
  }
}
