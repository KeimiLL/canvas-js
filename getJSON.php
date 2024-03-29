<?php
//zabezpieczenie przed wielodostepem
$fpath = fopen("lock.txt", "r+");
flock($fpath, LOCK_EX); //to acquire an exclusive lock (writer)

$jsonData = file_get_contents("json_data/data.json");
$json_decoded = json_decode($jsonData, true);

// pobranie linku - znalezione na stackoverflow, wspiera i http i https
$link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
// parse url zwraca associative array z roznymi komponentami - znalezione na geeksforgeeks
$link_components = parse_url($link);

// parsowanie stringa przekazanaego przeez link
parse_str($link_components['query'], $params);
// wydobycie id o jakiego canvasa chodzi
$canvasID = $params['id'];

// teraz wydobycie tablicy krzywych spod konkretnego ID
echo json_encode($json_decoded[$canvasID]);

flock($fpath, LOCK_UN); // to release a lock (shared or exclusive)
fclose($fpath);