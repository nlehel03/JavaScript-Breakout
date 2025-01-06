<?php
  session_start();
  require 'kapcsolat.php';
  if (isset($_SESSION['errorMessage'])) {
    $errorMessage = $_SESSION['errorMessage'];
    unset($_SESSION['errorMessage']);
}else {
  $errorMessage = '';
}
$showLoginForm = isset($_SESSION['username']) && !empty($_SESSION['username']);
?>
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
    <?php if (!isset($_SESSION['username'])): ?>
      <div class="gameWindow">
          <div id="menu">
            <h1 id="BreakOuth1">BreakOut</h1>
            
            <button id="startButton" onclick="startGame()">Start Game</button>
            <button id="scoreTableButton" >Scores</button>
      </div>
    <?php else: ?>
      <form id="login" method="POST" action="login.php">
        <h1 id="loginh1">Login</h1>
        <input id="usernameLogin" name="usernameLogin" placeholder="Username" ></input>
        <input id="passwordLogin" name="passwordLogin" placeholder="Password" ></input>
        <button id="loginButton" type="submit">Login</button>
        <div class="errorDiv">
          <?php echo htmlspecialchars($errorMessage); ?>
        </div>
        <button id="registrationFormButton" onclick="registrationForm(event)">Registration</button>
      </form>
    <?php endif; ?>
      <form id="registration" method="POST" action="registration.php">
        <h1 id="registrationh1">Registration</h1>
        <input id="usernameRegistration" name="usernameRegistration" placeholder="Username" required></input>
        <input id="passwordRegistration" name="usernameRegistration" placeholder="Password" required></input>
        <input id="passwordAgainRegistration" name="passwordAgainRegistration" placeholder="Password again" required></input>
        <button id="registrationButton" type="submit">Registration</button>
        <div class="errorDiv">
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
