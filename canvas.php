<?php

// file_get_contents() - czyta całośc do stringa
// daję "php://input" żeby uzyskać ciało żądania (request)
$requestPayload = file_get_contents("php://input");

// tworzymy po to żeby potem wyświetlić tego JSONa jako obiekt PHPa
// $object = json_decode($requestPayload);

// var_dump wyświetla wyświetla uporządkowane informacje 
// na temat jednego lub więcej wyrażeń, które obejmuje typ i wartość
// var_dump($object);


echo "$requestPayload";
file_put_contents("canvas_data.json", $requestPayload);

?>