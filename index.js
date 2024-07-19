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
      const textnode = document.createTextNode(number);

      var img = document.createElement('img');
      img.src = "Images/1.jpeg";

      img.setAttribute("width", "100");
      img.setAttribute("height", "100");
      cell.appendChild(img);

      row.appendChild(cell);
      cell.append(textnode);

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


