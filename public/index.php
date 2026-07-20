<?php

declare(strict_types=1);

$indexPath = __DIR__ . '/index.html';

if (!is_file($indexPath)) {
    http_response_code(404);
    exit('App not found.');
}

header('Content-Type: text/html; charset=UTF-8');
readfile($indexPath);
