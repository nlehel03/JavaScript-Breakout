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
    $successMessage = '';

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $username = $_POST['usernameRegistration'] ?? '';
        $password = $_POST['passwordRegistration'] ?? '';
        $passwordAgain = $_POST['passwordAgainRegistration'] ?? '';
        
        if  ($password === $passwordAgain) {
         
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);  
            //$conn = new mysqli_connect('mysql.caesar.elte.hu', 'nlehel03', 'QY5VrcbdeNmoN1p4', 'nlehel03', port:3307);
            $conn = new mysqli('mysql.caesar.elte.hu', 'nlehel03', 'QY5VrcbdeNmoN1p4', 'nlehel03');
            //$conn = new mysqli('192.168.0.159', 'lehel', 'Lehel123', 'jatek');
            //$conn = new mysqli('localhost', 'lehel', 'Lehel123', 'jatek');
            

            if ($conn->connect_error) {
                $errorMessage = "Csatlakozási hiba: " . $conn->connect_error;
            } else {
                $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
                $stmt->bind_param("ss", $username, $passwordHash);

                if ($stmt->execute()) {
                    $successMessage = "Sikeres regisztráció! Jelentkezz be.";
                    echo "Sikeres regisztráció! Jelentkezz be.";
                    header("Location: login.php");
                    exit(); // Fontos az exit!
                } else {
                    $errorMessage = "Hiba történt: " . $stmt->error;
                }

                $stmt->close();
                $conn->close();
            }

        } else {
            $errorMessage = "A két jelszó nem egyezik.";
            echo $errorMessage;
        }
    }
    if ($errorMessage) {
        echo "<script>alert('" . htmlspecialchars($errorMessage, ENT_QUOTES) . "');</script>";
    }
    if ($successMessage) {
        echo "<script>alert('" . htmlspecialchars($successMessage, ENT_QUOTES) . "');</script>";
    }

?>
    <div class="gameWindow">
        <form id="registration" method="POST" action="">
            <h1 id="registrationh1">Regisztráció</h1>
            <input id="usernameRegistration" name="usernameRegistration" placeholder="Felhasználónév" required>
            <input id="passwordRegistration" name="passwordRegistration" placeholder="Jelszó" type="password" required>
            <input id="passwordAgainRegistration" name="passwordAgainRegistration" placeholder="Jelszó ismét" type="password" required>
            <button id="registrationButton" type="submit">Regisztráció</button>
        </form>

        <!-- <?php if ($errorMessage): ?>
            <div class="errorDiv"><?php echo htmlspecialchars($errorMessage); ?></div>
        <?php endif; ?>
        <?php if ($successMessage): ?>
            <div class="successDiv"><?php echo htmlspecialchars($successMessage); ?></div>
        <?php endif; ?> -->
    </div>
</body>
</html>
