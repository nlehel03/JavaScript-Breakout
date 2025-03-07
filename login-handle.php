<?php
    session_start();
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    $errorMessage = '';

    require('kapcsolat.php');
    $stmt = $kapcsolat->prepare("SELECT username FROM users WHERE username = :username AND password = :password");
    $stmt->execute([
        "username" => $_POST["username"],
        "password" => password_hash($_POST["password"],PASSWORD_DEFAULT)
    ]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if( $user != null ) {
        echo "sikeres bejelentkezés";
        $_SESSION["username"] = $user["username"];
        header("Location: index.php");
    }
    else {
        echo "hibás felhasználónév vagy jelszó";
    }
?>