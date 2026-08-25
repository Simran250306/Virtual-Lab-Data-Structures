<?php
session_start();
require_once("../access_control.php");
requireFaculty(); // Only faculty can access this page
$username = isset($_SESSION["username"]) ? $_SESSION["username"] : "User";
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/home/home.css">
    <title>Home | Virtual Lab</title>
</head>

<body>
    <header>
        <div id="headerContent">  <!-- Wrapper for content -->
            <div id="menuToggle">☰</div>  <!-- Menu Toggle Button -->
            <div class="logo-container"> <!-- Logo container -->
                <div class="img">
                    <img src="/media/somaiya.png" alt="Somaiya Logo"/>
                </div>
                <div class="logo-text">Virtual Lab | Data Structures</div>
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
            <li><a href="../../login/logout.php">Logout</a></li>
        </ul>
    </aside>
    <main>
        <section class="first">
            <div class="leftsection">
                <h1 class="home">Home</h1>
                <br>
                <p class="para">Welcome <i><?php echo htmlspecialchars($username); ?></i> to our Virtual Lab!<br>
                    Our Lab is designed to help you understand Data Structures!<br><br>
                    This Virtual Lab provides you with<br>
                </p>
                <ul>
                    <li>Theory</li>
                    <li>Labs</li>
                    <li>Data Structures Book</li>
                </ul>
                <br>
                <span id="element"></span>
            </div>
            <div class="rightsection">
                <img src="/media/ds1.png" alt="Lab Picture"/>
            </div>
        </section>
        
    </main>

    <footer>
        <div class="dept">
            <p>Department of Computer Engineering, KJSIT
                <br>
                Developed by : Simran Devrukhkar, Mahi Ghevariya, Aaryan Ghori
                <br>
                Guided by : <a href="https://kjsit.somaiya.edu.in/en/view-member/220292/">Prof. Priyanka Deshmukh</a>, 
                <a href="https://kjsit.somaiya.edu.in/en/view-member/220291/">Prof. Pradnya Bhangale</a>
            </p>
        </div>
</footer>
    <script src="https://unpkg.com/typed.js@2.0.16/dist/typed.umd.js"></script>
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
