<?php
// $file = file_get_contents("canvas_data.json");
// $arr = array();

// // foreach ($arr as &$value)

// $json_decoded = json_decode($file);

// echo '<a href="#"><img style="background-color:white;" border="3px solid black" width="30%" src="'.$json_decoded->img.'"></a>';


$jsonData = file_get_contents("canvas_data.json");
$json_decoded = (array)json_decode($jsonData);

foreach ($json_decoded as $obj) {
    echo '<a href="#"><img style="background-color:white;" border="3px solid black" width="100px" src="';
    echo $obj;
    echo '"></a><br><br>';

    // echo '<p color="white">';
    // echo $obj;
    // echo '</p>';
}
