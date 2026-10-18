<?php
// Copy beside public_html as enquiry-config.php, outside the public website folder.
// Use a real Hostinger domain mailbox. Keep its password out of GitHub and chat.
return [
    'transport' => 'smtp',
    // Confirm these settings in Hostinger > Emails > Connect Apps and Devices.
    'smtp_host' => 'smtp.hostinger.com',
    'smtp_port' => 465,
    'smtp_encryption' => 'ssl',
    'smtp_username' => 'enquiries@lovelightvision.com',
    'smtp_password' => '',
    'from_email' => 'enquiries@lovelightvision.com',
    'from_name' => 'Love Light Vision',
    'to_email' => 'ulhaslp1995@gmail.com',
];
