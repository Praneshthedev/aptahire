<?php

declare(strict_types=1);

$allowedOrigins = [
    "http://localhost:5173",
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

$redirectUrl = getenv("APTAHIRE_BOOKING_REDIRECT_URL") ?: "https://cal.com/rakeshr7/strategy-call";
$leadEmail = getenv("APTAHIRE_LEAD_EMAIL") ?: "sriethiraj@getnos.io";

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
    echo json_encode([
        "success" => false,
        "message" => "Name is required",
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode([
        "success" => false,
        "message" => "Invalid email address",
    ]);
    exit;
}

if (!preg_match("/^[6-9]\d{9}$/", $phone)) {
    http_response_code(422);
    echo json_encode([
        "success" => false,
        "message" => "Enter a valid 10-digit phone number",
    ]);
    exit;
}

if ($company === "") {
    http_response_code(422);
    echo json_encode([
        "success" => false,
        "message" => "Company / role is required",
    ]);
    exit;
}

if ($bottleneck === "") {
    http_response_code(422);
    echo json_encode([
        "success" => false,
        "message" => "Please select your biggest hiring bottleneck",
    ]);
    exit;
}

date_default_timezone_set("Asia/Kolkata");
$submittedTime = date("d-m-Y h:i A");

$file = __DIR__ . "/aptahire_leads.csv";
$fp = fopen($file, "a");

if ($fp) {
    if (filesize($file) === 0) {
        fputcsv($fp, [
            "Submitted Time",
            "Name",
            "Email",
            "Phone",
            "Company",
            "Bottleneck",
        ]);
    }

    fputcsv($fp, [
        $submittedTime,
        $name,
        $email,
        $phone,
        $company,
        $bottleneck,
    ]);

    fclose($fp);
}

$subject = "New Strategy Call Lead - Aptahire";
$message = "New Aptahire Strategy Call Lead\n\n";
$message .= "Name: " . $name . "\n";
$message .= "Email: " . $email . "\n";
$message .= "Phone: " . $phone . "\n";
$message .= "Company / Role: " . $company . "\n";
$message .= "Biggest Bottleneck: " . $bottleneck . "\n";
$message .= "Submitted Time: " . $submittedTime . "\n";

$headers  = "From: Aptahire <hello@getnos.io>\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$mailStatus = mail($leadEmail, $subject, $message, $headers);

if ($mailStatus) {
    echo json_encode([
        "success" => true,
        "message" => "Lead submitted successfully",
        "redirect" => $redirectUrl,
    ]);
    exit;
}

http_response_code(500);
echo json_encode([
    "success" => false,
    "message" => "Unable to submit right now. Please try again.",
]);
