<?php
declare(strict_types=1);

/** Validates an enquiry and sends it to a server-configured recipient. */
function llv_handle_enquiry(string $method, string $contentType, string $raw, array $config, ?callable $sender = null, ?callable $allowRequest = null): array
{
    if ($method === 'OPTIONS') return [204, null];
    if ($method !== 'POST') return [405, ['error' => 'Method not allowed']];
    foreach (['resend_api_key', 'from_email', 'to_email'] as $key) {
        if (!is_string($config[$key] ?? null) || trim($config[$key]) === '') {
            return [503, ['error' => 'Email delivery is not configured yet.']];
        }
    }
    if (stripos($contentType, 'application/json') === false) {
        return [415, ['error' => 'Use an application/json request.']];
    }
    if (strlen($raw) > 16000) return [413, ['error' => 'Enquiry is too long.']];
    try {
        $input = json_decode($raw, true, 32, JSON_THROW_ON_ERROR);
    } catch (JsonException $error) {
        return [400, ['error' => 'Invalid enquiry payload.']];
    }
    $labels = ['Name', 'Email', 'Phone', 'Event', 'Event Date', 'Message'];
    if (!is_array($input) || !in_array($input['formType'] ?? null, ['Contact Form', 'Book Slot'], true)
        || !is_array($input['fields'] ?? null) || !array_is_list($input['fields']) || count($input['fields']) !== count($labels)) {
        return [400, ['error' => 'Invalid enquiry payload.']];
    }
    $fields = $input['fields'];
    foreach ($fields as $index => &$field) {
        if (!is_array($field) || ($field['label'] ?? null) !== $labels[$index]
            || !is_string($field['value'] ?? null) || trim($field['value']) === ''
            || !preg_match('/^.{1,2000}$/us', $field['value'])) {
            return [400, ['error' => 'Please complete all enquiry fields (maximum 2000 characters each).']];
        }
        $field['value'] = trim($field['value']);
    }
    unset($field);
    $replyTo = $fields[1]['value'];
    if (strlen($replyTo) > 254 || !filter_var($replyTo, FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $replyTo)) {
        return [400, ['error' => 'Please enter a valid email address.']];
    }
    $date = DateTimeImmutable::createFromFormat('!Y-m-d', $fields[4]['value']);
    if (!$date || $date->format('Y-m-d') !== $fields[4]['value']) {
        return [400, ['error' => 'Please enter a valid event date.']];
    }
    if (!filter_var($config['to_email'], FILTER_VALIDATE_EMAIL)) {
        return [503, ['error' => 'Email delivery is not configured yet.']];
    }
    $escape = static fn(string $value): string => htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $rows = '';
    $text = 'New ' . $input['formType'] . " enquiry\n";
    foreach ($fields as $field) {
        $rows .= '<tr><th style="text-align:left;padding:8px">' . $escape($field['label']) . '</th><td style="padding:8px">' . nl2br($escape($field['value']), false) . '</td></tr>';
        $text .= $field['label'] . ': ' . $field['value'] . "\n";
    }
    $mail = [
        'from' => $config['from_email'],
        'to' => [$config['to_email']],
        'reply_to' => $replyTo,
        'subject' => 'Love Light Vision: ' . $input['formType'] . ' enquiry',
        'text' => $text,
        'html' => '<h2>New ' . $escape($input['formType']) . ' enquiry</h2><table>' . $rows . '</table>',
    ];
    try {
        if ($allowRequest !== null && !$allowRequest()) {
            return [429, ['error' => 'Too many enquiries. Please try again later or contact us on WhatsApp.']];
        }
        $send = $sender ?? 'llv_send_resend';
        if (!$send($mail, $config['resend_api_key'])) {
            return [502, ['error' => 'Unable to send email. Please use WhatsApp or email the studio directly.']];
        }
        // This confirms provider acceptance. Check Resend for the final delivery event.
        return [200, ['ok' => true]];
    } catch (Throwable $error) {
        error_log('Love Light Vision: enquiry email could not be sent.');
        return [502, ['error' => 'Email is currently unavailable. Please use WhatsApp or email the studio directly.']];
    }
}

function llv_send_resend(array $mail, string $apiKey): bool
{
    if (!function_exists('curl_init')) return false;
    $curl = curl_init('https://api.resend.com/emails');
    curl_setopt_array($curl, [
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $apiKey, 'Content-Type: application/json'],
        CURLOPT_POSTFIELDS => json_encode($mail, JSON_THROW_ON_ERROR),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_SSL_VERIFYHOST => 2,
    ]);
    $body = curl_exec($curl);
    $status = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
    unset($curl);
    if ($body === false || $status < 200 || $status >= 300) return false;
    $result = json_decode($body, true);
    return is_array($result) && is_string($result['id'] ?? null) && $result['id'] !== '';
}

/** File-backed limit: five validated submissions per client address in ten minutes. */
function llv_allow_enquiry(string $address, string $directory, ?int $now = null): bool
{
    $now = $now ?? time();
    if (!is_dir($directory) && !@mkdir($directory, 0700, true) && !is_dir($directory)) {
        throw new RuntimeException('Unable to initialize enquiry limit storage.');
    }
    $path = $directory . '/' . hash('sha256', __DIR__ . $address) . '.json';
    $handle = @fopen($path, 'c+');
    if ($handle === false) throw new RuntimeException('Unable to open enquiry limit storage.');
    try {
        if (!flock($handle, LOCK_EX)) throw new RuntimeException('Unable to lock enquiry limit storage.');
        $stored = json_decode(stream_get_contents($handle), true);
        $recent = is_array($stored) ? array_values(array_filter($stored, static fn($time) => is_int($time) && $time > $now - 600)) : [];
        if (count($recent) >= 5) return false;
        $recent[] = $now;
        rewind($handle);
        ftruncate($handle, 0);
        fwrite($handle, json_encode($recent, JSON_THROW_ON_ERROR));
        fflush($handle);
        return true;
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}
