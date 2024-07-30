var imgAr = ["Fruits/1.png", "Fruits/2.png", "Fruits/3.png", "Fruits/4.png", "Fruits/5.png",
  "Fruits/6.png", "Fruits/7.png", "Fruits/8.png", "Fruits/9.png", "Fruits/10.png",
  "Fruits/11.png", "Fruits/12.png", "Fruits/13.png", "Fruits/14.png", "Fruits/15.png", "Fruits/16.png"];

var tableData = [];

function createTable() {

  var table = document.getElementById("myTable");
  table.innerHTML = "";

  event.preventDefault();

  var sizeInput = document.getElementById("nb");
  var sizee = parseInt(sizeInput.value);
  var nbCells = sizee * sizee;

  var valCels = [];
  for (var i = 1; i <= nbCells / 2; i++) {
    valCels.push(i, i);
  }


  valCels = shuffle(valCels);

  for (var i = 0; i < sizee; i++) {
    var rowData = [];
    var row = document.createElement("tr");

    for (var j = 0; j < sizee; j++) {
      var cell = document.createElement("td");

      var number = valCels.pop();

      var card = document.createElement("div");
      card.classList.add("card");

      var flip = document.createElement("div");
      flip.classList.add("flip");

      var front = document.createElement("div");
      front.classList.add("front");

      var back = document.createElement("div");
      back.classList.add("back");

      var img = document.createElement("img");
      img.src = imgAr[number];
      img.setAttribute("width", "100");
      img.setAttribute("height", "100");
      back.appendChild(img);

      const textnode = document.createTextNode(number);
      back.append(textnode);

      flip.appendChild(front);
      flip.appendChild(back);
      card.appendChild(flip);

      cell.appendChild(card);
      row.appendChild(cell);

      flip.addEventListener("click", function () {
        this.classList.toggle("flipped");
      });

    }
    table.appendChild(row);
    tableData.push(rowData);
  }

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


