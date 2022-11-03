<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="images/icon.png">
    <title>Edytor w canvas</title>

    <link rel="stylesheet" href="styles/styles-index.css">

</head>

<body>

    <div class="main-div">
        

        <button id="create-btn" onclick="window.location.href='drawing.php';">Stwórz nowy</button>
        
        <p>lub edytuj istniejące</p>
        
        <div class="div-drawings"></div>
    </div>


    <?php
        // $file = file_get_contents("canvas_data.json");
        // $arr = array();

        // // foreach ($arr as &$value)

        // $json_decoded = json_decode($file);
        
        // echo '<a href="#"><img style="background-color:white;" border="3px solid black" width="30%" src="'.$json_decoded->img.'"></a>';
    
    
        $jsonData = file_get_contents("canvas_data.json");
        $json_decoded = (array)json_decode($jsonData);

        foreach ($json_decoded as $obj) {
            echo '<a href="#"><img style="background-color:white;" border="3px solid black" width="40px" src="';
            echo $obj->img;
            echo '"></a><br><br>';
        }


        // $tempArray = (array)json_decode($inp);
        
        // $jsonData = json_encode($tempArray);
        // file_put_contents("canvas_data.json", $jsonData);  
    
    
    
    ?>


    <script src="scripts/script-index.js"></script>

</body>

</html>