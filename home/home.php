<?php
session_start();
require_once("../login/access_control.php");
requireStudent(); // Only students can access this page
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
    <link rel="stylesheet" href="home.css">
    <title>Home | Virtual Lab</title>
</head>

<body>
    <header>
        <div id="headerContent">  <!-- Wrapper for content -->
            <div id="menuToggle">☰</div>  <!-- Menu Toggle Button -->
            <div class="logo-container"> <!-- Logo container -->
                <div class="img">
                    <img src="../media/somaiya.png" alt="Somaiya Logo"/>
                </div>
                <div class="logo-text">Virtual Lab | Data Structures | Home</div>
            </div>
        </div>
    </header>
    <aside id="sidebar">
        <ul>
            <li><a href="home.php">Home</a></li>
            <li><a href="../pdf/DATA STRUCTURES E-BOOK.pdf" target="_blank">E-Book</a></li>
            <li><a href="../theory/theory.php">Theory</a></li>
            <li>
                <a href="#">Labs</a>
                <ul class="dropdown">
                    <li><a href="../exp1stack/stack.html">Experiment 1: Stacks</a></li>
                    <hr/>
                    <li><a href="../exp2/intopostfix.html">Experiment 2: Infix to postfix</a></li>
                    <hr/>
                    <li><a href="../exp3/exp3.html">Experiment 3: Applications of stack</a></li>
                    <hr/>
                    <li><a href="../exp3postfixeval/postfix.html">Postfix Evaluation</a></li>
                    <hr/>
                    <li><a href="../exp3zparenthesis/parenthesis.html">Parenthesis Checker</a></li>
                    <hr/>
                    <li><a href="../exp4linearqueue/lqueue.html">Experiment 4: Linear Queue</a></li>
                    <hr/>
                    <li><a href="../exp5circularqueue/cqueue.html">Experiment 5 : Circular Queue</a></li>
                    <hr/>
                    <li><a href="../exp5dequeue/dequeue.html">Double Ended Queue</a></li>
                    <hr/>
                    <li><a href="../exp6singlyll/singlyll.html">Experiment 6: Singly Linked List</a></li>
                    <hr/>
                    <li><a href="../exp7doublyll/doublyll.html">Experiment 7: Doubly Linked List</a></li>
                    <hr/>
                    <li><a href="../exp8bst/bst.html">Experiment 8: Binary Search Tree</a></li>
                    <hr/>
                    <li><a href="../exp8zavltree/avltree.html">AVL Tree</a></li>
                    <hr/>
                    <li><a href="../exp9graph/graph.html">Graph </a></li>
                </ul>
            </li>
            <li><a href="../about/about.php">About Us</a></li>
            <li><a href="../feedback/feedbackpg.php">Feedback</a></li>
            <li><a href="../login/logout.php">Logout</a></li>
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
                <img src="../media/ds1.png" alt="Lab Picture"/>
            </div>
        </section>
        
    </main>

    <footer>
        <div class="dept">
            <p>Department of Computer Engineering, KJSIT
                <br>
                Developed by : Simran Devrukhkar, Mahi Ghevariya, Aaryan Ghori
                <br>
                Guided by : <a href="https://kjsit.somaiya.edu.in/en/view-member/220291/">Prof. Pradnya Bhangale</a>,
                <a href="https://kjsit.somaiya.edu.in/en/view-member/220292/">Prof. Priyanka Deshmukh</a> 
                
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

        var typed = new Typed("#element", {
            strings: ["Welcome to our Virtual Lab!", "Let's learn", "Let's grow", "and Succeed together!"],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1000,
            loop: true
        });
    </script>
</body>
</html>
