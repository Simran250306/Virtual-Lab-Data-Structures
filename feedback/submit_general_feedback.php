<?php
session_start();
include '../login/access_control.php';
include '../login/connection.php';

requireStudent();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $feedback = trim($_POST['feedback']);

    if (empty($feedback)) {
        http_response_code(400);
        echo 'Feedback cannot be empty.';
        exit;
    }

    $username = $_SESSION['username'];

    $stmt = $conn->prepare('INSERT INTO general_feedback (username, feedback) VALUES (?, ?)');

    if ($stmt === false) {
        http_response_code(500);
        error_log('General feedback prepare failed: ' . $conn->error);
        echo 'An error occurred while saving your feedback.';
        exit;
    }

    $stmt->bind_param('ss', $username, $feedback);

    if ($stmt->execute()) {
        echo 'Thank you for your feedback!';
    } else {
        http_response_code(500);
        error_log('General feedback execute failed: ' . $stmt->error);
        echo 'An error occurred while saving your feedback.';
    }

    $stmt->close();
}
?>
