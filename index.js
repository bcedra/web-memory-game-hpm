function getValue() {
    document.getElementById("number").addEventListener("submit", function(event) {
        event.preventDefault();
        const rowNumber = document.getElementById("number").value;
        document.getElementById("rowNumber").innerHTML= number;
    })
} 

function createTable() {
    //creates <table> element + <tbody element
    const tbl = document.createElement("table");
    const tblBody = document.createElement("body");

    // reads the value given by the user
    var rows = document.getElementById("number").value;
    if ( rows > 5 || rows == 0 || rows % 1 !==0) {
        alert("This number can not be used! Please insert a natural number between 1 and 5.");
    }
    // creates the table
    for (let i=0; i<=rows-1 && rows<=5 && rows % 1==0; i++) {

        const row = document.createElement("tr");  
        for (let j=0; j<=rows-1 && rows<=5; j++) {
            const cell = document.createElement("td");
            const cellText = document.createTextNode(`${i}${j}`);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

            tblBody.appendChild(row);
    
        }
    tbl.appendChild(tblBody);
    document.body.appendChild(tbl);
    tbl.setAttribute("border", "2"); 
    
}
