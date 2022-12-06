<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="images/icon.png">
    <title>Rysunek - Edytor w canvas</title>

    <link rel="stylesheet" href="styles/styles-drawing.css">
    <script src="scripts/script-drawing.js" async></script>
</head>

<body>
    <div class="main-div">
        <canvas id="canvas"></canvas>
    </div>

    <div class="properties">

        <div class="props">
            <div class="feature" id="div-slider">
                <input id="slider" type="range" name="slider" min="1" max="20" step="1" value="5" />
                <p>Grubość: <span id="slider-value">5</span></p>
            </div>

            <div class="feature" id="div-color">
                <input id="color" type="color" name="color" value="#000000" />
                <p>Kolor: <span id="color-value">#000000</span></p>
            </div>
        </div>


        <div class="feature" id="div-shapes">
            <label><input type="radio" class="shape" name="shape" value="1" checked /> &#9998</label>
            <label><input type="radio" class="shape" name="shape" value="2" /> &#9711</label>
            <label><input type="radio" class="shape" name="shape" value="3" />&ensp;&#8725</label>
        </div>

        <div class="btns">
            <button id="clear-btn">Wyczyść</button>
            <button id="undo-btn">Cofnij</button>

            <!-- <button id="save-btn">Zapisz</button> -->

            <button id="back-btn" onclick="window.location.href='index.php';">Strona główna</button>
        </div>

    </div>
    

</body>

</html>