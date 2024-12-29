<?php
require 'db.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['usernameLogin'];
    $password = $_POST['passwordLogin'];

    $stmt = $pdo->prepare('SELECT * FROM users WHERE username = ?');
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['passwordLogin'])) {
        $_SESSION['usernameLogin'] = $user['usernameLogin'];
        echo 'Sikeres bejelentkezés!';
    } else {
        echo 'Hibás felhasználónév vagy jelszó.';
    }
}
?>
