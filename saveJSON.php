<?php
//zabezpieczenie przed wielodostepem
$fpath = fopen("lock.txt", "r+");
flock($fpath, LOCK_EX); //to acquire an exclusive lock (writer)

// plik jsonowy nigdy nie bedzie pusty bo przy tworzeniu nowego canvasa tworzę nowe miejsce w jsonie
// pobieram dane z pliku json
$oldDataJSON = file_get_contents("json_data/data.json");

// pobranie linku - znalezione na stackoverflow, wspiera i http i https
$link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
// parse url zwraca associative array z roznymi komponentami - znalezione na geeksforgeeks
$link_components = parse_url($link);
// parsowanie stringa przekazanaego przeez link
parse_str($link_components['query'], $params);
// wydobycie id konkretnego canvasa
$canvasID = $params['id'];

$oldData = json_decode($oldDataJSON, true);
// print_r($oldData[0]);

$newData = file_get_contents("php://input");
$newData = json_decode($newData, true);
// newData == 1 to undo
// newData == 2 to clearAllBtn

if (count($oldData) <= $canvasID) {
    // czyli z takim id jeszcze nie ma wiec tworze puste miejsce
    echo "Nie ma tego id";
    array_push($oldData, []);
    if ($newData != 1 && $newData != 2) {
        array_push($oldData[$canvasID], $newData);
    }
} else {
    // czyli takie id juz jest wiec dopisuje nowe dane
    if ($newData == 1) {
        if (count($oldData[$canvasID]) <= 1) {
            $oldData[$canvasID] = [];
        } else {
            array_pop($oldData[$canvasID]);
        }
    } else if ($newData == 2) {
        $oldData[$canvasID] = [];
    } else {
        array_push($oldData[$canvasID], $newData);
    }
}


file_put_contents("json_data/data.json", json_encode($oldData));

flock($fpath, LOCK_UN); // to release a lock (shared or exclusive)
fclose($fpath);
