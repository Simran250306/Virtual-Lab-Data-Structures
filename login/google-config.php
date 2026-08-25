<?php

function getGoogleOAuthConfig(): array
{
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';

    return [
        'client_id' => getenv('GOOGLE_CLIENT_ID') ?: '',
        'client_secret' => getenv('GOOGLE_CLIENT_SECRET') ?: '',
        'redirect_uri' => getenv('GOOGLE_REDIRECT_URI') ?: $scheme . '://' . $host . '/login/google_callback.php',
        'auth_uri' => 'https://accounts.google.com/o/oauth2/v2/auth',
        'token_uri' => 'https://oauth2.googleapis.com/token',
        'userinfo_uri' => 'https://openidconnect.googleapis.com/v1/userinfo',
    ];
}

function buildGoogleAuthUrl(string $state): string
{
    $config = getGoogleOAuthConfig();
    $params = [
        'client_id' => $config['client_id'],
        'redirect_uri' => $config['redirect_uri'],
        'response_type' => 'code',
        'scope' => 'openid email profile',
        'access_type' => 'online',
        'prompt' => 'select_account',
        'state' => $state,
    ];

    return $config['auth_uri'] . '?' . http_build_query($params, '', '&', PHP_QUERY_RFC3986);
}

function postFormData(string $url, array $fields): ?array
{
    $payload = http_build_query($fields, '', '&', PHP_QUERY_RFC3986);

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
            CURLOPT_TIMEOUT => 15,
        ]);

        $response = curl_exec($ch);
        $statusCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($response === false || $statusCode < 200 || $statusCode >= 300) {
            return null;
        }

        $decoded = json_decode($response, true);
        return is_array($decoded) ? $decoded : null;
    }

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => $payload,
            'timeout' => 15,
        ],
    ]);

    $response = @file_get_contents($url, false, $context);
    if ($response === false) {
        return null;
    }

    $decoded = json_decode($response, true);
    return is_array($decoded) ? $decoded : null;
}

function exchangeGoogleCodeForToken(string $code): ?array
{
    $config = getGoogleOAuthConfig();
    if ($config['client_id'] === '' || $config['client_secret'] === '') {
        return null;
    }

    return postFormData($config['token_uri'], [
        'code' => $code,
        'client_id' => $config['client_id'],
        'client_secret' => $config['client_secret'],
        'redirect_uri' => $config['redirect_uri'],
        'grant_type' => 'authorization_code',
    ]);
}

function fetchGoogleUserInfo(string $accessToken): ?array
{
    $config = getGoogleOAuthConfig();
    $url = $config['userinfo_uri'] . '?access_token=' . urlencode($accessToken);

    $response = @file_get_contents($url);
    if ($response === false) {
        return null;
    }

    $decoded = json_decode($response, true);
    return is_array($decoded) ? $decoded : null;
}

?>
