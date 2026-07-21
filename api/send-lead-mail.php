<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception as MailException;
use PHPMailer\PHPMailer\PHPMailer;

require_once __DIR__ . "/lib/PHPMailer/Exception.php";
require_once __DIR__ . "/lib/PHPMailer/PHPMailer.php";
require_once __DIR__ . "/lib/PHPMailer/SMTP.php";

function loadMailConfig(): array
{
    $config = [
        "lead_email" => "sriethiraj@getnos.io",
        "mail_from" => "hello@getnos.io",
        "mail_from_name" => "GetNos",
        "booking_redirect_url" => "https://cal.com/rakeshr7/strategy-call",
    ];

    $configFile = __DIR__ . "/config.php";

    if (is_file($configFile)) {
        $local = require $configFile;

        if (is_array($local)) {
            $config = array_merge($config, $local);
        }
    }

    return $config;
}

function logMailEvent(string $message): void
{
    @file_put_contents(
        __DIR__ . "/mail.log",
        date("c") . " " . $message . PHP_EOL,
        FILE_APPEND
    );
}

function sendViaLocalhostRelay(
    array $config,
    string $replyTo,
    string $subject,
    string $body
): array {
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = "localhost";
        $mail->Port = 25;
        $mail->SMTPAuth = false;
        $mail->CharSet = PHPMailer::CHARSET_UTF8;

        $mail->setFrom((string) $config["mail_from"], (string) $config["mail_from_name"]);
        $mail->Sender = (string) $config["mail_from"];
        $mail->addAddress((string) $config["lead_email"]);
        $mail->addReplyTo($replyTo);
        $mail->Subject = $subject;
        $mail->Body = $body;
        $mail->isHTML(false);

        if ($mail->send()) {
            return ["sent" => true, "method" => "localhost-relay", "error" => null];
        }
    } catch (MailException $exception) {
        return [
            "sent" => false,
            "method" => null,
            "error" => "localhost-relay: " . $exception->getMessage(),
        ];
    }

    return ["sent" => false, "method" => null, "error" => "localhost-relay failed"];
}

function sendViaPhpMail(
    array $config,
    string $replyTo,
    string $subject,
    string $body
): array {
    $from = (string) $config["mail_from"];
    $to = (string) $config["lead_email"];

    $headers  = "From: " . $config["mail_from_name"] . " <" . $from . ">\r\n";
    $headers .= "Reply-To: " . $replyTo . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $sent = @mail($to, $subject, $body, $headers, "-f" . $from);

    if ($sent) {
        return ["sent" => true, "method" => "php-mail", "error" => null];
    }

    return ["sent" => false, "method" => null, "error" => "php-mail failed"];
}

function sendLeadMailMessage(
    array $config,
    string $replyTo,
    string $subject,
    string $body
): array {
    $senders = [
        "sendViaLocalhostRelay",
        "sendViaPhpMail",
    ];

    $errors = [];

    foreach ($senders as $sender) {
        $result = $sender($config, $replyTo, $subject, $body);

        if ($result["sent"]) {
            logMailEvent("sent via " . $result["method"]);
            return $result;
        }

        if (!empty($result["error"])) {
            $errors[] = $result["error"];
            logMailEvent($result["error"]);
        }
    }

    return [
        "sent" => false,
        "method" => null,
        "error" => implode(" | ", $errors) ?: "Mail failed",
    ];
}
