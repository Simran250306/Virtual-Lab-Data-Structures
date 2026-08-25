<?php
session_start();
include_once('connection.php');
include_once('email_verification_utils.php');
include_once('google-config.php');

$code = $_GET['code'] ?? '';
$state = $_GET['state'] ?? '';

if ($code === '' || $state === '' || empty($_SESSION['google_oauth_state']) || $state !== $_SESSION['google_oauth_state']) {
    unset($_SESSION['google_oauth_state'], $_SESSION['google_oauth_role']);
    header('Location: login.html?error=google_login_failed');
    exit();
}

$role = $_SESSION['google_oauth_role'] ?? '';
unset($_SESSION['google_oauth_state'], $_SESSION['google_oauth_role']);

if (!in_array($role, ['student', 'faculty'], true)) {
    header('Location: login.html?error=google_login_failed');
    exit();
}

$tokenResponse = exchangeGoogleCodeForToken($code);
if (!$tokenResponse || empty($tokenResponse['access_token'])) {
    header('Location: login.html?error=google_login_failed');
    exit();
}

$googleUser = fetchGoogleUserInfo($tokenResponse['access_token']);
if (!$googleUser || empty($googleUser['email']) || empty($googleUser['sub']) || empty($googleUser['email_verified'])) {
    header('Location: login.html?error=google_email_unverified');
    exit();
}

$email = trim($googleUser['email']);
$googleId = trim($googleUser['sub']);
$table = getUserTableForRole($role);

if ($table === null) {
    header('Location: login.html?error=google_login_failed');
    exit();
}

$stmt = $conn->prepare("SELECT id, name, username, email, google_id FROM {$table} WHERE email = ? LIMIT 1");
if ($stmt === false) {
    header('Location: login.html?error=google_login_failed');
    exit();
}

$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();
$row = $result ? $result->fetch_assoc() : null;
$stmt->close();

if (!$row) {
    header('Location: login.html?error=google_account_not_linked');
    exit();
}

if (!empty($row['google_id']) && $row['google_id'] !== $googleId) {
    header('Location: login.html?error=google_login_failed');
    exit();
}

$updateStmt = $conn->prepare("UPDATE {$table}
    SET google_id = ?, email_verified = 1, verification_token = NULL, token_expiry = NULL
    WHERE id = ? LIMIT 1");
if ($updateStmt === false) {
    header('Location: login.html?error=google_login_failed');
    exit();
}

$userId = (int)$row['id'];
$updateStmt->bind_param('si', $googleId, $userId);
$updated = $updateStmt->execute();
$updateStmt->close();

if (!$updated) {
    header('Location: login.html?error=google_login_failed');
    exit();
}

if (!markEmailVerified($conn, $role, $row['username'])) {
    header('Location: login.html?error=google_login_failed');
    exit();
}

session_regenerate_id(true);
$_SESSION['user_id'] = $userId;
$_SESSION['username'] = $row['username'];
$_SESSION['name'] = $row['name'];
$_SESSION['email'] = $email;
$_SESSION['user_role'] = $role;

if ($role === 'faculty') {
    header('Location: faculty/dashboard.php');
    exit();
}

header('Location: ../home/home.php');
exit();
?>
