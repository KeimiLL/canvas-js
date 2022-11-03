class Canvas {
    constructor(canvas, context, color, thickness, radioBtns) {

        // DODAĆ ID !!!!

        this.canvas = canvas;
        this.context = context;
        this.position = null;

        this.color = color;
        this.thickness = thickness;

        this.radioBtns = radioBtns;
        this.radioValue = "1";

        this.offs = null;
        
        this.changeCap();
        this.startX = null;
        this.startY = null;

        // potrzebne do undo()
        this.curvesArray = [];
        this.idxCurvesArray = -1;
    }

    // sprawdzenie i ustawienie rysowania konkretnego kształtu
    checkRadioShape() {
        for (const radioBtn of this.radioBtns) {
            if (radioBtn.checked) {
                this.radioValue = radioBtn.value;
                break;
            }
        }

        console.log("Wybrana opcja: " + this.radioValue);
    }


    // czyści całą ramkę
    clearAll() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // console.log("Zawartość wyczyszczona");

        this.curvesArray = [];
        this.idxCurvesArray = -1;
    }

    // żeby element nie musiał być w lewym górnym rogu, to licze offsety
    // zaczynam od danego elementu i przechodzę przez DOM wliczając 
    // offset każdego elementu aż do osiągnięcia końca
    // uruchamiana przy rozpoczęciu rysowania
    start(e) {
        // console.log("Zaczynamy rysowanie");

        this.changeColor();
        this.changeThickness();
        this.checkRadioShape();

        this.position = { x: e.touches[0].pageX - this.canvas.offsetLeft, y: e.touches[0].pageY - this.canvas.offsetTop };

        // dodane offsety żeby pole do rysowania mogło nie być tylko w lewym górnym rogu

        switch (this.radioValue.toString()) {
            case '2': // rysowanie okręgów
                this.startX = this.position.x;
                this.startY = this.position.y;
                break;
            case '3': // rysowanie linii
                this.context.beginPath();
                this.context.arc(this.position.x, this.position.y, this.thickness.value / 2, 0, 2 * Math.PI);
                this.context.fill();
                this.startX = this.position.x;
                this.startY = this.position.y;
                break;
            default: // rysowanie linii i swobodne
                this.context.beginPath();
                this.context.arc(this.position.x, this.position.y, this.thickness.value / 2, 0, 2 * Math.PI);
                this.context.fill();
                break;
        }
    }

    // uruchamiana podczas rysowania
    move(e) {
        // console.log("Jesteśmy w trakcie rysoania");

        e.preventDefault();
        this.context.beginPath();

        switch (this.radioValue.toString()) {
            case '1': // rysowanie swobodne

                this.context.moveTo(this.position.x, this.position.y);
                this.context.lineTo(e.touches[0].pageX - this.canvas.offsetLeft, e.touches[0].pageY - this.canvas.offsetTop);
                this.context.stroke();
                break;
            case '2': // rysowanie okręgów
                this.context.moveTo(this.startX, this.startY + (this.position.y - this.startY) / 2);
                this.context.bezierCurveTo(this.startX, this.startY, this.position.x, this.startY, this.position.x, this.startY + (this.position.y - this.startY) / 2);
                this.context.bezierCurveTo(this.position.x, this.position.y, this.startX, this.position.y, this.startX, this.startY + (this.position.y - this.startY) / 2);
                this.context.closePath();
                break;
            case '3': // rysowanie linii
                this.context.moveTo(this.startX, this.startY);
                this.context.lineTo(e.touches[0].pageX - this.canvas.offsetLeft, e.touches[0].pageY - this.canvas.offsetTop);
                break;
        }
        this.position = { x: e.touches[0].pageX - this.canvas.offsetLeft, y: e.touches[0].pageY - this.canvas.offsetTop };
    }

    // uruchamiana przy zakończeniu rysowania
    stop(e) {
        e.preventDefault();
        // Zakonczenie rysowania
        // dla linii i okręgów
        if (this.radioValue.toString() === '2' || this.radioValue.toString() === '3')
            this.context.stroke();

        this.position = null;
        this.curvesArray.push(this.context.getImageData(0, 0, this.canvas.width, this.canvas.height));
        this.idxCurvesArray += 1;
    }

    // zmiana koloru
    changeColor() {
        // console.log("Zmieniony kolor");
        this.context.strokeStyle = this.color.value;
        this.context.fillStyle = this.color.value;
    }

    // zmiana grubości linii
    changeThickness() {
        // console.log("Zmieniona grubość linii");
        this.context.lineWidth = this.thickness.value;

    }

    // zmiana końcówki do rysowania
    changeCap() {
        // console.log("Zmiana koncowki");
        this.context.lineCap = "round";
    }

    // próba zapisu do JSON
    saveToJSON() {
        const jsonStr = JSON.stringify({img: this.canvas.toDataURL() });
        console.log(jsonStr);
        this.sendJSON(jsonStr);
        return jsonStr;
    }

    // próba wysłania JSONa do PHPa
    sendJSON(jsonStr) {
        // obiekty xhr są używane do pracy z serwerem
        // można pozyskać dane z URL bez potrzeby odświeżania strony
        // to daje możliwość aktualizacji części strony bez potrzeby
        // przerywania tego co robi aktualnie uzytkownik
        const xhr = new XMLHttpRequest();

        // open() inicjuje żądanie
        // najpierw metoda, czyli POST 
        // potem URL do którego ma zostać wysłane żądanie (request)
        xhr.open("POST", "drawing.php");

        // ustawia wartość nagłówka żądania HTTP
        // podaję nazwę nagłówka i wartość do ustawienia jako treść tego nagłówka
        xhr.setRequestHeader("Content-Type", "application/json");

        // wysyła żądanie na serwer
        xhr.send(jsonStr);
    }

    // usuwa ostatnią narysowaną rzecz
    undo() {
        if(this.idxCurvesArray <= 0) {
            this.clearAll();
            return;
        }

        this.idxCurvesArray -= 1;
        this.curvesArray.pop();
        this.context.putImageData(this.curvesArray[this.idxCurvesArray], 0, 0);
    }

}


