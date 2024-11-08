let board;
let ball;
let brickList = [];
let lives = 3;
let point = 0;
const border = 0.7;
window.onload = function () {
  board = {
    element: document.getElementById("deszka"),
    x: 50,
    width: 10,
    height: 4,
    speed: 3,
  };
  ball = {
    element: document.getElementById("labda"),
    xSpeed: 0.3,
    ySpeed: 0.3,
    xAlap: 50,
    yAlap: 80,
    x: 50,
    y: 80,
  };

  initializeBricks();
  requestAnimationFrame(update);
  document.addEventListener("keydown", boardMove);
  pointsLivesUpdate();
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
      brickList.push(b);
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
  ballFall();
  pointsLivesUpdate();
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
    ballRect.right >= boardRect.left &&
    ballRect.left <= boardRect.right
  ) {
    ball.ySpeed *= -1;
    ball.y -= 1;
  }
  for (let b of brickList) {
    const brickRect = b.getBoundingClientRect();

    if (
      ballRect.bottom >= brickRect.top &&
      ballRect.right >= brickRect.left &&
      ballRect.left <= brickRect.right &&
      ballRect.top <= brickRect.bottom &&
      b.style.visibility != "hidden"
    ) {
      const collisionFromTop = Math.abs(ballRect.bottom - brickRect.top);
      const collisionFromBottom = Math.abs(ballRect.top - brickRect.bottom);
      const collisionFromLeft = Math.abs(ballRect.right - brickRect.left);
      const collisionFromRight = Math.abs(ballRect.left - brickRect.right);

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
      b.style.backgroundColor = "white";
      await delay(100);
      b.style.visibility = "hidden";
      point += 1;
      //b.parentNode.removeChild(b);
      //brickList = brickList.filter((brick) => brick !== b);
      break;
    }
  }
}

function ballFall() {
  if (ball.y >= 95) {
    let z = Math.floor(Math.random() * 2);
    if (z == 1) {
      ball.xSpeed *= -1;
    }

    ball.x = ball.xAlap;
    ball.y = ball.yAlap;
    ball.ySpeed *= -1;
    lives -= 1;
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
