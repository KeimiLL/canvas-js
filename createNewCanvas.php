<?php
//zabezpieczenie przed wielodostepem
$fpath = fopen("lock.txt", "r+");
flock($fpath, LOCK_EX); //to acquire an exclusive lock (writer)

// pobieram dane z pliku json
$oldDataJSON = file_get_contents("json_data/data.json");
$oldData = json_decode($oldDataJSON, true);
$newData = [];

array_push($oldData, []);
file_put_contents("json_data/data.json", json_encode($oldData));

flock($fpath, LOCK_UN); // to release a lock (shared or exclusive)
fclose($fpath);