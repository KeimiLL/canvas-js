<?php
    // najnowsza wersja
        
        if (!isset($_POST['submit']))

        if(file_exists('canvas_data.json'))
        {
            $final_data=fileWriteAppend();
            if(file_put_contents('canvas_data.json', $final_data, FILE_APPEND))
            {
                echo "<p>Dane zostały dodane</p>";
            }
        }
        else
        {
            // $final_data=fileCreateWrite();
            // if(file_put_contents('canvas_data.json', ""))
            // {
            //     echo "<p>Plik stworzony i dane dodane</p>";
            // }
        
        }
        function fileWriteAppend(){
            $current_data = file_get_contents("php://input");
            echo $current_data;
            $array_data = json_decode($current_data, true);

            $extra = array($_POST['img']
                // 'id' => $_POST['id'],
                // 'img' => $_POST['img']
            );
            $array_data[] = $extra;
            $final_data = json_encode($array_data);
            return $final_data;
        }
        function fileCreateWrite(){
            // $file=fopen("canvas_data.json","w");
            // $array_data=array();
            // $extra = array(
            //     'date' => $_POST['date'],
            //     'img' => $_POST['img']
            // );
            // $array_data[] = $extra;
            // $final_data = json_encode($array_data);
            // fclose($file);
            // return $final_data;
        }





        // $file = "";

        // if (file_exists("canvas_data.json")) {
        //     $file = file_get_contents("canvas_data.json");
        // } else {
        //     file_put_contents("canvas_data.json", "");
        // }

        // console.log($file);




        // file_get_contents() - czyta całośc do stringa
        // daję "php://input" żeby uzyskać ciało żądania (request)
        // $requestPayload = file_get_contents("php://input");

        // tworzymy po to żeby potem wyświetlić tego JSONa jako obiekt PHPa
        // $object = json_decode($requestPayload);

        // var_dump wyświetla wyświetla uporządkowane informacje 
        // na temat jednego lub więcej wyrażeń, które obejmuje typ i wartość
        // var_dump($object);


        // file_put_contents("canvas_data.json", $requestPayload, FILE_APPEND);

    ?>