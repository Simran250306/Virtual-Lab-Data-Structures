<?php
session_start();
require_once("../access_control.php");
requireFaculty();
include '../../login/connection.php';

// Map experiment_identifier to friendly lab names
$lab_names = [
    'stack' => 'Experiment 1: Stacks',
    'intopostfix' => 'Experiment 2: Infix to Postfix',
    'exp3' => 'Experiment 3: Applications of Stack',
    'postfixeval' => 'Postfix Evaluation',
    'parenthesis' => 'Parenthesis Checker',
    'linearqueue' => 'Experiment 4: Linear Queue',
    'circularqueue' => 'Experiment 5: Circular Queue',
    'dequeue' => 'Double Ended Queue',
    'singlylinkedlist' => 'Experiment 6: Singly Linked List',
    'doublylinkedlist' => 'Experiment 7: Doubly Linked List',
    'binarysearchtree' => 'Experiment 8: Binary Search Tree',
    'avltree' => 'AVL Tree',
    'graph' => 'Graph',
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Experiment Feedback Results</title>
    <link rel="stylesheet" href="../../home/home.css">
    <style>
        table { width: 95%; margin: 30px auto; border-collapse: collapse; }
        th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
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
                <div class="logo-text">Virtual Lab | Data Structures | Experiment Feedback Results</div>
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
    <h2>Experiment Feedback Results</h2>
    <table>
        <tr>
            <th>Username</th>
            <th>Lab Name</th>
            <th>Q1</th>
            <th>Q2</th>
            <th>Q3</th>
            <th>Q4</th>
            <th>Q5</th>
        </tr>
        <?php
        // Fetch all feedback, group by username and experiment_identifier
        $sql = "SELECT username, experiment_identifier, question_number, feedback FROM experiment_feedback ORDER BY username, experiment_identifier, question_number";
        $result = $conn->query($sql);
        $data = [];
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $user = $row['username'];
                $exp = $row['experiment_identifier'];
                $q = (int)$row['question_number'];
                $fb = $row['feedback'];
                if (!isset($data[$user])) $data[$user] = [];
                if (!isset($data[$user][$exp])) $data[$user][$exp] = [1=>'',2=>'',3=>'',4=>'',5=>''];
                $data[$user][$exp][$q] = $fb;
            }
            foreach ($data as $user => $exps) {
                foreach ($exps as $exp => $feedbacks) {
                    echo "<tr>";
                    echo "<td>" . htmlspecialchars($user) . "</td>";
                    echo "<td>" . htmlspecialchars($lab_names[$exp] ?? $exp) . "</td>";
                    for ($i=1; $i<=5; $i++) {
                        echo "<td>" . htmlspecialchars($feedbacks[$i] ?? '') . "</td>";
                    }
                    echo "</tr>";
                }
            }
        } else {
            echo "<tr><td colspan='7'>No experiment feedback submitted yet.</td></tr>";
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
