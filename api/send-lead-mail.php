<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception as MailException;
use PHPMailer\PHPMailer\PHPMailer;

require_once __DIR__ . "/lib/PHPMailer/Exception.php";
require_once __DIR__ . "/lib/PHPMailer/PHPMailer.php";
require_once __DIR__ . "/lib/PHPMailer/SMTP.php";

/**
 * Load MAIL_PASS from process env, api/.env, project .env, or config.php.
 */
function loadMailPass(): string
{
    $candidates = [
        getenv("MAIL_PASS") ?: "",
        $_ENV["MAIL_PASS"] ?? "",
        $_SERVER["MAIL_PASS"] ?? "",
    ];

    foreach ($candidates as $value) {
        $value = trim((string) $value);
        if ($value !== "") {
            return $value;
        }
    }

    $envFiles = [
        __DIR__ . "/.env",
        dirname(__DIR__) . "/.env",
    ];

    foreach ($envFiles as $envFile) {
        if (!is_file($envFile)) {
            continue;
        }

        $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if ($lines === false) {
            continue;
        }

        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === "" || str_starts_with($line, "#") || !str_contains($line, "=")) {
                continue;
            }

            [$key, $value] = explode("=", $line, 2);
            if (trim($key) !== "MAIL_PASS") {
                continue;
            }

            $value = trim($value);
            if (
                (str_starts_with($value, '"') && str_ends_with($value, '"')) ||
                (str_starts_with($value, "'") && str_ends_with($value, "'"))
            ) {
                $value = substr($value, 1, -1);
            }

            if ($value !== "") {
                return $value;
            }
        }
    }

    $configFile = __DIR__ . "/config.php";
    if (is_file($configFile)) {
        $config = require $configFile;
        if (is_array($config)) {
            $value = trim((string) ($config["MAIL_PASS"] ?? $config["mail_pass"] ?? ""));
            if ($value !== "") {
                return $value;
            }
        }
    }

    return "";
}

function loadMailConfig(): array
{
    $config = [
        "lead_email" => "sriethiraj@getnos.io",
        "mail_from" => "info@aptahire.io",
        "mail_from_name" => "Aptahire",
        "booking_redirect_url" => "https://cal.com/rakeshr7/strategy-call",
        "smtp_host" => "mail.deepsense.co.in",
        "smtp_port" => 587,
        "smtp_user" => "info@aptahire.io",
        "smtp_secure" => "tls",
        "MAIL_PASS" => loadMailPass(),
    ];

    $configFile = __DIR__ . "/config.php";

    if (is_file($configFile)) {
        $local = require $configFile;

        if (is_array($local)) {
            $config = array_merge($config, $local);

            if (empty($config["MAIL_PASS"])) {
                $config["MAIL_PASS"] = loadMailPass();
            }
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

/**
 * Send via authenticated SMTP (same as working swaks / test-mail setup).
 * Only one send attempt — no duplicate fallbacks.
 */
function sendLeadMailMessage(
    array $config,
    string $replyTo,
    string $subject,
    string $body
): array {
    $password = trim((string) ($config["MAIL_PASS"] ?? ""));

    if ($password === "") {
        $error = "MAIL_PASS is missing";
        logMailEvent($error);
        return ["sent" => false, "method" => null, "error" => $error];
    }

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = (string) $config["smtp_host"];
        $mail->Port = (int) $config["smtp_port"];
        $mail->SMTPAuth = true;
        $mail->AuthType = "LOGIN";
        $mail->Username = (string) $config["smtp_user"];
        $mail->Password = $password;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->CharSet = PHPMailer::CHARSET_UTF8;

        $mail->setFrom((string) $config["mail_from"], (string) $config["mail_from_name"]);
        $mail->addAddress((string) $config["lead_email"]);

        if ($replyTo !== "" && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
            $mail->addReplyTo($replyTo);
        }

        $mail->Subject = $subject;
        $mail->Body = $body;
        $mail->isHTML(false);

        $mail->send();

        $method = "smtp:" . $config["smtp_host"] . ":" . $config["smtp_port"];
        logMailEvent("sent via " . $method);
        return ["sent" => true, "method" => $method, "error" => null];
    } catch (MailException $exception) {
        $error = "smtp: " . $exception->getMessage();
        logMailEvent($error);
        return ["sent" => false, "method" => null, "error" => $error];
    }
}
