<?php

function ensureEmailVerificationTable(mysqli $conn): bool
{
    $sql = "CREATE TABLE IF NOT EXISTS user_email_verifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        role VARCHAR(20) NOT NULL,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        token_hash VARCHAR(64) NOT NULL,
        expires_at DATETIME NOT NULL,
        is_verified TINYINT(1) NOT NULL DEFAULT 0,
        verified_at DATETIME NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uniq_role_username (role, username),
        INDEX idx_email (email),
        INDEX idx_token_hash (token_hash)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";

    return (bool)$conn->query($sql);
}

function createVerificationToken(mysqli $conn, string $role, string $username, string $email, int $ttlHours = 24): ?string
{
    $token = bin2hex(random_bytes(32));
    $tokenHash = hash('sha256', $token);
    $expiresAt = date('Y-m-d H:i:s', time() + ($ttlHours * 3600));

    $stmt = $conn->prepare(
        'INSERT INTO user_email_verifications (role, username, email, token_hash, expires_at, is_verified, verified_at)
         VALUES (?, ?, ?, ?, ?, 0, NULL)
         ON DUPLICATE KEY UPDATE
           email = VALUES(email),
           token_hash = VALUES(token_hash),
           expires_at = VALUES(expires_at),
           is_verified = 0,
           verified_at = NULL'
    );

    if ($stmt === false) {
        return null;
    }

    $stmt->bind_param('sssss', $role, $username, $email, $tokenHash, $expiresAt);
    $executeSuccessful = $stmt->execute();
    $stmt->close();

    return $executeSuccessful ? $token : null;
}

function getUserTableForRole(string $role): ?string
{
    if ($role === 'student') {
        return 'student_table';
    }

    if ($role === 'faculty') {
        return 'faculty_table';
    }

    return null;
}

function isEmailVerified(mysqli $conn, string $role, string $username): bool
{
    if (!ensureEmailVerificationTable($conn)) {
        return false;
    }

    $verifyStmt = $conn->prepare('SELECT is_verified FROM user_email_verifications WHERE role = ? AND username = ? LIMIT 1');
    if ($verifyStmt !== false) {
        $verifyStmt->bind_param('ss', $role, $username);
        $verifyStmt->execute();
        $verifyResult = $verifyStmt->get_result();
        $verifyRow = $verifyResult ? $verifyResult->fetch_assoc() : null;
        $verifyStmt->close();

        if ($verifyRow !== null) {
            return (int)$verifyRow['is_verified'] === 1;
        }
    }

    $table = getUserTableForRole($role);
    if ($table === null) {
        return false;
    }

    $legacyStmt = $conn->prepare("SELECT email_verified FROM {$table} WHERE username = ? LIMIT 1");
    if ($legacyStmt === false) {
        return false;
    }

    $legacyStmt->bind_param('s', $username);
    $legacyStmt->execute();
    $legacyResult = $legacyStmt->get_result();
    $legacyRow = $legacyResult ? $legacyResult->fetch_assoc() : null;
    $legacyStmt->close();

    return $legacyRow !== null && (int)$legacyRow['email_verified'] === 1;
}

function markEmailVerified(mysqli $conn, string $role, string $username): bool
{
    if (!ensureEmailVerificationTable($conn)) {
        return false;
    }

    $updateStmt = $conn->prepare('UPDATE user_email_verifications
        SET is_verified = 1, verified_at = NOW(), token_hash = REPEAT("0", 64)
        WHERE role = ? AND username = ? LIMIT 1');
    if ($updateStmt === false) {
        return false;
    }

    $updateStmt->bind_param('ss', $role, $username);
    $ok = $updateStmt->execute();
    $updateStmt->close();

    if (!$ok) {
        return false;
    }

    $table = getUserTableForRole($role);
    if ($table === null) {
        return false;
    }

    $legacyStmt = $conn->prepare("UPDATE {$table}
        SET email_verified = 1, verification_token = NULL, token_expiry = NULL
        WHERE username = ? LIMIT 1");
    if ($legacyStmt === false) {
        return false;
    }

    $legacyStmt->bind_param('s', $username);
    $legacyOk = $legacyStmt->execute();
    $legacyStmt->close();

    return $legacyOk;
}

/**
 * @SuppressWarnings(PHPMD.Superglobals)
 */
function buildVerificationUrl(string $role, string $username, string $token): string
{
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';

    return $scheme . '://' . $host . '/login/verify_email.php?token=' . urlencode($token)
        . '&role=' . urlencode($role)
        . '&username=' . urlencode($username);
}

/**
 * @SuppressWarnings(PHPMD.Superglobals)
 */
function buildResetPasswordUrl(string $role, string $username, string $token): string
{
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';

    return $scheme . '://' . $host . '/login/reset_password.php?token=' . urlencode($token)
        . '&role=' . urlencode($role)
        . '&username=' . urlencode($username);
}

function sendVerificationEmail(string $toEmail, string $verifyUrl, string $role): bool
{
    $subject = 'Verify Your VLDS Account Email';
    $message = "Hello,\n\n"
        . 'Please verify your ' . ucfirst($role) . " account by clicking the link below:\n\n"
        . $verifyUrl . "\n\n"
        . "This link expires in 24 hours.\n\n"
        . "If you did not create this account, you can ignore this email.\n\n"
        . "Regards,\nVLDS Team";

    $headers = "From: simran.dd@somaiya.edu\r\n";
    $headers .= "Reply-To: simran.dd@somaiya.edu\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $sent = mail($toEmail, $subject, $message, $headers);
    if (!$sent) {
        error_log('Email verification send failed for ' . $toEmail . '. Verification URL: ' . $verifyUrl);
    }

    return $sent;
}

function sendPasswordResetEmail(string $toEmail, string $resetUrl, string $role): bool
{
    $subject = 'VLDS Password Reset Request';
    $message = "Hello,\n\n"
        . 'A password reset request was approved for your ' . ucfirst($role) . " account.\n"
        . "Use the link below to reset your password:\n\n"
        . $resetUrl . "\n\n"
        . "This link expires in 1 hour.\n\n"
        . "If you did not request this, contact support immediately.\n\n"
        . "Regards,\nVLDS Team";

    $headers = "From: simran.dd@somaiya.edu\r\n";
    $headers .= "Reply-To: simran.dd@somaiya.edu\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $sent = mail($toEmail, $subject, $message, $headers);
    if (!$sent) {
        error_log('Password reset email send failed for ' . $toEmail . '. Reset URL: ' . $resetUrl);
    }

    return $sent;
}

?>
