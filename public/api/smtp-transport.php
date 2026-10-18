<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;

require_once __DIR__ . '/lib/phpmailer/src/Exception.php';
require_once __DIR__ . '/lib/phpmailer/src/PHPMailer.php';
require_once __DIR__ . '/lib/phpmailer/src/SMTP.php';

function llv_create_smtp_mailer(array $message, array $config): PHPMailer
{
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $config['smtp_host'];
    $mail->Port = $config['smtp_port'] ?? 465;
    $mail->SMTPAuth = true;
    $mail->Username = $config['smtp_username'];
    $mail->Password = $config['smtp_password'];
    $mail->SMTPSecure = $config['smtp_encryption'] ?? PHPMailer::ENCRYPTION_SMTPS;
    $mail->SMTPDebug = 0;
    $mail->Timeout = 10;
    $mail->getSMTPInstance()->Timelimit = 15;
    $mail->SMTPOptions = ['ssl' => [
        'verify_peer' => true,
        'verify_peer_name' => true,
        'allow_self_signed' => false,
    ]];
    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->setFrom($config['from_email'], $config['from_name'] ?? 'Love Light Vision');
    foreach ($message['to'] as $recipient) $mail->addAddress($recipient);
    $mail->addReplyTo($message['reply_to']);
    $mail->Subject = $message['subject'];
    $mail->isHTML(true);
    $mail->Body = $message['html'];
    $mail->AltBody = $message['text'];
    return $mail;
}
