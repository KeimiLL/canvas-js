const drawings = [];

class Canvas {
    constructor(canvas, context, color, thickness, radioBtns) {
        this.canvas = canvas;
        // this.canvas.width = window.innerWidth;
        // this.canvas.height = window.innerHeight;
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.context = context;
        this.color = color;
        this.thickness = thickness;

        this.radioBtns = radioBtns;
        this.radioValue = "1";

        this.changeCap();
        this.startX = null;
        this.startY = null;

        // potrzebne do undo()
        this.curvesArray = [];
        this.idxCurvesArray = -1;

        // pojedynczy punkt
        this.currPoint = { x: 0, y: 0 };

        // obiekty na odpowiednie krzywe potrzebne do zapisu i odczytu z pliku
        this.currCurve = {};

        this.currLine = {};

        this.currCircle = {};
        this.setDefaultObjects();


        this.canvasID = 0;
        this.currCurvesArray = [];
    }

    // załadowanie krzywej o odp indeksie z php
    loadCurves() {
        // w jsonie mam cos takiego:
        // {"id":"0"}
        this.currCurvesArray = [];
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "getJSON.php?id=" + this.canvasID.toString(), true);

        // ustawia wartość nagłówka żądania HTTP
        // podaję nazwę nagłówka i wartość do ustawienia jako treść tego nagłówka
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    if (this.responseText != null) {
                        console.log(this.responseText);
                        const data = JSON.parse(this.responseText);
                        console.log(data);
                        // tutaj to jeszcze rozdzielac wg indexu!!!!!
                        this.currCurvesArray.push(data);
                        
                        showDrawings(drawings);
                    }
                    else console.log("Błąd Ajax: nie otrzymano danych")
                }
                else console.log("Błąd Ajax: " + this.statusText)
            }

        }
        // wysyła żądanie na serwer
        xhr.send();
    }

    // odwzorowanie całego zbioru krzywych spod konkretnego indexu
    mapCanvas(currCurvesArray) {
        /*
        currCurvesArray to taka tablica krzywych cos takiego:
            currCurvesArray = [{"type":"curve","color":"#000000","thickness":"5","points":[{"x":284,"y":298},{"x":282,"y":296}]},
                      {"type":"curve","color":"#000000","thickness":"5","points":[{"x":284,"y":298},{"x":282,"y":296}]} ];
            }
            
        */

    }

    //odwzorowanie krzywej/linii/okręgu z PHP
    mapElement(element) {
        /*
        element to jedna krzywa cos takiego:
            {"type":"curve",
            "color":"#000000",
            "thickness":"5",
            "points":[
                {"x":284,"y":298},
                {"x":282,"y":296}]
            }
        */

        // chyba trzeba bedzie to jakos jeszcze przeskalowac przy mapowaniu
        this.context.beginPath();

        switch (element.type.toString()) {
            case 'curve':
                this.currCurve = element;
                this.context.strokeStyle = this.currCurve.color;
                this.context.fillStyle = this.currCurve.color;
                this.context.lineWidth - this.currCurve.thickness;

                this.currCurve.points.forEach(point => {
                    this.canvas.moveTo(this.currCurve.startPoint.x, this.currCurve.startPoint.y);
                    this.context.lineTo(point.x * this.canvas.width, point.y * this.canvas.height); // chyba do poprawy
                    this.context.stroke();
                });
                this.context.closePath();
                this.context.fill();
                break;
            case 'circle':
                this.currCircle = element;
                this.context.strokeStyle = this.currCircle.color;
                this.context.fillStyle = this.currCircle.color;
                this.context.lineWidth - this.currCircle.thickness;

                const radius = Math.sqrt((this.currCircle.startPoint.x - this.currCircle.stopPoint.x) * (this.currCircle.startPoint.x - this.currCircle.stopPoint.x) + (this.currCircle.startPoint.y - this.currCircle.stopPoint.y) * (this.currCircle.startPoint.y - this.currCircle.stopPoint.y));
                this.context.arc(this.currCircle.startPoint.x, this.currCircle.startPoint.y, radius, 0, Math.PI * 2);
                context.stroke();
                break;
            case 'line':
                this.currLine = element;
                this.context.strokeStyle = this.currLine.color;
                this.context.fillStyle = this.currLine.color;
                this.context.lineWidth - this.currLine.thickness;

                this.canvas.moveTo(this.currLine.startPoint.x, this.currLine.startPoint.y);
                this.context.lineTo(this.currLine.stopPoint.x, this.currLine.stopPoint.y);
                context.stroke();
                break;
        }
        // wyczyszczenie krzywych
        this.setDefaultObjects();
    }

    //wyczyszczenie obiektow i domyslne ustawienie własności
    setDefaultObjects() {
        // pojedynczy punkt
        this.currPoint = { x: 0, y: 0 };

        // Krzywa
        this.currCurve = {
            type: "curve",
            color: "#fff",
            thickness: 1,
            points: [] // tablica obiektów currPoint
        };

        // Okrąg
        this.currCircle = {
            type: "circle",
            color: "#fff",
            thickness: 1,
            startPoint: {},// obiekty currPoint
            stopPoint: {},// obiekty currPoint
        };

        // Linia prosta
        this.currLine = {
            type: "line",
            color: "#fff",
            thickness: 1,
            startPoint: {}, // obiekty currPoint
            stopPoint: {}// obiekty currPoint
        };


    }

    // sprawdzenie i ustawienie rysowania konkretnego kształtu
    checkRadioShape() {
        for (const radioBtn of this.radioBtns) {
            if (radioBtn.checked) {
                this.radioValue = radioBtn.value;
                break;
            }
        }
        // 1 - rysowanie swobodne
        // 2 - rysowanie okregow
        // 3 - rysowanie linii
        console.log("Wybrana opcja: " + this.radioValue);
    }

    // czyści całą ramkę
    clearAll() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.setDefaultObjects();

        this.curvesArray = [];
        this.idxCurvesArray = -1;
    }

    // zaczynamy rysowanie
    start(e) {
        e.preventDefault();
        this.setDefaultObjects();

        this.changeColor();
        this.changeThickness();
        this.checkRadioShape();


        // dodane offsety żeby pole do rysowania mogło nie być tylko w lewym górnym rogu
        switch (this.radioValue.toString()) {
            case '1': // rysowanie swobodne
                this.context.beginPath();
                this.getOffset(e.touches[0]);
                // this.context.arc(this.position.x, this.position.y, this.thickness.value / 2, 0, 2 * Math.PI);
                this.currCurve.color = this.color.value;
                this.currCurve.thickness = this.thickness.value;
                const currPoint1Copy = { ...this.currPoint };
                this.currCurve.points.push(currPoint1Copy);
                console.log(this.currCurve);
                break;
            case '2': // rysowanie okręgów
                this.getOffset(e.touches[0]);
                this.currCircle.color = this.color.value;
                this.currCircle.thickness = this.thickness.value;
                this.startX = this.currPoint.x;
                this.startY = this.currPoint.y;
                this.currCircle.startPoint = { ...this.currPoint };
                break;
            case '3': // rysowanie linii
                this.context.beginPath();
                // this.context.arc(this.position.x, this.position.y, this.thickness.value / 2, 0, 2 * Math.PI);
                this.getOffset(e.touches[0]);
                this.currLine.color = this.color.value;
                this.currLine.thickness = this.thickness.value;
                this.startX = this.currPoint.x;
                this.startY = this.currPoint.y;
                this.currLine.startPoint = { ...this.currPoint };
                break;
        }
    }

    // uruchamiana podczas rysowania
    move(e) {
        // console.log("Jesteśmy w trakcie rysoania");
        e.preventDefault();
        switch (this.radioValue.toString()) {
            case '1': // rysowanie swobodne
                this.context.moveTo(this.currPoint.x, this.currPoint.y);
                this.getOffset(e.touches[0]);
                const currPoint1Copy = { ...this.currPoint };
                this.currCurve.points.push(currPoint1Copy);
                this.context.lineTo(this.currPoint.x, this.currPoint.y);
                this.context.stroke();

                break;
            case '2': // rysowanie okręgów
                this.context.beginPath();
                this.getOffset(e.touches[0]);

                const currPoint2Copy = { ...this.currPoint };
                this.currCircle.stopPoint = currPoint2Copy;

                const radius = Math.sqrt((this.startX - this.currPoint.x) * (this.startX - this.currPoint.x) + (this.startY - this.currPoint.y) * (this.startY - this.currPoint.y));

                this.context.arc(this.currPoint.x, this.currPoint.y, radius, 0, Math.PI * 2);
                break;
            case '3': // rysowanie linii
                this.context.moveTo(this.startX, this.startY);
                this.getOffset(e.touches[0]);
                this.currLine.stopPoint = { ...this.currPoint };
                // this.context.lineTo(this.currPoint.x, this.currPoint.y);
                break;
        }
    }

    // uruchamiana przy zakończeniu rysowania
    stop(e) {
        e.preventDefault();

        switch (this.radioValue.toString()) {
            case '1': // rysowanie swobodne
                // wysylac na serwer krzywą this.currCurve
                // i najlepiej odswiezyc widok z jsona na serwerze na najnowszy
                // this.mapCurve(this.currCurve);
                console.log(this.currCurve);
                this.elementToJSON(this.currCurve);
                break;
            case '2': // rysowanie okręgów
                console.log(this.currCircle);
                context.stroke();
                this.elementToJSON(this.currCircle);
                break;
            case '3': // rysowanie linii
                console.log(this.currLine);
                this.context.lineTo(this.currPoint.x, this.currPoint.y);
                context.stroke();
                this.elementToJSON(this.currLine);
                break;
        }

        // i na koniec po wysłaniu na serwer wyczyszczenie obiektów
        // this.setDefaultObjects();
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
    elementToJSON(element) {
        const jsonStr = JSON.stringify(element);
        console.log(jsonStr);
        this.sendJSON(jsonStr);
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
        // true wskazuje na tryb asynchroniczny
        // --------------------------------------------- dodac ID do url zeby php mial jakis identyfikator!!!!!
        xhr.open("POST", "./saveJSON.php?id=" + this.canvasID.toString(), true);

        // ustawia wartość nagłówka żądania HTTP
        // podaję nazwę nagłówka i wartość do ustawienia jako treść tego nagłówka
        xhr.setRequestHeader("Content-Type", "application/json");

        // funkcja obsługi
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    if (this.responseText != null) {
                        console.log(this.responseText);
                    }
                    else console.log("Błąd: nie otrzymano danych")
                }
                else console.log("Błąd: " + this.statusText)
            }
        }
        // wysyła żądanie na serwer
        xhr.send(jsonStr);
    }

    // usuwa ostatnią narysowaną rzecz
    undo() {
        if (this.idxCurvesArray <= 0) {
            this.clearAll();
            return;
        }

        this.idxCurvesArray -= 1;
        this.curvesArray.pop();
        this.context.putImageData(this.curvesArray[this.idxCurvesArray], 0, 0);
    }

    // liczenie offsetów
    getOffset(e) {
        const rect = e.target.getBoundingClientRect();
        const tempX = e.pageX - rect.left;
        const tempY = e.pageY - rect.top;

        this.currPoint.x = Math.round((tempX * e.target.width) / rect.width);
        this.currPoint.y = Math.round((tempY * e.target.height) / rect.height);
    }
}


const canvas = document.querySelector('#canvas');

// dodałem drugi argument {willReadFrequently: true} 
// bo był warning przy samym '2d'
const context = canvas.getContext('2d', { willReadFrequently: true });

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
    myCanvas.elementToJSON();
})