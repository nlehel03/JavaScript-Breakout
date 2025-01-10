<!DOCTYPE html>
<html lang="hu">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="game.js" defer></script>
    <link rel="stylesheet" href="style.css" />
    <title>Document</title>
  </head>
  <body>
    <div class="gameWindow">
        <div id="menu">
            <div clas="resultsH1Div">
                <h1 class="resultsH1">Results</h1>
            </div>
            <div class="scrollable-table">
                <table class="resultTable">
                    <?php
                    error_reporting(E_ALL);
                    ini_set('display_errors', 1);
                    session_start();
                    $conn = new mysqli("mysql.caesar.elte.hu", "nlehel03", "QY5VrcbdeNmoN1p4", "nlehel03");
            
                    if ($conn->connect_error) {
                        die("Kapcsolódási hiba: " . $conn->connect_error);
                    }
                    $query = "SELECT id, username, score, created_at FROM scores";
                    $result = $conn->query($query);

                    if($result === false)
                    {
                        die("Lekérdezési hiba:" .$conn->error);
                    }

                    if ($result->num_rows > 0) {
                        echo "<thread><tr><th>ID</th><th>Username</th><th>Score</th><th>Created At</th></tr></thread>";
                        echo "<tbody>";
                        while($row = $result->fetch_assoc()) {
                            /*echo "<script>console.log('" . $row['id'] . " - ". $row['username'] . " - " . $row['score'] . " - " . $row['created_at'] . "');</script>";*/
                            if ($row['username'] === $_SESSION['username']) {
                                echo "<tr><td>" . htmlspecialchars($row['id'], ENT_QUOTES) . "</td><td>" . htmlspecialchars($row['username'], ENT_QUOTES) . "</td><td>" . htmlspecialchars($row['score'], ENT_QUOTES) . "</td><td>" . htmlspecialchars($row['created_at'], ENT_QUOTES) . "</td></tr>";
                            }
                        }
                        echo "</tbody>";
                        echo "<script>console.log('Sikeres');</script>";
                    } else {
                        echo "<script>console.log('Nincsenek eredmények');</script>";
                    }
                $conn->close();
                ?>
                </table>
            </div>
            <button class="menuButton" onclick="window.location.href='index.php'">Menu</button>
        </div>
    </div>
    <p id="gitHub"><a href="https://github.com/nlehel03/JavaScript-Breakout.git">GitHub Repository</a></p>
    
  </body>
</html>

