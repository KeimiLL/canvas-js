<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="images/icon.png">
    <title>Rysunek - Edytor w canvas</title>

    <link rel="stylesheet" href="styles/styles-drawing.css">

</head>

<body>
    <div class="main-div">
        <canvas id="canvas" width="280" height="280"></canvas>
    </div>

    <div class="properties">
        <div class="feature" id="div-slider">
            <label for="slider">Grubość linii</label>
            <input id="slider" type="range" name="slider" min="1" max="20" step="1" value="5"/>
            <p>Wybrana: <span id="slider-value" style="color:rgb(15, 48, 9); font-weight: bold;">5</span></p>
        </div>

        <div class="feature" id="div-color">
            <label for="color">Kolor</label>
            <input id="color" type="color" name="color" value="#000000"/>
            <p>Wybrany: <span id="color-value" style="color:rgb(15, 48, 9); font-weight: bold;">#000000</span></p>
        </div>

        <div class="feature" id="div-shapes">
            <label><input type="radio" class="shape" name="shape" value="1" checked/>&#9998</label>
            <label><input type="radio" class="shape" name="shape" value="2" />&#9711</label>
            <label><input type="radio" class="shape" name="shape" value="3" />&#9472</label>
        </div>

        <button id="clear-btn">Wyczyść</button>
        <button id="undo-btn">Cofnij</button>

        <button id="save-btn">Zapisz</button>

        <button id="back-btn" onclick="window.location.href='index.php';">Powrót do strony głównej</button>  
    </div>


    <?php
    //najpierw wczytam to co już mam do tablicy i na koniec tablicy dodam następny element
        
        $file = "";

        if (file_exists("canvas_data.json")) {
            $file = file_get_contents("canvas_data.json");
        } else {
            file_put_contents("canvas_data.json", "");
        }

        $arr = array();




        // file_get_contents() - czyta całośc do stringa
        // daję "php://input" żeby uzyskać ciało żądania (request)
        $requestPayload = file_get_contents("php://input");

        // tworzymy po to żeby potem wyświetlić tego JSONa jako obiekt PHPa
        // $object = json_decode($requestPayload);

        // var_dump wyświetla wyświetla uporządkowane informacje 
        // na temat jednego lub więcej wyrażeń, które obejmuje typ i wartość
        // var_dump($object);


        file_put_contents("canvas_data.json", $requestPayload, FILE_APPEND);

    ?>

    <script src="scripts/script-drawing.js"></script>

</body>

</html>