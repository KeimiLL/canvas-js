const pathJSON = "json_data/data.json";
const createBtn = document.querySelector('#create-btn');
const divDrawings = document.querySelector('.div-drawings');

window.onload = function () {
    let length = 0;
    getDrawings();
    window.setInterval(getDrawings, 1000);
};

// pobranie ilosci rysunkow
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
                    length = this.responseText;
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

// wyswietlenie odnosnikow na glownej
function showDrawings() {
    //usuwam wszystkie poprzednie podglądy
    while (divDrawings.firstChild) {
        divDrawings.removeChild(divDrawings.firstChild);
    }

    console.log("Ile ma length: " + length);
    // wyswietlam nowe podglady
    for (let idx = 0; idx < length; idx++) {
        const newDrawingBtn = document.createElement('button');
        newDrawingBtn.innerText = "Rysunek id = " + idx;
        newDrawingBtn.setAttribute('id', idx);
        newDrawingBtn.setAttribute('class', 'btn-drawing');
        newDrawingBtn.addEventListener('click', () => {
            window.open("drawing.php?id=" + idx, "_self");
        });
        divDrawings.appendChild(newDrawingBtn);
    }
}

// stworzenie nowej strony z kolejnym dostepnym id
createBtn.addEventListener('click', () => {
    //  otworzenie nowej strony
    window.open("drawing.php?id=" + length, "_self");
})

