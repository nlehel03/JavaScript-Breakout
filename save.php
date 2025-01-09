<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    session_start();
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['username']) && isset($_POST['score'])) {
        $conn = new mysqli('mysql.caesar.elte.hu', 'nlehel03', 'QY5VrcbdeNmoN1p4', 'nlehel03');

        if ($conn->connect_error) {
            die("Csatlakozási hiba: " . $conn->connect_error);
        }
        $username = $conn->real_escape_string($_POST['username']);
        $score = $_POST['score'];

        $user_check_query = "SELECT username FROM users WHERE username = '$username'";
        $user_check_result = $conn->query($user_check_query);

        if ($user_check_result === false) {
            die("User check query failed: " . $conn->error);
        }
        
        if ($user_check_result->num_rows > 0) {
            $stmt = $conn->prepare("INSERT INTO scores (username, score, created_at) VALUES (?, ?, NOW())");

            if ($stmt === false) {
                die("Prepare failed: " . $conn->error);
            }

            $stmt->bind_param("si", $username, $score);

            if ($stmt->execute()) {
                echo "sikeres mentés!";
            } else {
                echo "mentés sikertelen: " . $stmt->error;
            }

            $stmt->close();
        } else {
                echo "Nincs ilyen felhasználó!";
        }
        $conn->close();
        
    }else {
        echo "Invalid kérés.";
    }
?>
