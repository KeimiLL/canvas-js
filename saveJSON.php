<?php

// $data[] = $_POST[];

// $inp = file_get_contents('results.json');
// $tempArray = json_decode($inp);
// array_push($tempArray, $data);
// $jsonData = json_encode($tempArray);
// file_put_contents('results.json', $jsonData);

// append json data


// najpierw zrobie tylko zapis dla jednego ale musze dodac zapis ale i dopisywanie (write i append)
// write json data




// plik jsonowy nigdy nie bedzie pusty bo przy tworzeniu nowego canvasa tworzę nowe miejsce w jsonie

$oldData = file_get_contents("json_data/data.json");
var_dump($oldData);
// pobranie linku - znalezione na stackoverflow, wspiera i http i https
$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

$newData = file_get_contents("php://input");
if ($oldData == null) {
    $jsonNewData = json_encode($newData);
    file_put_contents("json_data/data.json", $jsonNewData);
} else {
    // $tempOldData = json_decode($oldData);
    // array_push($tempOldData, $newData);
    // $jsonUpdatedData = json_encode($tempOldData);
    // file_put_contents("json_data/data.json", $jsonUpdatedData);
}


$newData = file_get_contents("php://input");

var_dump($newData);
