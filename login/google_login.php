<?php
session_start();
include_once('google-config.php');

$role = $_GET['role'] ?? '';
if (!in_array($role, ['student', 'faculty'], true)) {
    header('Location: login.html?error=google_login_failed');
    exit();
}

$config = getGoogleOAuthConfig();
if ($config['client_id'] === '' || $config['client_secret'] === '') {
    header('Location: login.html?error=google_login_failed');
    exit();
}

$state = bin2hex(random_bytes(16));
$_SESSION['google_oauth_state'] = $state;
$_SESSION['google_oauth_role'] = $role;

header('Location: ' . buildGoogleAuthUrl($state));
exit();
?>
