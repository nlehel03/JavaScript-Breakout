<?php
    $errorMessage = "";
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $username = $_POST['usernameRegistration'];
        $password = $_POST['passwordRegistration'];
        $passwordAgain = $_POST['passwordAgainRegistration'];

        if($password !==$passwordAgain)
        {
            $errorMessage = "Hiba! A két jelszó nem egyezik";
            return;
        }
        else{
            
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            try {
                $pdo = new PDO("mysql:host=localhost;dbname=jatek", "felhasznalo", "jelszo");
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
                $stmt->execute([$username, $hashedPassword]);

                echo "Sikeresen regisztráltál!";
            } catch (PDOException $e) {
                if ($e->getCode() == 23000) { 
                    $errorMessage = "Hiba: A felhasználónév már foglalt!";
                } else {
                    $errorMessage = "Hiba történt: " . $e->getMessage();
                }
            }
        }
    }
?>
