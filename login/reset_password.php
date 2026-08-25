<?php
include 'connection.php';

function isValidRole(string $role): bool
{
    return in_array($role, ['student', 'faculty'], true);
}

function isStrongPassword(string $password): bool
{
    return strlen($password) >= 8
        && preg_match('/[A-Z]/', $password)
        && preg_match('/[a-z]/', $password)
        && preg_match('/\d/', $password)
        && preg_match('/[^A-Za-z0-9]/', $password);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['token'] ?? '';
    $role = $_POST['role'] ?? '';
    $username = trim($_POST['username'] ?? '');
    $newPassword = $_POST['new_password'] ?? '';
    $confirmPassword = $_POST['confirm_password'] ?? '';

    if ($token === '' || $username === '' || !isValidRole($role)) {
        header('Location: login.html?error=reset_failed');
        exit();
    }

    if ($newPassword !== $confirmPassword) {
        echo "<script>alert('Passwords do not match.'); window.history.back();</script>";
        exit();
    }

    if (!isStrongPassword($newPassword)) {
        echo "<script>alert('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'); window.history.back();</script>";
        exit();
    }

    $tokenHash = hash('sha256', $token);
    $lookupStmt = $conn->prepare('SELECT id FROM password_reset_tokens WHERE username = ? AND role = ? AND token_hash = ? AND used = 0 AND expires_at > NOW() LIMIT 1');
    if ($lookupStmt === false) {
        header('Location: login.html?error=reset_failed');
        exit();
    }
    $lookupStmt->bind_param('sss', $username, $role, $tokenHash);
    $lookupStmt->execute();
    $lookupResult = $lookupStmt->get_result();
    $tokenRow = $lookupResult ? $lookupResult->fetch_assoc() : null;
    $lookupStmt->close();

    if (!$tokenRow) {
        header('Location: login.html?error=reset_failed');
        exit();
    }

    $table = $role === 'faculty' ? 'faculty_table' : 'student_table';
    $passwordHash = password_hash($newPassword, PASSWORD_DEFAULT);

    $updateStmt = $conn->prepare("UPDATE {$table} SET password = ? WHERE username = ? LIMIT 1");
    if ($updateStmt === false) {
        header('Location: login.html?error=reset_failed');
        exit();
    }
    $updateStmt->bind_param('ss', $passwordHash, $username);
    $updateStmt->execute();
    $updated = $updateStmt->affected_rows > 0;
    $updateStmt->close();

    if (!$updated) {
        header('Location: login.html?error=reset_failed');
        exit();
    }

    $consumeStmt = $conn->prepare('UPDATE password_reset_tokens SET used = 1 WHERE username = ? AND role = ? AND used = 0');
    if ($consumeStmt) {
        $consumeStmt->bind_param('ss', $username, $role);
        $consumeStmt->execute();
        $consumeStmt->close();
    }

    header('Location: login.html?reset=success');
    exit();
}

$token = $_GET['token'] ?? '';
$role = $_GET['role'] ?? '';
$username = trim($_GET['username'] ?? '');

if ($token === '' || $username === '' || !isValidRole($role)) {
    header('Location: login.html?error=reset_failed');
    exit();
}

$tokenHash = hash('sha256', $token);
$validateStmt = $conn->prepare('SELECT id FROM password_reset_tokens WHERE username = ? AND role = ? AND token_hash = ? AND used = 0 AND expires_at > NOW() LIMIT 1');
if ($validateStmt === false) {
    header('Location: login.html?error=reset_failed');
    exit();
}
$validateStmt->bind_param('sss', $username, $role, $tokenHash);
$validateStmt->execute();
$validateResult = $validateStmt->get_result();
$isValid = $validateResult && $validateResult->num_rows > 0;
$validateStmt->close();

if (!$isValid) {
    header('Location: login.html?error=reset_failed');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Password</title>
  <link rel="stylesheet" href="login.css" />
</head>
<body>
  <div class="login-container">
    <h1>Reset Password</h1>
    <form action="reset_password.php" method="post">
      <input type="hidden" name="token" value="<?php echo htmlspecialchars($token, ENT_QUOTES, 'UTF-8'); ?>">
      <input type="hidden" name="role" value="<?php echo htmlspecialchars($role, ENT_QUOTES, 'UTF-8'); ?>">
      <input type="hidden" name="username" value="<?php echo htmlspecialchars($username, ENT_QUOTES, 'UTF-8'); ?>">

      <div class="input-group">
        <label for="new_password">New Password</label>
        <input type="password" id="new_password" name="new_password" required minlength="8" />
      </div>
      <div class="input-group">
        <label for="confirm_password">Confirm Password</label>
        <input type="password" id="confirm_password" name="confirm_password" required minlength="8" />
      </div>

      <button type="submit" class="login-button">Update Password</button>
    </form>
    <div class="extra-links">
      <a href="login.html">Back to Login</a>
    </div>
  </div>
</body>
</html>
