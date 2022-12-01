// jak ktoś klika przycisk 'Stwórz nowy' to tworzę nowy obiekt myCanvas z kolejnym dostępnym id
// w pliku script-index mam mieć tablicę obiektów i też zmienną która przechowuje kolejne dostęppne ID

const id = 0;
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
    const drawings = [];
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "getJSON.php", true);

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
                    drawings.push(data);
                    console.log(drawings);
                    showDrawings(drawings);

                    // Object.entries(data).forEach((entry) => {
                    //     const [key, value] = entry;
                    //     console.log(`${key}: ${value}`);


                    //     entry.forEach(drawing => {
                    //         drawings.push(drawing)
                    //     });
                    //     showDrawings();
                    // });


                    // data.forEach(drawing => {
                    //     drawings.push(drawing)
                    // });
                    // showDrawings();
                }
                else console.log("Błąd Ajax: nie otrzymano danych")
            }
            else console.log("Błąd Ajax: " + this.statusText)
        }

    }
    // wysyła żądanie na serwer
    xhr.send();
}

// wyswietlenie rysunkow na glownej
function showDrawings(drawings) {
    //usuwam wszystkie poprzednie podglądy
    while (divDrawings.firstChild) {
        divDrawings.removeChild(divDrawings.firstChild);
    }

    // narazie jest tylko 1 krzywa w drawings 
    // potem dodać tak zeby bylo [dane_id: [krzywa1, krzyw2, krzywa3], dane_id2: [krzywa1, krzywa2, krzywa3]]
    
    // wyswietlam nowe podglady
    drawings.forEach((drawing, idx) => {
        console.log(idx);
        const newDrawingBtn = document.createElement('button');
        newDrawingBtn.innerText = "Rysunek id = " + idx;
        newDrawingBtn.setAttribute('id','idx');
        newDrawingBtn.setAttribute('class','btn-drawing');
        newDrawingBtn.addEventListener('click', () => {
            console.log("Kliknięto: Rysunek id = " + idx);
        });
        divDrawings.appendChild(newDrawingBtn);
    });
}




// createBtn.addEventListener('click', () => {

// })

