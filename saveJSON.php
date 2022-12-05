<?php
// plik jsonowy nigdy nie bedzie pusty bo przy tworzeniu nowego canvasa tworzę nowe miejsce w jsonie
// pobieram dane z pliku json
$oldDataJSON = file_get_contents("json_data/data.json");
var_dump($oldDataJSON);
// pobranie linku - znalezione na stackoverflow, wspiera i http i https
$link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
// parse url zwraca associative array z roznymi komponentami - znalezione na geeksforgeeks
$link_components = parse_url($link);
// parsowanie stringa przekazanaego przeez link
parse_str($link_components['query'], $params);
// wydobycie id konkretnego canvasa
$canvasID = $params['id'];
// var_dump($canvasID);
////////////////////////////////////////////////////////////////////////DOKONCZYC ODTAD ZAPIS WYZEJ POWINNO BYC OK
// zwroci mi array("0" => [....], "1" => [....])
$oldData = json_decode($oldDataJSON, true);

$newData = file_get_contents("php://input");
echo "Old data: " . $oldData;
echo "New data: " . $newData;

if ($oldData == null) {
    echo "Pusty plik";
} else {
    foreach($oldData as $key => $value) {
        echo $key . " => " . $value . "<br>";
      }
}

// array_push($oldData, $newData);

// $jsonMergedData = json_encode($oldData);
// file_put_contents("json_data/data.json", $jsonMergedData);
