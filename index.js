document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault();

    var container=document.getElementById("container");
    container.innerHTML=``;

    var row=parseInt(document.getElementById("number").value);
    var col=parseInt(document.getElementById("number").value);

    var table=document.createElement("table");
    table.id="myTable";


    for(var ri=0; ri<row; ri++) {
        var tr=document.createElement("tr");
         for(var ci=0; ci<col; ci++){
            var td=document.createElement("td");
            
            var flipCard = document.createElement("div");
            flipCard.className = "flipCard";
            
            var flipCardInner = document.createElement("div");
            flipCardInner.className = "flipCard-inner";

            var flipCardFront = document.createElement("div");
            flipCardFront.className = "flipCard-front";
            var img = document.createElement("img");
            img.src = "depositphotos_343097784-stock-photo-beautiful-sophisticated-background-minimalist-design.jpg";
            img.style.width = "100%";
            img.style.height = "100%";
            flipCardFront.appendChild(img);

            var flipCardBack = document.createElement("div");
            flipCardBack.className = "flipCard-back";
            flipCardBack.textContent = Math.floor(Math.random() * document.getElementById("number").value);

            flipCardInner.appendChild(flipCardFront);
            flipCardInner.appendChild(flipCardBack);
            flipCard.appendChild(flipCardInner);

            td.appendChild(flipCard);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    container.appendChild(table);
});

