<?php
declare(strict_types=1);
require __DIR__ . '/../public/api/enquiry-handler.php';

$config = [
    'transport' => 'smtp', 'smtp_host' => 'smtp.hostinger.com', 'smtp_port' => 465,
    'smtp_encryption' => 'ssl', 'smtp_username' => 'studio@example.com',
    'smtp_password' => 'test-password', 'from_email' => 'studio@example.com',
    'from_name' => 'Studio', 'to_email' => 'owner@example.com',
];
$valid = ['formType' => 'Contact Form', 'fields' => [
    ['label' => 'Name', 'value' => 'Test Visitor'],
    ['label' => 'Email', 'value' => 'visitor@example.com'],
    ['label' => 'Phone', 'value' => '+91 90000 00000'],
    ['label' => 'Event', 'value' => 'Wedding'],
    ['label' => 'Event Date', 'value' => '2027-01-20'],
    ['label' => 'Message', 'value' => '<script>alert("hello")</script> & family'],
]];
function check(bool $condition, string $description): void {
    if (!$condition) throw new RuntimeException($description);
}
function run_test(string $name, callable $test): void {
    $test();
    echo "PASS: $name\n";
}
$never = static function (): bool { throw new RuntimeException('Unexpected sender call'); };
$handle = static fn($input, $sender = null, $allow = null): array => llv_handle_enquiry('POST', 'application/json', json_encode($input), $config, $sender ?? $never, $allow);

run_test('missing secrets report unavailable without sending', static function () use ($valid, $never) {
    [$status, $body] = llv_handle_enquiry('POST', 'application/json', json_encode($valid), [], $never);
    check($status === 503 && !isset($body['ok']), 'Missing config reported success');
});
run_test('GET and preflight never send mail', static function () use ($config, $never) {
    check(llv_handle_enquiry('GET', '', '', $config, $never)[0] === 405, 'GET must fail');
    check(llv_handle_enquiry('OPTIONS', '', '', $config, $never)[0] === 204, 'Preflight must succeed');
});
run_test('malformed payloads and missing fields fail validation', static function () use ($valid, $config, $handle, $never) {
    foreach ([null, [], ['formType' => 'unknown', 'fields' => []], array_merge($valid, ['fields' => []])] as $payload) {
        check($handle($payload)[0] === 400, 'Invalid payload accepted');
    }
    check(llv_handle_enquiry('POST', 'application/json', '{', $config, $never)[0] === 400, 'Malformed JSON accepted');
    check(llv_handle_enquiry('POST', 'text/plain', '{}', $config, $never)[0] === 415, 'Unsupported content type accepted');
    check(llv_handle_enquiry('POST', 'application/json', str_repeat('x', 16001), $config, $never)[0] === 413, 'Oversized payload accepted');
});
run_test('invalid email, blank fields and impossible dates are rejected', static function () use ($valid, $handle) {
    foreach ([[1, 'invalid'], [1, "visitor@example.com\r\nBcc: attacker@example.com"], [0, '  '], [4, '2027-02-31'], [5, str_repeat('x', 2001)]] as [$index, $value]) {
        $payload = $valid;
        $payload['fields'][$index]['value'] = $value;
        check($handle($payload)[0] === 400, 'Invalid field accepted');
    }
});
run_test('recipient is fixed, reply-to is validated and email HTML is escaped', static function () use ($valid, $handle) {
    $sent = null;
    $payload = array_merge($valid, ['to' => 'attacker@example.com', 'replyTo' => 'attacker@example.com']);
    [$status, $body] = $handle($payload, static function ($mail, $mailConfig) use (&$sent): bool {
        $sent = $mail;
        check($mailConfig['smtp_username'] === 'studio@example.com', 'Wrong SMTP configuration');
        return true;
    });
    check($status === 200 && $body['ok'] === true, 'Successful acceptance not reported');
    check($sent['to'] === ['owner@example.com'], 'Client changed recipient');
    check($sent['reply_to'] === 'visitor@example.com', 'Client changed reply-to');
    check(!str_contains($sent['html'], '<script>') && str_contains($sent['html'], '&lt;script&gt;'), 'HTML not escaped');
    check(str_contains($sent['text'], '<script>'), 'Plain text message lost');
});
run_test('booking form uses the same mail delivery path', static function () use ($valid, $handle) {
    $payload = $valid;
    $payload['formType'] = 'Book Slot';
    check($handle($payload, static function ($mail): bool {
        check(str_contains($mail['subject'], 'Book Slot'), 'Incorrect booking subject');
        return true;
    })[0] === 200, 'Booking not accepted');
});
run_test('provider and network failures never report success', static function () use ($valid, $handle) {
    foreach ([static fn(): bool => false, static function (): bool { throw new RuntimeException('offline'); }] as $sender) {
        [$status, $body] = $handle($valid, $sender);
        check($status === 502 && !isset($body['ok']), 'Provider failure reported success');
    }
});
run_test('rate-limited requests never call the email provider', static function () use ($valid, $handle, $never) {
    check($handle($valid, $never, static fn(): bool => false)[0] === 429, 'Rate limit ignored');
});
run_test('file-backed rate limit resets after ten minutes', static function () {
    $directory = sys_get_temp_dir() . '/llv-enquiry-test-' . bin2hex(random_bytes(8));
    try {
        for ($i = 0; $i < 5; $i++) check(llv_allow_enquiry('127.0.0.1', $directory, 1000), 'Early request rejected');
        check(!llv_allow_enquiry('127.0.0.1', $directory, 1001), 'Sixth request accepted');
        check(llv_allow_enquiry('127.0.0.2', $directory, 1001), 'Other address blocked');
        check(llv_allow_enquiry('127.0.0.1', $directory, 1601), 'Window did not reset');
    } finally {
        foreach (glob($directory . '/*.json') as $file) unlink($file);
        rmdir($directory);
    }
});

