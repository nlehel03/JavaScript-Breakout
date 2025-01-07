<!DOCTYPE html>
<html lang="hu">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="style.css" />    
        <title>Regisztráció</title>
    </head>
<body>

<?php
    
    session_start();
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    $errorMessage = '';

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $username = $_POST['usernameRegistration'] ?? '';
        $password = $_POST['passwordRegistration'] ?? '';
        $passwordAgain = $_POST['passwordAgainRegistration'] ?? '';
        if  ($password === $passwordAgain) {        
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);  
            $conn = new mysqli('mysql.caesar.elte.hu', 'nlehel03', 'QY5VrcbdeNmoN1p4', 'nlehel03');
            if ($conn->connect_error) {
                $errorMessage = "Csatlakozási hiba: " . $conn->connect_error;
            } else {
                $stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
                $stmt->bind_param("s", $username);
                $stmt->execute();
                $stmt->bind_result($userCount);
                $stmt->fetch();
                $stmt->close();
                if ($userCount > 0) {
                    $errorMessage = "A felhasználónév már létezik.";
                } else {
                    $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
                    $stmt->bind_param("ss", $username, $passwordHash);            
                    if ($stmt->execute()) {
                        header("Location: login.php");
                    } else {
                        $errorMessage = "Hiba történt: " . $stmt->error;
                    }                
                    $stmt->close();
                }
                $conn->close();
                }
        } else {
            $errorMessage = "A két jelszó nem egyezik.";
        }
    }
    if ($errorMessage) {
        echo "<script>alert('" . htmlspecialchars($errorMessage, ENT_QUOTES) . "');</script>";
    }

?>
    <div class="gameWindow">
        <div id="registration">
            <form id="registrationForm" method="POST" action="">
                <h1 id="registrationh1">Registration</h1>
                <input id="usernameRegistration" name="usernameRegistration" placeholder="Username" required>
                <input id="passwordRegistration" name="passwordRegistration" placeholder="Password" type="password" required>
                <input id="passwordAgainRegistration" name="passwordAgainRegistration" placeholder="Repeat Password" type="password" required>
                <button id="registrationButton" type="submit">Registration</button>
            </form>
            <button id="loginFormButton" onclick="window.location.href='login.php'; return false;">Back</button>
        </div>
    </div>
</body>
</html>
