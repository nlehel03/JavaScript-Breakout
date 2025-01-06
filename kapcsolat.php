<?php
function kapcsolodas()
{
    try {
        $felhasznalonev = "nlehel03";
        $jelszo = "QY5VrcbdeNmoN1p4";
        $kapcsolati_szoveg = "mysql:host=mysql.caesar.elte.hu;dbname=nlehel03;";
        echo "1";
        $pdo = new PDO($kapcsolati_szoveg, $felhasznalonev, $jelszo);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "csatlakozás sikeres";
        return $pdo;
    } catch (PDOException $e) {
        die("Adatbázis hiba " . $e->getMessage());
    }

    
}
$kapcsolat = kapcsolodas();
?>