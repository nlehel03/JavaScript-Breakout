<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    session_start();
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['username']) && isset($_POST['score'])) {
        $conn = new mysqli('mysql.caesar.elte.hu', 'nlehel03', 'QY5VrcbdeNmoN1p4', 'nlehel03');

        if ($conn->connect_error) {
            die("Csatlakozási hiba: " . $conn->connect_error);
        }
        $username = $_POST['username'];
        $score = $_POST['score'];

        $stmt = $conn->prepare("INSERT INTO scores (username, score, create_at) VALUES (?, ?, NOW())");
        $stmt->bind_param("si", $username, $score);
        if ($stmt->execute()) {
            echo "sikeres mentés!";
        } else {
            echo "mentnés sikertelen: " . $stmt->error;
        }
        $stmt->close();
        $conn->close();
    }else {
        echo "Invalid kérés.";
    }
?>
