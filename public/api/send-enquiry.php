<?php
declare(strict_types=1);
ini_set('display_errors', '0');

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('Allow: POST, OPTIONS');

require __DIR__ . '/enquiry-handler.php';
// On Hostinger, place this private file alongside public_html, never inside it.
$configPath = dirname(__DIR__, 2) . '/enquiry-config.php';
$config = [];
try {
    if (is_file($configPath)) {
        $loaded = require $configPath;
        if (is_array($loaded)) $config = $loaded;
    }
    $raw = file_get_contents('php://input', false, null, 0, 16001);
    [$status, $body] = llv_handle_enquiry(
        $_SERVER['REQUEST_METHOD'] ?? 'GET',
        $_SERVER['CONTENT_TYPE'] ?? '',
        $raw === false ? '' : $raw,
        $config,
        null,
        static fn(): bool => llv_allow_enquiry(
            $_SERVER['REMOTE_ADDR'] ?? 'unknown',
            dirname(__DIR__, 2) . '/.enquiry-rate-limit'
        )
    );
} catch (Throwable $error) {
    error_log('Love Light Vision: enquiry configuration could not be loaded.');
    $status = 503;
    $body = ['error' => 'Email delivery is not configured yet.'];
}
http_response_code($status);
if ($status === 429) header('Retry-After: 600');
if ($body !== null) echo json_encode($body);
