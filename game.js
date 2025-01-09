class Ball {
  constructor(x, y, w, h, s) {
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.x = x;
    this.y = y;
    this.xOriginal = this.x;
    this.yOriginal = this.y;
    this.height = h;
    this.width = w;
    this.xSpeed = s;
    this.ySpeed = s;
    this.touchCount = 0;
    this.fillColor = "white";
    this.tail = [];
  }
  draw(context) {
    if (ballBoosted) {
      this.tail.forEach((part, i) => {
        const a = 1 - i / this.tail.length;
        context.fillStyle = `rgba(255, 255, 0, ${a})`;
        context.fillRect(part.x, part.y, this.width, this.height);
      });
    }
    context.beginPath();
    context.fillStyle = this.fillColor;
    context.fillRect(this.x, this.y, this.width, this.height);
    context.closePath();
  }
  move() {
    if (ballBoosted) {
      this.tail.unshift({ x: this.x, y: this.y });

      if (this.tail.length > 10) {
        this.tail.pop();
      }
    } else {
      this.tail = [];
    }
    this.x += this.xSpeed;
    this.y -= this.ySpeed;
    if (this.x >= 1280 - border || this.x <= 0 + border) {
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
    if (e.code == "ArrowLeft" && this.x - this.speed > 0) {
      this.x -= this.speed;
    } else if (e.code == "ArrowRight" && this.x < 1122) {
      this.x += this.speed;
      //console.log(this.x);
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
      let color;
      if (turboBricks.includes(this)) {
        color = "turquoise";
      } else {
        if (this.line < 1) {
          color = "red";
        } else if (this.line < 2) {
          color = "orange";
        } else if (this.line < 3) {
          color = "yellow";
        } else if (this.line < 4) {
          color = "#33FF33";
        } else if (this.line < 5) {
          color = "skyblue";
        } else if (this.line < 6) {
          color = "#0080FF";
        } else if (this.line < 7) {
          color = "purple";
        }
      }
      context.fillStyle = color;
      context.strokeStyle = color;
      context.lineWidth = 2;
      context.strokeRect(this.x, this.y, this.width, this.height);
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
let brickArray = [];
let lives = 3;
let score = 0;
const border = 10;
let animationFrameId;
let go;
let canvas;
let context;
let canvasWidth;
let canvasHeight;
let ball;
let board;
let menu;

window.onload = function () {
  menu = document.getElementById("menu");
  menu.style.display = "flex";
  canvas = document.getElementById("gameCanvas");
  context = canvas.getContext("2d");
  canvasWidth = 1280;
  canvasHeight = 720;
  ball = new Ball(640, 504, 20, 20, 3);
  board = new Board(640, 150, 50, 21);
  createBrickContainer();
  randomBrick(10);
  drawBricks();

  go = document.getElementById("gameOver");
};
function startGame() {
  const menu = document.getElementById("menu"); 
  if (menu){
    menu.style.display = "none";
    requestAnimationFrame(update);
    document.addEventListener("keydown", (e) => board.move(e));
    scoresLivesUpdate();
  }else{
    console.error("A menu elem nem található");
  }
}

function createBrickContainer() {
  const rows = 7;
  const cols = 30;
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

let turboBricks = [];

function randomBrick(n) {
  turboBricks = [];
  while (turboBricks.length < n) {
    let ri = Math.floor(Math.random() * brickArray.length);
    let brick = brickArray[ri];
    if (!turboBricks.includes(brick)) {
      turboBricks.push(brick);
    }
  }
}

function update() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  board.draw(context);
  ball.draw(context);
  ball.move();
  ball.fall();
  drawBricks();
  scoresLivesUpdate();
  animationFrameId = requestAnimationFrame(update);
  endGame();
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let ballBoosted = false;
let ballBoostTime = null;

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

    if (ball.touchCount == 10) {
      if (ball.xSpeed > 0) {
        ball.xSpeed += 0.2;
      } else {
        ball.xSpeed -= 0.2;
      }
      if (ball.ySpeed > 0) {
        ball.ySpeed += 0.2;
      } else {
        ball.ySpeed -= 0.2;
      }
      ball.touchCount = 0;
    } else {
      ball.touchCount += 1;
    }
    console.log(ball.touchCount + " " + ball.xSpeed);
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
      if (turboBricks.includes(b)) {
        activeBoost();
      }

      if (!ballBoosted) {
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
      }
      context.clearRect(b.x, b.y, b.width, b.height);
      brickArray.splice(brickArray.indexOf(b), 1);
      color = "white";
      context.fillStyle = color;
      context.strokeStyle = color;
      context.lineWidth = 2;
      context.strokeRect(b.x, b.y, b.width, b.height);
      context.fillRect(b.x, b.y, b.width, b.height);
      b.exist = false;
      score += 1;
      await delay(2800);
      break;
    }
  }
}

function activeBoost() {
  if (!ballBoosted) {
    ballBoosted = true;
    ball.fillColor = "gold";
    ballBoostTime = setTimeout(() => {
      deactiveBoost();
    }, 3000);
  }
}

function deactiveBoost() {
  ballBoosted = false;
  ball.fillColor = "white";
  clearTimeout(ballBoostTime);
}
function scoresLivesUpdate() {
  const scoresLives = document.querySelector(".ScoresLives");
  if (scoresLives) {
    scoresLives.innerHTML = "Scores: " + score + "<br>Lives: " + lives;
  } else {
    console.error("A .ScoresLives elem nem található!");
  }
}

function endGame() {
  if (lives <= 0) {
    go.style.display = "flex";
    cancelAnimationFrame(animationFrameId);
    document.getElementById("gameOverScoreText").innerHTML =
      "Your Score: <br>" + score;
      var username = 'exampleUser'; 
      score = 100;
      saveScore(username,score);
  } else if (brickArray.length <= 0) {
    go.style.display = "flex";
    cancelAnimationFrame(animationFrameId);
    document.getElementById("gameOverh1").innerHTML = "You Win!";
    document.getElementById("gameOverScoreText").innerHTML =
      "Your Score: <br>" + score;
      var username = 'exampleUser'; // Replace with the actual username
      score = 100; // Replace with the actual score
      saveScore(username,score);
  }
}

function saveScore(username,score)
{
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'save.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  var data = 'username=' + encodeURIComponent(username) + '&score=' + encodeURIComponent(score);
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 400) {
        // siker!
        console.log(xhr.responseText);
    } else {
        // hiba
        console.error('Error: ' + xhr.status);
    }
  };
  xhr.onerror = function () {
    console.error('Request failed');
  };
  xhr.send(data);
}


const restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", restartGame);

function restartGame() {
  window.location.reload();
}

function registrationForm(event) {
  event.preventDefault();  
  window.location.href = 'registration.php';
}
function loginForm(event) {
  event.preventDefault();  
  window.location.href = 'login.php';
}



