

var tableData = [];

ImageArray = new Array();
image[0] = 'Images/1.jpeg';
image[1] = 'Images/2.jpeg';
image[2] = 'Images/3.jpeg';
image[3] = 'Images/4.jpeg';
image[4] = 'Images/5.jpeg';


var imgAr = ["Images/1.jpeg", "Images/2.jpeg", "Images/3.jpeg", "Images/4.jpeg", "Images/5.jpeg"];
function imgRandom(imgArr) {
  return imgArr[Math.floor(Math.random() * imgArr.length)];
}


function onSubmit() {
  document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var table = document.getElementById("myTable");
    table.innerHTML = "";

    var sizeInput = document.getElementById("nb");
    var sizee = parseInt(sizeInput.value);

    for (var i = 0; i < sizee; i++) {
      var rowData = [];
      var row = document.createElement("tr");

      for (var j = 0; j < sizee; j++) {
        var cell = document.createElement("td");
        const textnoder = document.createTextNode(i);
        const textnodec = document.createTextNode(j);

        var img = document.createElement('img');
        img.src = "Images/1.jpeg";

        //   var rand = ImageArray[Math.floor(Math.random() * ImageArray.length)];
        //   var img = new Image();
        //   img.src = rand;


        img.setAttribute("width", "100");
        img.setAttribute("height", "100");
        cell.appendChild(img);

        row.appendChild(cell);
        cell.append(textnoder);
        cell.append(textnodec);
      }
      table.appendChild(row);
      tableData.push(rowData);
    }
  });
}

function main() {
  onSubmit();
}

main();


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
      //const textnoder = document.createTextNode(i);
      //const textnodec = document.createTextNode(j);
      var number = valCels.pop();
      const textnode = document.createTextNode(number);

      var img = document.createElement('img');
      img.src = "Images/1.jpeg";

      //   var rand = ImageArray[Math.floor(Math.random() * ImageArray.length)];
      //   var img = new Image();
      //   img.src = rand;


      img.setAttribute("width", "100");
      img.setAttribute("height", "100");
      cell.appendChild(img);

      row.appendChild(cell);
      cell.append(textnode);
      //cell.append(textnodec);
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


