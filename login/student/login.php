<?php
session_start();
include_once('../connection.php');
include_once('../email_verification_utils.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($email === '' || $password === '') {
        header('Location: ../login.html?error=invalid_credentials');
        exit();
    }

    $stmt = $conn->prepare('SELECT id, name, username, email, password FROM student_table WHERE email = ? LIMIT 1');
    if ($stmt === false) {
        http_response_code(500);
        echo 'An internal error occurred.';
        exit();
    }

    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result ? $result->fetch_assoc() : null;
    $stmt->close();

    if ($row && password_verify($password, $row['password'])) {
        if (!isEmailVerified($conn, 'student', $row['username'])) {
            header('Location: ../login.html?error=email_not_verified');
            exit();
        }

        session_regenerate_id(true);
        $_SESSION['user_id'] = (int)$row['id'];
        $_SESSION['username'] = $row['username'];
        $_SESSION['name'] = $row['name'];
        $_SESSION['email'] = $row['email'];
        $_SESSION['user_role'] = 'student';
        header('Location: ../../home/home.php');
        exit();
    }

    header('Location: ../login.html?error=invalid_credentials');
    exit();
}

header('Location: ../login.html');
exit();
?>
