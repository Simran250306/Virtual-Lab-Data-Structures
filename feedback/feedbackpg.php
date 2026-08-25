<?php
session_start();
include '../login/access_control.php';
requireStudent();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../theory/theory.css">
    <title>Feedback | Virtual Lab</title>
</head>

<body>
    <header>
        <div id="headerContent">  
            <div id="menuToggle">&#9776;</div>  
            <div class="logo-container"> 
                <div class="img">
                    <img src="../media/somaiya.png" alt="Somaiya Logo"/>
                </div>
                <div class="logo-text">Virtual Lab | Data Structures | Feedback</div>
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
                <h2>Experiment 1: Stacks</h2>
                <button><a href="../feedback/1stackfb.php">Submit Feedback</a></button>
            </div>

            <div class="content-container">
                <h2>Experiment 2: Infix to postfix</h2>
                <button><a href="../feedback/2intopostfixfb.php" >Submit Feedback</a></button>
            </div>

            <div class="content-container">
                <h2>Experiment 3: Applications of stack</h2>
                <button><a href="../feedback/3exp3fb.php">Submit Feedback</a></button>
            </div>

            <div class="content-container">
                <h2>Postfix Evaluation</h2>
                <button><a href="../feedback/4postfixevalfb.php">Submit Feedback</a></button>
            </div>

            <div class="content-container">
                <h2>Parenthesis Checker</h2>
                <button><a href="../feedback/5parenthesisfb.php">Submit Feedback</a></button>
            </div>

            <div class="content-container">
                <h2>Experiment 4: Linear Queue</h2>
                <button><a href="../feedback/6lqueuefb.php">Submit Feedback</a></button>
            </div>

            <div class="content-container">
                <h2>Experiment 5 : Circular Queue</h2>
                <button><a href="../feedback/7cqueuefb.php">Submit Feedback</a></button>
            </div>

            <div class="content-container">
                <h2>Double Ended Queue</h2>
                <button><a href="../feedback/8dequeuefb.php">Submit Feedback</a></button>
            </div>

            <div class="content-container">
                <h2>Experiment 6: Singly Linked List</h2>
                <button><a href="../feedback/9singlyllfb.php">Submit Feedback</a></button>
            </div>

            <div class="content-container">
                <h2>Experiment 7: Doubly Linked List</h2>
                <button><a href="../feedback/10doublyllfb.php">Submit Feedback</a></button>
            </div>

            <div class="content-container">
                <h2>Experiment 8: Binary Search Tree</h2>
                <button><a href="../feedback/11bstfb.php">Submit Feedback</a></button>
            </div>

            <div class="content-container">
                <h2>AVL Tree</h2>
                <button><a href="../feedback/12avltreefb.php">Submit Feedback</a></button>
            </div>

            <div class="content-container">
                <h2>Graph</h2>
                <button><a href="../feedback/13graphfb.php">Submit Feedback</a></button>
            </div>
        </div>
        <div class="content">
            <div class="content-container">
                
                    <h2>General Feedback</h2>
                    <form id="general-feedback-form">
                    <div class="general-feedback" style="display: flex; align-items: flex-end; gap: 16px;">
                        <textarea name="feedback" rows="10" style="width: 800px; min-width: 350px; max-width: 100%; resize: vertical;" placeholder="Enter your feedback here..." required></textarea>
                        <button type="submit" style="height: 48px; margin-bottom: 8px;">Submit</button>
                    </div>
                </form>
            </div>
    </main>

    <footer>
        <div class="dept">
            <p>Department of Computer Engineering, KJSIT
                <br>
                Developed by : Simran Devrukhkar, Mahi Ghevariya, Aaryan Ghori
                <br>
                Guided by : 
                <a href="https://kjsit.somaiya.edu.in/en/view-member/220291/">Prof. Pradnya Bhangale</a>, 
                <a href="https://kjsit.somaiya.edu.in/en/view-member/220292/">Prof. Priyanka Deshmukh</a>
            </p>
        </div>
</footer>

<script>
        document.addEventListener("DOMContentLoaded", function() {
            const generalFeedbackForm = document.getElementById('general-feedback-form');
            if (generalFeedbackForm) {
                generalFeedbackForm.addEventListener('submit', function(event) {
                    event.preventDefault();
                    const feedback = this.querySelector('textarea[name="feedback"]').value;
                    
                    fetch('submit_general_feedback.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: 'feedback=' + encodeURIComponent(feedback)
                    })
                    .then(response => response.text())
                    .then(data => {
                        alert(data);
                        if (data.includes('Thank you')) {
                            this.reset();
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('An error occurred. Please try again.');
                    });
                });
            }
        });
    </script>
   
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

        // Load content into Lab drop down
    </script>
</body>
</html>



