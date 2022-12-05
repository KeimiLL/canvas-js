// jak ktoś klika przycisk 'Stwórz nowy' to tworzę nowy obiekt myCanvas z kolejnym dostępnym id
// w pliku script-index mam mieć tablicę obiektów i też zmienną która przechowuje kolejne dostęppne ID

let length = 0;
const pathJSON = "json_data/data.json";
const createBtn = document.querySelector('#create-btn');
const divDrawings = document.querySelector('.div-drawings');
const drawings = [];

window.onload = function () {

    getDrawings();
};

// window.setInterval(getDrawings, 1000);


// pobranie rysunkow i potem przekazanie ich do funkcji 
// wyswietlajacej na glownym ekranie
function getDrawings() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "firstLoadJSON.php", true);

    // ustawia wartość nagłówka żądania HTTP
    // podaję nazwę nagłówka i wartość do ustawienia jako treść tego nagłówka
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                if (this.responseText != null) {
                    console.log("Odp: " + this.responseText);
                    length = this.responseText; // response text ma w sobie dlugosc arraya z canvasami
                    // const ids = this.responseText;
                    // canvasIDs = ids;
                    // console.log(data);

                    // drawings.push(data);
                    // console.log(drawings);
                    // showDrawings(drawings);
                    showDrawings();
                }
                else console.log("Błąd: nie otrzymano danych")
            }
            else console.log("Błąd: " + this.statusText)
        }

    }
    // wysyła żądanie na serwer
    xhr.send();
}

// wyswietlenie rysunkow na glownej
function showDrawings() {
    //usuwam wszystkie poprzednie podglądy
    while (divDrawings.firstChild) {
        divDrawings.removeChild(divDrawings.firstChild);
    }

    console.log("Ile ma length: " + length);
    // narazie jest tylko 1 krzywa w drawings 
    // potem dodać tak zeby bylo [dane_id: [krzywa1, krzyw2, krzywa3], dane_id2: [krzywa1, krzywa2, krzywa3]]
    
    // wyswietlam nowe podglady
    for(let idx = 0; idx < length; idx++) {
        const newDrawingBtn = document.createElement('button');
        newDrawingBtn.innerText = "Rysunek id = " + idx;
        newDrawingBtn.setAttribute('id',idx);
        newDrawingBtn.setAttribute('class','btn-drawing');
        newDrawingBtn.addEventListener('click', () => {
            // console.log("Kliknięto: Rysunek id = " + idx);
            window.open("drawing.php?id=" + idx, "_self"); // dodac do URL index zeby potem otworzyc odp rysunek!!!!
        });
        divDrawings.appendChild(newDrawingBtn);
    }
}

// stworzenie nowej strony z kolejnym dostepnym id
createBtn.addEventListener('click', () => {
    // trzeba utworzyć nowe miejsce w pliku json na canvasa
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "./saveJSON.php?id=" + length, true);
    xhr.setRequestHeader("Content-Type", "application/json");
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
    xhr.send([]);
    // i na koniec otworzenie nowej strony
    // window.open("drawing.php?id=" + (drawings.length - 1), "_self");
})

