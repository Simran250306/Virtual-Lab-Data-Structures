<?php
include 'connection.php';
include 'email_verification_utils.php';

const RESET_WINDOW_MINUTES = 15;
const MAX_ATTEMPTS_PER_IP = 5;
const MAX_ATTEMPTS_PER_ACCOUNT = 3;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: forgot_password.html');
    exit();
}

$role = $_POST['role'] ?? '';
$username = trim($_POST['username'] ?? '');
$email = trim($_POST['email'] ?? '');
$securityQuestion = $_POST['security_question'] ?? '';
$securityAnswer = trim($_POST['security_answer'] ?? '');
$normalizedAnswer = strtolower($securityAnswer);
$ipAddress = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

$allowedQuestions = ['pet_name', 'mother_maiden', 'birth_city', 'favourite_teacher', 'favourite_food'];
$resetWindowMinutes = RESET_WINDOW_MINUTES;

if (!in_array($role, ['student', 'faculty'], true)
    || $username === ''
    || !filter_var($email, FILTER_VALIDATE_EMAIL)
    || !in_array($securityQuestion, $allowedQuestions, true)
    || $securityAnswer === '') {
    header('Location: login.html?error=reset_failed');
    exit();
}

$createAttemptsTableSql = "CREATE TABLE IF NOT EXISTS password_reset_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL,
    role VARCHAR(20) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_ip_created (ip_address, created_at),
    INDEX idx_account_created (email, role, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

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

$createTokenTableSql = "CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    token_hash VARCHAR(64) NOT NULL,
    expires_at DATETIME NOT NULL,
    used TINYINT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_role (username, role),
    INDEX idx_token_hash (token_hash)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

if (!$conn->query($createAttemptsTableSql) || !$conn->query($createSecurityTableSql) || !$conn->query($createTokenTableSql)) {
    header('Location: login.html?error=reset_failed');
    exit();
}

$ipLimitStmt = $conn->prepare(
    'SELECT COUNT(*) AS attempt_count FROM password_reset_attempts WHERE ip_address = ? AND created_at >= (NOW() - INTERVAL ? MINUTE)'
);
if ($ipLimitStmt === false) {
    header('Location: login.html?error=reset_failed');
    exit();
}
$ipLimitStmt->bind_param('si', $ipAddress, $resetWindowMinutes);
$ipLimitStmt->execute();
$ipResult = $ipLimitStmt->get_result();
$ipCount = (int)(($ipResult ? $ipResult->fetch_assoc()['attempt_count'] : 0) ?? 0);
$ipLimitStmt->close();

if ($ipCount >= MAX_ATTEMPTS_PER_IP) {
    header('Location: login.html?error=too_many_attempts');
    exit();
}

$accountLimitStmt = $conn->prepare(
    'SELECT COUNT(*) AS attempt_count FROM password_reset_attempts WHERE email = ? AND role = ? AND created_at >= (NOW() - INTERVAL ? MINUTE)'
);
if ($accountLimitStmt === false) {
    header('Location: login.html?error=reset_failed');
    exit();
}
$accountLimitStmt->bind_param('ssi', $email, $role, $resetWindowMinutes);
$accountLimitStmt->execute();
$accountResult = $accountLimitStmt->get_result();
$accountCount = (int)(($accountResult ? $accountResult->fetch_assoc()['attempt_count'] : 0) ?? 0);
$accountLimitStmt->close();

if ($accountCount >= MAX_ATTEMPTS_PER_ACCOUNT) {
    header('Location: login.html?error=too_many_attempts');
    exit();
}

$attemptStmt = $conn->prepare('INSERT INTO password_reset_attempts (ip_address, role, username, email) VALUES (?, ?, ?, ?)');
if ($attemptStmt) {
    $attemptStmt->bind_param('ssss', $ipAddress, $role, $username, $email);
    $attemptStmt->execute();
    $attemptStmt->close();
}

$table = $role === 'faculty' ? 'faculty_table' : 'student_table';
$userStmt = $conn->prepare("SELECT username FROM {$table} WHERE username = ? AND email = ? LIMIT 1");
if ($userStmt === false) {
    header('Location: login.html?error=reset_failed');
    exit();
}
$userStmt->bind_param('ss', $username, $email);
$userStmt->execute();
$userResult = $userStmt->get_result();
$userRow = $userResult ? $userResult->fetch_assoc() : null;
$userStmt->close();

if (!$userRow) {
    header('Location: login.html?error=reset_failed');
    exit();
}

$securityStmt = $conn->prepare('SELECT question, answer_hash FROM user_security_questions WHERE role = ? AND username = ? LIMIT 1');
if ($securityStmt === false) {
    header('Location: login.html?error=reset_failed');
    exit();
}
$securityStmt->bind_param('ss', $role, $username);
$securityStmt->execute();
$securityResult = $securityStmt->get_result();
$securityRow = $securityResult ? $securityResult->fetch_assoc() : null;
$securityStmt->close();

if (!$securityRow || $securityRow['question'] !== $securityQuestion || !password_verify($normalizedAnswer, $securityRow['answer_hash'])) {
    header('Location: login.html?error=reset_failed');
    exit();
}

$invalidateStmt = $conn->prepare('UPDATE password_reset_tokens SET used = 1 WHERE username = ? AND role = ? AND used = 0');
if ($invalidateStmt) {
    $invalidateStmt->bind_param('ss', $username, $role);
    $invalidateStmt->execute();
    $invalidateStmt->close();
}

$token = bin2hex(random_bytes(32));
$tokenHash = hash('sha256', $token);
$expiresAt = date('Y-m-d H:i:s', time() + 3600);

$insertTokenStmt = $conn->prepare('INSERT INTO password_reset_tokens (username, role, token_hash, expires_at) VALUES (?, ?, ?, ?)');
if ($insertTokenStmt === false) {
    header('Location: login.html?error=reset_failed');
    exit();
}
$insertTokenStmt->bind_param('ssss', $username, $role, $tokenHash, $expiresAt);
$insertOk = $insertTokenStmt->execute();
$insertTokenStmt->close();

if (!$insertOk) {
    header('Location: login.html?error=reset_failed');
    exit();
}

$resetUrl = buildResetPasswordUrl($role, $username, $token);
$mailSent = sendPasswordResetEmail($email, $resetUrl, $role);

if (!$mailSent) {
    header('Location: login.html?reset=mail_failed');
    exit();
}

header('Location: login.html?reset=requested');
exit();
?>
