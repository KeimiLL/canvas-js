<?php
// plik jsonowy nigdy nie bedzie pusty bo przy tworzeniu nowego canvasa tworzę nowe miejsce w jsonie
// pobieram dane z pliku json
$oldDataJSON = file_get_contents("json_data/data.json");
$oldData = json_decode($oldDataJSON, true);

array_push($oldData, []);
file_put_contents("json_data/data.json", json_encode($oldData));