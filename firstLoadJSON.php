<?php
// plik zwracajacy wszystkie canvasy - potrzebne do wyswietlenia na glownej

$jsonData = file_get_contents("json_data/data.json");
$json_decoded = json_decode($jsonData, true);
// print_r($json_decoded);

echo count($json_decoded);

// zwraca ilosc canvasow z pliku
// if($json_decoded == null) {
//     echo 0;
// } else {
//     echo count($json_decoded);
// }
