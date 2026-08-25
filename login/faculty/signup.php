<?php
include_once('../connection.php');
include_once('../email_verification_utils.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $rawPassword = $_POST['password'] ?? '';
    $facultyCode = $_POST['faculty_code'] ?? '';
    $securityQuestion = $_POST['security_question'] ?? '';
    $securityAnswer = strtolower(trim($_POST['security_answer'] ?? ''));

    $allowedQuestions = ['pet_name', 'mother_maiden', 'birth_city', 'favourite_teacher', 'favourite_food'];

    if ($name === '' || $username === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $rawPassword === ''
        || !in_array($securityQuestion, $allowedQuestions, true) || $securityAnswer === '') {
        echo 'Invalid signup data.';
        exit();
    }

    $expectedCode = 'FACULTY2025';
    if ($facultyCode !== $expectedCode) {
        echo 'Invalid Faculty Code!';
        exit();
    }

    $createSecurityTableSql = "CREATE TABLE IF NOT EXISTS user_security_questions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        role VARCHAR(20) NOT NULL,
        username VARCHAR(255) NOT NULL,
        question VARCHAR(100) NOT NULL,
        answer_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uniq_role_username (role, username)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

    if (!$conn->query($createSecurityTableSql) || !ensureEmailVerificationTable($conn)) {
        echo 'Database setup failed.';
        exit();
    }

    $checkStmt = $conn->prepare('SELECT id FROM faculty_table WHERE username = ? OR email = ? LIMIT 1');
    if ($checkStmt === false) {
        echo 'Query error.';
        exit();
    }
    $checkStmt->bind_param('ss', $username, $email);
    $checkStmt->execute();
    $existing = $checkStmt->get_result();
    $exists = $existing && $existing->num_rows > 0;
    $checkStmt->close();

    if ($exists) {
        echo 'Username or Email already exists!';
        exit();
    }

    $password = password_hash($rawPassword, PASSWORD_DEFAULT);
    $answerHash = password_hash($securityAnswer, PASSWORD_DEFAULT);

    $conn->begin_transaction();
    try {
        $insertUserStmt = $conn->prepare('INSERT INTO faculty_table (name, username, email, password) VALUES (?, ?, ?, ?)');
        if ($insertUserStmt === false) {
            throw new Exception('User insert prepare failed');
        }
        $insertUserStmt->bind_param('ssss', $name, $username, $email, $password);
        if (!$insertUserStmt->execute()) {
            throw new Exception('User insert execute failed');
        }
        $insertUserStmt->close();

        $role = 'faculty';
        $insertSecurityStmt = $conn->prepare('INSERT INTO user_security_questions (role, username, question, answer_hash) VALUES (?, ?, ?, ?)');
        if ($insertSecurityStmt === false) {
            throw new Exception('Security insert prepare failed');
        }
        $insertSecurityStmt->bind_param('ssss', $role, $username, $securityQuestion, $answerHash);
        if (!$insertSecurityStmt->execute()) {
            throw new Exception('Security insert execute failed');
        }
        $insertSecurityStmt->close();

        $verificationToken = createVerificationToken($conn, $role, $username, $email, 24);
        if ($verificationToken === null) {
            throw new Exception('Verification token creation failed');
        }

        $conn->commit();

        $verificationUrl = buildVerificationUrl($role, $username, $verificationToken);
        $mailSent = sendVerificationEmail($email, $verificationUrl, $role);
        $verifyStatus = $mailSent ? 'check_email' : 'mail_failed';

        header('Location: /login/login.html?signup=success&verify=' . urlencode($verifyStatus));
        exit();
    } catch (Exception $e) {
        $conn->rollback();
        echo 'Registration failed. Please try again.';
    }
}
?>
