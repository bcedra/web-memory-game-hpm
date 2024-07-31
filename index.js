function w3_open() {
  document.getElementById("SidebarProfileSettings").style.display = "block";
}
function w3_close() {
  document.getElementById("SidebarProfileSettings").style.display = "none";
}

function w2_open() {
  document.getElementById("SidebarGameSettings").style.display = "block";
}
function w2_close() {
  document.getElementById("SidebarGameSettings").style.display = "none";
}

function w1_open() {
  document.getElementById("SidebarPlay").style.display = "block";
}
function w1_close() {
  document.getElementById("SidebarPlay").style.display = "none";
}


// var coll = document.getElementsByClassName("collapsible");
// var i;

// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var content = this.nextElementSibling;
//     if (content.style.display === "block") {
//       content.style.display = "none";
//     } else {
//       content.style.display = "block";
//     }
//   });
// }