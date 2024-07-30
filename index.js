var imgAr = ["Images/1.jpeg", "Images/2.jpeg", "Images/3.jpeg", "Images/4.jpeg", "Images/5.jpeg"];
function imgRandom(imgArr) {
  return imgArr[Math.floor(Math.random() * imgArr.length)];
}


var tableData = [];

function createTable() {

  var table = document.getElementById("myTable");
  table.innerHTML = "";

  event.preventDefault();

  var sizeInput = document.getElementById("nb");  
  var sizee = parseInt(sizeInput.value);
  var nbCells = sizee * sizee;

  var valCels = [];
  for (var i = 1; i <= nbCells / 2; i++)
    valCels.push(i, i);

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
      const textnodef = document.createTextNode("Click");
      front.append(textnodef);

      var back = document.createElement("div");
      back.classList.add("back");
      const textnode = document.createTextNode(number);
      back.append(textnode);

      flip.appendChild(front);
      flip.appendChild(back);
      card.appendChild(flip);

      cell.appendChild(card);
      row.appendChild(cell);
      
      flip.addEventListener("click", function(){
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


