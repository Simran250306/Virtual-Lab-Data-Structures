<?php
// Access Control Functions

/**
 * Check if user is logged in
 * @SuppressWarnings(PHPMD.Superglobals)
 */
function isLoggedIn()
{
    return isset($_SESSION['username'], $_SESSION['user_role'])
        && in_array($_SESSION['user_role'], ['student', 'faculty'], true);
}

/**
 * Centralized unauthorized handler.
 * Destroys potentially invalid/tampered sessions before redirect.
 */
function handleUnauthorized(): void
{
    $_SESSION = [];

    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params['path'],
            $params['domain'],
            $params['secure'],
            $params['httponly']
        );
    }

    session_destroy();
    header('Location: /login/login.html?error=unauthorized');
    exit();
}

/**
 * Check if user is faculty
 * @SuppressWarnings(PHPMD.Superglobals)
 */
function isFaculty()
{
    return isLoggedIn() && $_SESSION['user_role'] === 'faculty';
}

/**
 * Check if user is student
 * @SuppressWarnings(PHPMD.Superglobals)
 */
function isStudent()
{
    return isLoggedIn() && $_SESSION['user_role'] === 'student';
}

/**
 * Require faculty access - redirect if not faculty
 * @SuppressWarnings(PHPMD.ExitExpression)
 */
function requireFaculty()
{
    if (!isFaculty()) {
        handleUnauthorized();
    }
}

/**
 * Require student access - redirect if not student
 * @SuppressWarnings(PHPMD.ExitExpression)
 */
function requireStudent()
{
    if (!isStudent()) {
        handleUnauthorized();
    }
}

/**
 * Require any logged in user - redirect if not logged in
 * @SuppressWarnings(PHPMD.ExitExpression)
 */
function requireLogin()
{
    if (!isLoggedIn()) {
        header('Location: /login/login.html');
        exit();
    }
}
?>
