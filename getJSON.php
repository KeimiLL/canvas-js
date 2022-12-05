<?php
$jsonData = file_get_contents("json_data/data.json");
$json_decoded = json_decode($jsonData, true);

// pobranie linku - znalezione na stackoverflow, wspiera i http i https
$link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
// parse url zwraca associative array z roznymi komponentami - znalezione na geeksforgeeks
$link_components = parse_url($link);

// parsowanie stringa przekazanaego przeez link
parse_str($link_components['query'], $params);
// wydobycie id konkretnego canvasa
$canvasID = $params['id'];

echo $json_decoded[$canvasID];
