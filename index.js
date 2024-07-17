const cookieKey = "cookieTest123";
function onSubmit(){
  document.getElementById("myForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form from refreshing the page
  var name = document.getElementById("username").value;
  var date = document.getElementById("date").value;
  var element = document.getElementById("element").value;
  console.log(name, date, element);
  setCookie()

  let object = {name: name, date: date, category:element};

  console.log(object);

  var objectSerilized = JSON.stringify(object);
  var objectDeserilized = JSON.parse(objectSerilized);

  setCookie(cookieKey, objectSerilized, 30);

});
}

function main(){

  onSubmit();

  
}

main();

function checkDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); 
  const yyyy = today.getFullYear();

  const formattedDate = mm + '/' + dd + '/' + yyyy;

  return formattedDate;
}

function setCookie(cname,cvalue,exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}