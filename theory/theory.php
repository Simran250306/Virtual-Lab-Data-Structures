<?php
session_start();
require_once('../login/access_control.php');
requireStudent();
include '../login/connection.php';
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
    <title>Theory | Virtual Lab</title>
</head>

<body>
    <header>
        <div id="headerContent">  <!-- Wrapper for content -->
            <div id="menuToggle">&#9776;</div>  <!-- Menu Toggle Button -->
            <div class="logo-container"> <!-- Logo container -->
                <div class="img">
                    <img src="../media/somaiya.png" alt="Somaiya Logo"/>
                </div>
                <div class="logo-text">Virtual Lab | Data Structures | Theory</div>
            </div>
        </div>
    </header>
    <aside id="sidebar">
        <ul>
            <li><a href="../home/home.php">Home</a></li>
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

            <h3>Faculty Uploads</h3>
            <?php
            if (isset($conn) && $conn) {
                $result = $conn->query('SELECT filename, path FROM pdfs ORDER BY id DESC');

                if ($result) {
                    if ($result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                            $filename = htmlspecialchars($row['filename']);
                            $storedPath = ltrim((string)$row['path'], '/');
                            $publicPath = '../uploads/' . $storedPath;
                            $path = htmlspecialchars($publicPath);

                            echo "<div class=\"content-container\">";
                            echo "  <h2>{$filename}</h2>";
                            echo "  <button><a href=\"{$path}\" target=\"_blank\">View</a></button>";
                            echo '</div>';
                        }
                    } else {
                        echo '<div class="content-container">';
                        echo '  <p>No faculty uploads found at the moment.</p>';
                        echo '</div>';
                    }
                } else {
                    echo '<div class="content-container">';
                    echo '  <p style="color: red;">Error fetching faculty uploads: ' . htmlspecialchars($conn->error) . '</p>';
                    echo '</div>';
                }
                $conn->close();
            } else {
                echo '<div class="content-container">';
                echo '  <p style="color: red;">Database connection error. Please check the configuration.</p>';
                echo '</div>';
            }
            ?>
        </div>
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

    <script>
        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.getElementById('sidebar');
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });

        document.addEventListener('click', (event) => {
            const isClickInside = sidebar.contains(event.target) || menuToggle.contains(event.target);
            if (!isClickInside) {
                sidebar.classList.remove('show');
            }
        });

    </script>
</body>
</html>