const canvas = document.querySelector('#canvas');

// dodałem drugi argument {willReadFrequently: true} 
// bo był warning przy samym '2d'
const context = canvas.getContext('2d', {willReadFrequently: true});

const clearBtn = document.querySelector('#clear-btn');
const undoBtn = document.querySelector('#undo-btn');
const thickness = document.querySelector('#slider');
const thicknessText = document.querySelector('#slider-value');

const color = document.querySelector('#color');
const colorText = document.querySelector('#color-value');

const radioBtnsShape = document.querySelectorAll('input[name="shape"]');

const myCanvas = new Canvas(canvas, context, color, thickness, radioBtnsShape);

clearBtn.addEventListener('click', () => {
    myCanvas.clearAll();
})

undoBtn.addEventListener('click', () => {
    myCanvas.undo();
})

color.addEventListener('input', () => {
    myCanvas.changeColor();
    colorText.innerHTML = color.value;
})

thickness.addEventListener('input', () => {
    myCanvas.changeThickness();
    thicknessText.innerHTML = thickness.value;
})

// włączenie trybu rysowania
canvas.addEventListener('touchstart', (e) => {
    myCanvas.start(e)
});

// wyłączenie trybu rysowania
canvas.addEventListener('touchend', (e) => {
    myCanvas.stop(e)
})

// do śledzenia pozycji dotyku
canvas.addEventListener('touchmove', (e) => {
    myCanvas.move(e)
})


// przycisk do testowania zapisu do JSON
const saveBtn = document.querySelector('#save-btn');
saveBtn.addEventListener('click', () => {
    myCanvas.saveToJSON();
})