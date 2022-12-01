<?php
// $file = file_get_contents("canvas_data.json");
// $arr = array();

// // foreach ($arr as &$value)

// $json_decoded = json_decode($file);

// echo '<a href="#"><img style="background-color:white;" border="3px solid black" width="30%" src="'.$json_decoded->img.'"></a>';


$jsonData = file_get_contents("json_data/data.json");
$json_decoded = json_decode($jsonData);

echo $json_decoded;
