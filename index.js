document.getElementById("toggle_button").addEventListener("click", function() {
  var collapse1 = document.getElementById("title1");
  collapse1.classList.toggle("collapsed");
  collapse1.style.display = collapse1.style.display == "none" ? "block" : "none";
  var collapse2=document.getElementById("title2");
  collapse2.classList.toggle("collapsed");
  collapse2.style.display = collapse2.style.display == "none" ? "block" : "none";
  var collapse3=document.getElementById("title3");
  collapse3.classList.toggle("collapsed");
  collapse3.style.display = collapse3.style.display == "none" ? "block" : "none";


 var collapsed = collapse1.style.display == "none";
 localStorage.setItem("itemCollapsed", collapsed);
});

window.onload=function(){
  
 var collapsed = localStorage.getItem("itemCollapsed") === 'true';
 var collapse1 = document.getElementById("title1");
 var collapse2 = document.getElementById("title2");
 var collapse3 = document.getElementById("title3");

 if (collapsed) {
     collapse1.classList.add("collapsed");
     collapse1.style.display = "none";
     
     collapse2.classList.add("collapsed");
     collapse2.style.display = "none";
     
     collapse3.classList.add("collapsed");
     collapse3.style.display = "none";
 }
}









  