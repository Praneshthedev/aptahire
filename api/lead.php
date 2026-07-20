<?php

declare(strict_types=1);

require_once __DIR__ . "/send-lead-mail.php";

$allowedOrigins = [
    "http://localhost:5173",
    "https://connect.aptahire.ai",
    "https://aptahire-one.vercel.app",
];

$origin = $_SERVER["HTTP_ORIGIN"] ?? "";

if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: " . $origin);
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Accept");
    header("Vary: Origin");
}

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

header("Content-Type: application/json; charset=UTF-8");

$config = loadMailConfig();

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Invalid request method",
    ]);
    exit;
}

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$phone = preg_replace("/\D/", "", trim($_POST["phone"] ?? ""));
$company = trim($_POST["company"] ?? "");
$bottleneck = trim($_POST["bottleneck"] ?? "");

if ($name === "") {
    http_response_code(422);
    echo json_encode(["success" => false, "message" => "Name is required"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(["success" => false, "message" => "Invalid email address"]);
    exit;
}

if (!preg_match("/^[6-9]\d{9}$/", $phone)) {
    http_response_code(422);
    echo json_encode(["success" => false, "message" => "Enter a valid 10-digit phone number"]);
    exit;
}

if ($company === "") {
    http_response_code(422);
    echo json_encode(["success" => false, "message" => "Company / role is required"]);
    exit;
}

if ($bottleneck === "") {
    http_response_code(422);
    echo json_encode(["success" => false, "message" => "Please select your biggest hiring bottleneck"]);
    exit;
}

date_default_timezone_set("Asia/Kolkata");
$submittedTime = date("d-m-Y h:i A");

function saveLeadCsv(
    string $file,
    string $submittedTime,
    string $name,
    string $email,
    string $phone,
    string $company,
    string $bottleneck
): bool {
    $fp = @fopen($file, "a");

    if ($fp === false) {
        return false;
    }

    if (@filesize($file) === 0) {
        fputcsv($fp, [
            "Submitted Time",
            "Name",
            "Email",
            "Phone",
            "Company",
            "Bottleneck",
        ]);
    }

    $saved = fputcsv($fp, [
        $submittedTime,
        $name,
        $email,
        $phone,
        $company,
        $bottleneck,
    ]) !== false;

    fclose($fp);

    return $saved;
}

$file = __DIR__ . "/aptahire_leads.csv";
$csvSaved = saveLeadCsv($file, $submittedTime, $name, $email, $phone, $company, $bottleneck);

$subject = "New Strategy Call Lead - Aptahire";
$message = "New Aptahire Strategy Call Lead\n\n";
$message .= "Name: " . $name . "\n";
$message .= "Email: " . $email . "\n";
$message .= "Phone: " . $phone . "\n";
$message .= "Company / Role: " . $company . "\n";
$message .= "Biggest Bottleneck: " . $bottleneck . "\n";
$message .= "Submitted Time: " . $submittedTime . "\n";

$mailResult = sendLeadMailMessage($config, $email, $subject, $message);
$mailSent = $mailResult["sent"];

if ($csvSaved || $mailSent) {
    echo json_encode([
        "success" => true,
        "message" => "Lead submitted successfully",
        "redirect" => $config["booking_redirect_url"],
        "saved" => $csvSaved,
        "mail" => $mailSent ? "sent" : "failed",
        "mail_method" => $mailResult["method"],
    ]);
    exit;
}

http_response_code(500);
echo json_encode([
    "success" => false,
    "message" => "Unable to save your details right now. Please try again.",
    "mail_error" => $mailResult["error"],
]);
