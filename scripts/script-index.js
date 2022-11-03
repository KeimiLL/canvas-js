// jak ktoś klika przycisk 'Stwórz nowy' to tworzę nowy obiekt myCanvas z kolejnym dostępnym id
// w pliku script-index mam mieć tablicę obiektów i też zmienną która przechowuje kolejne dostęppne ID

const IDs = 0;

const createBtn = document.querySelector('#create-btn');

createBtn.addEventListener('click', () => {
    myCanvas.saveToJSON();
})