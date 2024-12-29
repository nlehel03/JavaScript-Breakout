<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <style>
        body{
            background-color: lightblue;
        }
    </style>
<?php

$felhasznalonev="nlehel03";
$jelszo="Anakin03";
$kapcsolati_szoveg="mysql:host=localhost;"
$pdo = new PDO($kapcsolati_szoveg, $felhasznalonev, $jelszo);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$sql="
CREATE DATABASE IF NOT EXISTS jatek;
USE jatek;

CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(50) NOT NULL PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    score INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES users(username)
);
"
$pdo->exec($sql);
echo "Táblák sikeresen létrehozva!";

?>
</body>
</html>l