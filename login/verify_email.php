<?php
include 'connection.php';
include 'email_verification_utils.php';

$token = $_GET['token'] ?? '';
$role = $_GET['role'] ?? '';
$username = trim($_GET['username'] ?? '');

if ($token === '' || $username === '' || !in_array($role, ['student', 'faculty'], true)) {
    header('Location: login.html?error=verify_failed');
    exit();
}

if (!ensureEmailVerificationTable($conn)) {
    header('Location: login.html?error=verify_failed');
    exit();
}

$tokenHash = hash('sha256', $token);
$stmt = $conn->prepare('SELECT id FROM user_email_verifications WHERE role = ? AND username = ? AND token_hash = ? AND is_verified = 0 AND expires_at > NOW() LIMIT 1');
if ($stmt === false) {
    header('Location: login.html?error=verify_failed');
    exit();
}

$stmt->bind_param('sss', $role, $username, $tokenHash);
$stmt->execute();
$result = $stmt->get_result();
$row = $result ? $result->fetch_assoc() : null;
$stmt->close();

if (!$row) {
    header('Location: login.html?error=verify_failed');
    exit();
}

$update = $conn->prepare('UPDATE user_email_verifications SET is_verified = 1, verified_at = NOW(), token_hash = REPEAT("0", 64) WHERE id = ? LIMIT 1');
if ($update === false) {
    header('Location: login.html?error=verify_failed');
    exit();
}

$id = (int)$row['id'];
$update->bind_param('i', $id);
$ok = $update->execute();
$update->close();

if (!$ok) {
    header('Location: login.html?error=verify_failed');
    exit();
}

$syncOk = markEmailVerified($conn, $role, $username);
if (!$syncOk) {
    header('Location: login.html?error=verify_failed');
    exit();
}

header('Location: login.html?verify=success');
exit();
?>
