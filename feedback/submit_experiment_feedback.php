<?php
session_start();
include '../login/access_control.php';
include '../login/connection.php';

requireStudent();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $experiment_identifier = trim($_POST['experiment_identifier']);
    $question_number = intval($_POST['question_number']);
    $feedback = trim($_POST['feedback']);

    if (empty($experiment_identifier) || empty($question_number) || empty($feedback)) {
        http_response_code(400);
        echo 'All fields are required.';
        exit;
    }

    $username = $_SESSION['username'];

    $stmt = $conn->prepare('INSERT INTO experiment_feedback (username, experiment_identifier, question_number, feedback) VALUES (?, ?, ?, ?)');
    $stmt->bind_param('ssis', $username, $experiment_identifier, $question_number, $feedback);

    if ($stmt->execute()) {
        echo 'Feedback submitted successfully!';
    } else {
        http_response_code(500);
        echo 'An error occurred while saving your feedback.';
    }

    $stmt->close();
}
?>
