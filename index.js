var tableData = [];

function createTable() {
    var table = document.getElementById("myTable");
    table.innerHTML = ""; // deletes the previous table

    var sizeInput = document.getElementById("size-selection");
    var selectedNumber = parseInt(sizeInput.value);
    var cellNumber = selectedNumber * selectedNumber; 

    var cellValues = [];  // makes pairs
    for (var i = 1; i <= cellNumber / 2; i++) {        
        cellValues.push(i, i);
    }

    cellValues = shuffle(cellValues);

    for (var i = 0; i < selectedNumber; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j < selectedNumber; j++) {
            var cell = document.createElement("td");

            var number = cellValues.pop();

            var card = document.createElement("div");
            card.className = "card";

            var cardFront = document.createElement('div');
            cardFront.className = "card-face card-front";
            cardFront.innerHTML = `<img src="im8.png" style=";width: 100%;height: 100%; 
            border-radius: 6px;border-style: solid;border-width: 0px;">`;

            var cardBack = document.createElement("div");
            cardBack.className = "card-face card-back";
            cardBack.innerHTML = `<p>${number}</p>`;

            card.appendChild(cardFront);
            card.appendChild(cardBack);

            cell.appendChild(card);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp; 
    }
    return array;
}

document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();
    createTable();
});
