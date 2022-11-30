// jak ktoś klika przycisk 'Stwórz nowy' to tworzę nowy obiekt myCanvas z kolejnym dostępnym id
// w pliku script-index mam mieć tablicę obiektów i też zmienną która przechowuje kolejne dostęppne ID

const id = 0;
const pathJSON = "json_data/data.json";
const createBtn = document.querySelector('#create-btn');
const drawings = [];

window.onload = function () {
    showDrawings();
};

window.setInterval(showDrawings, 1000);
function showDrawings() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "getJSON.php", true);

    // ustawia wartość nagłówka żądania HTTP
    // podaję nazwę nagłówka i wartość do ustawienia jako treść tego nagłówka
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText != null) {
                    console.log(xhr.responseText);

                }
                else console.log("Błąd Ajax: nie otrzymano danych")
            }
            else console.log("Błąd Ajax: " + this.statusText)
        }

    }
    // wysyła żądanie na serwer
    xhr.send();
}

createBtn.addEventListener('click', () => {

})

