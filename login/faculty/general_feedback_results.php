<?php
session_start();
require_once("../access_control.php");
requireFaculty();
include '../../login/connection.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>General Feedback Results</title>
    <link rel="stylesheet" href="../../home/home.css">
    <style>
        table { width: 90%; margin: 30px auto; border-collapse: collapse; }
        th, td { border: 1px solid #ccc; padding: 12px; text-align: left; }
        th { background: #93332e; color: #fff; }
        tr:nth-child(even) { background: #f9f9f9; }
        h2 { text-align: center; margin-top: 30px; }
    </style>
</head>
<body>
    <header>
        <div id="headerContent">  <!-- Wrapper for content -->
            <div id="menuToggle">☰</div>  <!-- Menu Toggle Button -->
            <div class="logo-container"> <!-- Logo container -->
                <div class="img">
                    <img src="/media/somaiya.png" alt="Somaiya Logo"/>
                </div>
                <div class="logo-text">Virtual Lab | Data Structures | Feedback Results</div>
            </div>
        </div>
    </header>
    <aside id="sidebar">
        <ul>
            <li><a href="../faculty/dashboard.php">Home</a></li>
            <li><a href="../../pdf/DATA STRUCTURES E-BOOK.pdf" target="_blank">E-Book</a></li>
            <li><a href="../../theory/theoryf.php">Theory</a></li>
            <li><a href="../../about/aboutf.php">About Us</a></li>
            <li><a href="../faculty/general_feedback_results.php">General Feedback</a></li>
            <li><a href="../faculty/experiment_feedback_results.php">Experiment Feedback</a></li>
            <li><a href="../../uploads/manage_pdfs.php">Uploads</a></li>
            <li><a href="../logout.php">Logout</a></li>
        </ul>
    </aside>
    <h2>General Feedback Results</h2>
    <table>
        <tr>
            <th>Username</th>
            <th>Feedback</th>
        </tr>
        <?php
        $result = $conn->query("SELECT username, feedback FROM general_feedback ORDER BY id DESC");
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                echo "<tr><td>" . htmlspecialchars($row['username']) . "</td><td>" . htmlspecialchars($row['feedback']) . "</td></tr>";
            }
        } else {
            echo "<tr><td colspan='2'>No feedback submitted yet.</td></tr>";
        }
        ?>
    </table>

    <footer>
        <div class="dept">
            <p>Department of Computer Engineering, KJSIT
                <br>
                Developed by : Simran Devrukhkar, Mahi Ghevariya, Aaryan Ghori
                <br>
                Guided by :
                <a href="https://kjsit.somaiya.edu.in/en/view-member/220291/">Prof. Pradnya Bhangale</a>, <a href="https://kjsit.somaiya.edu.in/en/view-member/220292/">Prof. Priyanka Deshmukh</a>
            </p>
        </div>
</footer>
    <script>
        const menuToggle = document.getElementById("menuToggle");
        const sidebar = document.getElementById("sidebar");

        menuToggle.addEventListener("click", () => {
            sidebar.classList.toggle("show");
        });

        document.addEventListener("click", (event) => {
            const isClickInside = sidebar.contains(event.target) || menuToggle.contains(event.target);
            if (!isClickInside) {
                sidebar.classList.remove("show");
            }
        });
    </script>
</body>
</html>
