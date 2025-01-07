<!DOCTYPE html>
<html lang="hu">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="game.js" defer></script>
    <link rel="stylesheet" href="style.css" />
    <title>Document</title>
  </head>
  <body>
    <?php
      session_start();
      error_reporting(E_ALL);
      ini_set('display_errors', 1);
      $errorMessage = '';
      if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $username = $_POST['usernameLogin'] ?? '';
        $password = $_POST['passwordLogin'] ?? '';
        $conn = new mysqli('mysql.caesar.elte.hu', 'nlehel03', 'QY5VrcbdeNmoN1p4', 'nlehel03');
        if ($conn->connect_error) {
          $errorMessage = "Csatlakozási hiba: " . $conn->connect_error;
        } else {
          $stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
          $stmt->bind_param("s", $username);
          $stmt->execute();
          $stmt->bind_result($storedPasswordHash);

          if ($stmt->fetch()) {
            if (password_verify($password, $storedPasswordHash)) {
              $_SESSION['username'] = $username; 
              header("Location: index.php"); 
              exit();
            } else {
              $errorMessage = "Hibás jelszó.";
            }
          } else {
            $errorMessage = "A felhasználónév nem létezik.";
          }
        }
        $conn->close();
      }
      if ($errorMessage) {
        echo "<script>alert('" . htmlspecialchars($errorMessage, ENT_QUOTES) . "');</script>";
      }
    ?>

    <div class="gameWindow">
        <form id="login" method="POST" action="">
            <h1 id="loginh1">Login</h1>
            <input type="text" id="usernameLogin" name="usernameLogin" placeholder="Username" ></input>
            <input type="password" id="passwordLogin" name="passwordLogin" placeholder="Password" ></input>
            <button id="loginButton" type="submit">Login</button>
            <button id="registrationFormButton" onclick="registrationForm(event)">Registration</button>
        </form>
    </div>
    <p id="gitHub"><a href="https://github.com/nlehel03/JavaScript-Breakout.git">GitHub Repository</a></p>
    
  </body>
</html>

