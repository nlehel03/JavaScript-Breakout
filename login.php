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
        <form id="login" method="POST" action="login-handle.php">
            <h1 id="loginh1">Login</h1>
            <input type="text" id="usernameLogin" name="usernameLogin" placeholder="Username" ></input>
            <input type="password" id="passwordLogin" name="passwordLogin" placeholder="Password" ></input>
            <button id="loginButton" type="submit">Login</button>
            <div class="errorDiv">
            <?php echo htmlspecialchars($errorMessage); ?>
            </div>
            <button id="registrationFormButton" onclick="registrationForm(event)">Registration</button>
        </form>
    </div>
    <p id="gitHub"><a href="https://github.com/nlehel03/JavaScript-Breakout.git">GitHub Repository</a></p>
    
  </body>
</html>

