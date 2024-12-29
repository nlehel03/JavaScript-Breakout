<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="game.js" defer></script>
    <link rel="stylesheet" href="style.css" />
    <title>Document</title>
  </head>
  <body>
    <div class="gameWindow">
      <div id="menu">
        <h1 id="BreakOuth1">BreakOut</h1>
        
        <button id="startButton" onclick="startGame()">Start Game</button>
        <button id="scoreTableButton" >Scores</button>
      </div>
      <form id="login">
        <h1 id="loginh1">Login</h1>
        <textarea id="usernameLogin" placeholder="Username"></textarea>
        <textarea id="passwordLogin" placeholder="Password" >Password</textarea>
        <button id="loginButton">Login</button>
      </form>
      <form id="registration">
        <h1 id="registrationh1">Registration</h1>
        <textarea id="usernameRegistration" placeholder="Username"></textarea>
        <textarea id="passwordRegistration" placeholder="Password"></textarea>
        <textarea id="passwordAgainRegistration" placeholder="Password again"></textarea>
        <button id="registrationButton">Registration</button>
        <div class="error <?php if (!empty($errorMessage)) echo 'visible'; ?>" id="errorDiv">
          <?php echo htmlspecialchars($errorMessage); ?>
      </div>
      </form>
      
      
      <canvas id="gameCanvas" width="1280" height="720"></canvas>
      <div class="ScoresLives">Scores: 0<br>Lives: 3</div>
      <div id="gameOver">
        <h1 id="gameOverh1">Game Over</h1>
        <p id="gameOverScoreText">Your Score:</p>
        <button id="restartButton" onclick="restartGame()">Restart</button>
      </div>
    </div>
    <p id="gitHub"><a href="https://github.com/nlehel03/JavaScript-Breakout.git">GitHub Repository</a></p>
    
  </body>
</html>
