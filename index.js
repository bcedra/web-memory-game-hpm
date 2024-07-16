
 var tableData = [];

function createTable(){
    var table = document.getElementById("myTable");
    event.preventDefault();
    var sizeInput = document.getElementById("nb");
    var sizee = parseInt(sizeInput.value);

    for (var i = 0; i < sizee; i++) {
        var rowData = [];
        var row = document.createElement("tr");
        
        for (var j = 0; j < sizee; j++) {
          var cell = document.createElement("td");
          const textnoder = document.createTextNode(i);
          const textnodec = document.createTextNode(j);
          row.appendChild(cell);
          cell.append(textnoder);
          cell.append(textnodec);
        }
        table.appendChild(row);
        tableData.push(rowData);
      }
}
