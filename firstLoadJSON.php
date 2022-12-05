<?php
// plik zwracajacy wszystkie canvasy - potrzebne do wyswietlenia na glownej

$jsonData = file_get_contents("json_data/data.json");
$json_decoded = json_decode($jsonData, true);
var_dump($json_decoded);

echo $json_decoded;

// zwraca ilosc canvasow z pliku
// if($json_decoded == null) {
//     echo 0;
// } else {
//     echo count($json_decoded);
// }
