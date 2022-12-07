<?php
//zabezpieczenie przed wielodostepem
$fpath = fopen("lock.txt", "r+");
flock($fpath, LOCK_EX); //to acquire an exclusive lock (writer)

$jsonData = file_get_contents("json_data/data.json");
$json_decoded = json_decode($jsonData, true);

echo count($json_decoded);

flock($fpath, LOCK_UN); // to release a lock (shared or exclusive)
fclose($fpath);