run_test('SMTP requires credentials and secure settings while Resend requires its own key', static function () use ($config, $valid, $never) {
    foreach ([['smtp_password' => ''], ['smtp_encryption' => ''], ['smtp_port' => 25], ['from_email' => 'invalid'], ['transport' => 'unknown'], ['transport' => 'resend']] as $override) {
        $settings = array_merge($config, $override);
        check(llv_handle_enquiry('POST', 'application/json', json_encode($valid), $settings, $never)[0] === 503, 'Incomplete or insecure configuration accepted');
    }
    $settings = array_merge($config, ['transport' => 'resend', 'resend_api_key' => 'test-key']);
    check(llv_handle_enquiry('POST', 'application/json', json_encode($valid), $settings, static function ($message, $settings): bool {
        check($settings['resend_api_key'] === 'test-key', 'Missing Resend key');
        return true;
    })[0] === 200, 'Optional Resend transport rejected');
});
run_test('bundled PHPMailer builds authenticated encrypted SMTP mail with fixed recipient', static function () use ($config) {
    require_once __DIR__ . '/../public/api/smtp-transport.php';
    $message = [
        'to' => ['owner@example.com'], 'reply_to' => 'visitor@example.com',
        'subject' => 'Website enquiry', 'html' => '<p>Family shoot</p>', 'text' => 'Family shoot',
    ];
    $mail = llv_create_smtp_mailer($message, $config);
    check($mail->Mailer === 'smtp' && $mail->SMTPAuth === true, 'Authenticated SMTP not selected');
    check($mail->Host === 'smtp.hostinger.com' && $mail->Port === 465 && $mail->SMTPSecure === 'ssl', 'Incorrect SMTP endpoint or encryption');
    check($mail->SMTPOptions['ssl']['verify_peer'] && !$mail->SMTPOptions['ssl']['allow_self_signed'], 'TLS verification weakened');
    check($mail->SMTPDebug === 0, 'SMTP debugging could expose credentials');
    check($mail->From === 'studio@example.com' && $mail->Username === $mail->From, 'Wrong sender');
    check($mail->getToAddresses() === [['owner@example.com', '']], 'Wrong SMTP recipient');
    check(array_column($mail->getReplyToAddresses(), 0) === ['visitor@example.com'], 'Reply-To is missing');
    check($mail->preSend(), 'Unable to build MIME message');
    $mime = $mail->getSentMIMEMessage();
    check(str_contains($mime, 'multipart/alternative') && str_contains($mime, 'Family shoot'), 'Multipart mail missing');
    $mail = llv_create_smtp_mailer($message, array_merge($config, ['smtp_port' => 587, 'smtp_encryption' => 'tls']));
    check($mail->Port === 587 && $mail->SMTPSecure === 'tls', 'STARTTLS option not configured');
});
