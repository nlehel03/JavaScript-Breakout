<?php
    session_start();
    /*require "kapcsolat.php";*/
    if (isset($_SESSION['errorMessage'])) {
        $errorMessage = $_SESSION['errorMessage'];
        unset($_SESSION['errorMessage']);
    /*$kapcsolat
    ->prepare("INSERT INTO users (username, password) VALUES (:felhasznalonev, :jelszo)")
    ->execute([
        'username' => $_POST["username"],
        'password' => password_hash($_POST["password"],PASSWORD_DEFAULT),
    ]);
    header("Location: login.php");  
    echo "Sikeres regisztráció";*/
    $username = $_POST['usernameRegistration'];
    $password = $_POST['password'];
    $passwordAgain = $_POST['passwordAgainRegistration'];
    if($password === $passwordAgain)
    {
        $passwordHash=password_hash($password, PASSWORD_DEFAULT);
        $conn = new mysqli('mysql.caesar.elte.hu','nlehel03','QY5VrcbdeNmoN1p4','nlehel03');
        if($conn->connect_error){
            echo "$conn->connect_error";
            die("Csatlakozás sikertelen : ". $conn->connect_error);
        }
        $stmt = $conn->prepare("insert into users(username, passwordHash) VALUES(?, ?)");
        $stmt->bind_param("ss", $username, $passwordHash);
        if ($stmt->execute()) {
            echo "Sikeres regisztráció!";
            header("Location: login.php");
            exit();
        } else {
            die( "Hiba történt: " . $stmt->error);
        }
        $stmt->close();
        $conn->close();
    }
    else{
        $errorMessage = "A két jelszó nem egyezik";
        header("Location: registration.php"); 
        exit(); 
    }
?>

