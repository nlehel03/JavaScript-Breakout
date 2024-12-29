<?php
require 'db.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_SESSION['username'])) {
    $score = $_POST['score'];
    $username = $_SESSION['username'];

    $stmt = $pdo->prepare('INSERT INTO scores (user_id, score) VALUES (?, ?)');
    $stmt->execute([$username, $score]);

    echo 'Pontszám elmentve!';
} else {
    echo 'Be kell jelentkezni a mentéshez.';
}
?>
