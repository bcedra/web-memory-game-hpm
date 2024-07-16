function makeTable() {  
  var table=document.getElementById("myTable");
  var row=document.getElementById("number").value;
  var col=document.getElementById("number").value;


  for(var ri=0; ri<row; ri++) {
    var tr=document.createElement("tr");
    
    for(var ci=0; ci<col; ci++) {
        var td=document.createElement("td");
        td.textContent=`${ri}${ci}`;
        tr.appendChild(td);
    }
    table.appendChild(tr);
  }

}
    document.getElementById("make").addEventListener("click", makeTable);

    
