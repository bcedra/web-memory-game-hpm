const cookieKey = "cookieTest123";

function onSubmit() {
  document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    clearErrors();
    let hasError = false;

    var name = document.getElementById("username").value;
    var date = document.getElementById("date").value;
    var age = calculateAge(new Date(date));
    var element = document.getElementById("element").value;
    console.log(name, date, element, age);

    if (!name) {
      setError("username", "Acest camp este obligatoriu!");
      hasError = true;
    }

    if (!date) {
      setError("date", "Acest camp este obligatoriu!");
      hasError = true;
    }

    if (!element) {
      setError("element", "Acest camp este obligatoriu!");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    let object = { name: name, date: date, category: element, age: age };

    console.log(object);

    var objectSerilized = JSON.stringify(object);

    setCookie(cookieKey, objectSerilized, 30);
  });
}

function setError(fieldId, errorMessage) {
  const field = document.getElementById(fieldId);
  const errorField = document.createElement("div");
  errorField.className = "error";
  errorField.innerText = errorMessage;
  field.parentNode.appendChild(errorField);
}

function clearErrors() {
  const errorFields = document.querySelectorAll(".error");
  errorFields.forEach(function (errorField) {
    errorField.remove();
  });
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
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

function loadCookie() {
  let cookieValue = getCookie(cookieKey);
  if (cookieValue) {
    let objectDeserilized = JSON.parse(cookieValue);
    document.getElementById("username").value = objectDeserilized.name;
    document.getElementById("date").value = objectDeserilized.date;
    document.getElementById("element").value = objectDeserilized.category;
  }
}

function checkDate() {
  const dateInput = document.getElementById('date');
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //ianuarie = 0
  const dd = String(today.getDate()).padStart(2, '0'); //completeaza cu 0 daca sirul are un caracter(<2)
  const formattedToday = `${yyyy}-${mm}-${dd}`;

  dateInput.setAttribute('max', formattedToday);
}

function calculateAge(birthDate) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  if (today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() == birthDate.getMonth() && today.getDay() < birthDate.getDay()))
    age--;

  return age;
}

function main() {
  document.addEventListener('DOMContentLoaded', function () {  //toate elem. html au fost create si accesibile prin DOM
    checkDate();
    loadCookie();
    onSubmit();
  });
}

main();