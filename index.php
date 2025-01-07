<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Document</title>
  </head>
  <body>
    <?php
      session_start();
      if (!isset($_SESSION['username'])) {
        header('Location: login.php');
        exit();
      }

      $servername = "mysql.caesar.elte.hu";
      $username_db = "nlehel03"; 
      $password_db = "QY5VrcbdeNmoN1p4"; 
      $dbname = "nlehel03"; 

      $conn = new mysqli($servername, $username_db, $password_db, $dbname);

      if ($conn->connect_error) {
          die("Kapcsolódási hiba: " . $conn->connect_error);
      }
    ?>
      <div class="gameWindow">
        <div id="menu">
            <h1 id="BreakOuth1">BreakOut</h1>
            
            <button id="startButton" onclick="startGame()">Start Game</button>
            <button id="scoreTableButton" >Scores</button>
        </div>
        <canvas id="gameCanvas" width="1280" height="720"></canvas>
        <div class="ScoresLives">Scores: 0<br>Lives: 3</div>
        <div id="gameOver">
          <h1 id="gameOverh1">Game Over</h1>
          <p id="gameOverScoreText">Your Score:</p>
          <button id="restartButton" onclick="restartGame()">Restart</button>
        </div>
      </div>
    <p id="gitHub"><a href="https://github.com/nlehel03/JavaScript-Breakout.git">GitHub Repository</a></p>
    
    <script src="game.js" defer></script>
  </body>
</html>
