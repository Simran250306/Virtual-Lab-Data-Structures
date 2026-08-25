<?php
session_start();
require_once('../login/access_control.php');
requireFaculty();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="theory.css">
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
                <div class="logo-text">Virtual Lab | Data Structures | Results </div>
            </div>
        </div>
    </header>
    <aside id="sidebar">
        <ul>
            <li><a href="../login/faculty/dashboard.php">Home</a></li>
            <li><a href="../../pdf/DATA STRUCTURES E-BOOK.pdf" target="_blank">E-Book</a></li>
            <li><a href="../../theory/theoryf.php">Theory</a></li>
            <li><a href="../../about/aboutf.php">About Us</a></li>
            <li><a href="../login//faculty/general_feedback_results.php">General Feedback</a></li>
            <li><a href="../login/faculty/experiment_feedback_results.php">Experiment Feedback</a></li>
            <li><a href="../uploads/manage_pdfs.php">Uploads</a></li>
            <li><a href="../login/logout.php">Logout</a></li>
        </ul>
    </aside>
    <main>
        <div class="content">
        <div class="content-container">
            <h2>Module 1: Introduction to Data Structures</h2>
            <button><a href="../pdf/DS_Module1.pdf" target="_blank">Notes</a></button>
        </div>

        <div class="content-container">
            <h2>Module 2: Stacks and Queues</h2>
            <button><a href="../pdf/DS_Module2.pdf" target="_blank">Notes</a></button>
        </div>

        <div class="content-container">
            <h2>Module 3: Linked List</h2>
            <button><a href="../pdf/DS_Module3.pdf" target="_blank">Notes</a></button>
        </div>

        <div class="content-container">
            <h2>Module 4: Trees</h2>
            <button><a href="../pdf/DS_Module4.pdf" target="_blank">Notes</a></button>
        </div>

        <div class="content-container">
            <h2>Module 5: Graphs</h2>
            <button><a href="../pdf/DS_Module5.pdf" target="_blank">Notes</a></button>
        </div>

        <div class="content-container">
            <h2>Module 6: Searching Techniques</h2>
            <button><a href="../pdf/DS_Module6.pdf" target="_blank">Notes</a></button>
        </div>
    </div>
    </main>

    <footer>
        <div class="dept">
            <p>Department of Computer Engineering, KJSIT
                <br>
                Developed by : Simran Devrukhkar, Mahi Ghevariya, Aaryan Ghori
                <br>
                Guided by : <a href="https://kjsit.somaiya.edu.in/en/view-member/220291/">Prof. Pradnya Bhangale</a>, <a href="https://kjsit.somaiya.edu.in/en/view-member/220292/">Prof. Priyanka Deshmukh</a>
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

