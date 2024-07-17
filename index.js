function setCookie(cName, cValue, expDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expDays*24*60*60*1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + ";" + expires + ";path=/";

}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
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
  
function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
      user = prompt("Please enter your name:", "");
      if (user != "" && user != null) {
        setCookie("username", user, 365);
      }
    }
  }

const cookieEx = "cookieExample";
  function submitKey() {
    document.getElementById("myForm").addEventListener("submit", function(event) {
        event.preventDefault();
        let name = document.getElementById("nameWritten").value;
        console.log(name);
        let date = document.getElementById("birthDateValue").value;
        console.log(date);
        let chosenCategory = document.getElementById("category").value;
   
        setCookie();

        let object = { name: name, date: date, category : chosenCategory};
        console.log(object);

        var objectSerilized = JSON.stringify(object);
        var objectDeserilized = JSON.parse(objectSerilized);

        setCookie(cookieEx, objectSerilized, 30);

    });

  }
function main() {

    submitKey();

  }

  main();


    
/* 
var prevNameValue = document.getElementById("name").value;
document.getElementById ("nameWritten").setAttribute("prevNameValue", value);
*/
