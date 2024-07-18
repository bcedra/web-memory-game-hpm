// 
document.addEventListener("DOMContentLoaded",function() {
    const nameInput = document.getElementById("nameWritten");
    const nameFieldError = document.getElementById("nameError")
    const dateInput = document.getElementById("birthDateValue");
    const errorMessage = document.getElementById("errorDate");
    //const categoryError = document.getElementById("category");
    const form = document.getElementById("myForm");

    autofillForm();

    dateInput.addEventListener("input",function() {
        dateValidation();
    });


    form.addEventListener("submit", function(event) {
      if (nameInput.value === "" ) {
        event.preventDefault();
        nameError.style.display = "inline";
      } else {
        nameFieldError.style.display ="none";
      }
    })
  
   form.addEventListener("submit", function(event) {
        if (!dateValidation())  {
            event.preventDefault();
        } else {
            submitForm(event);
        }
    });

    function dateValidation() {
        const selectedDate = new Date(dateInput.value);
        const currentDate = new Date();

        currentDate.setHours(0,0,0,0);

        if (selectedDate> currentDate) {
            errorMessage.style.display = "inline";
            return false;
        } else{
            errorMessage.style.display = "none";
            return true;
        }
    }

/*   form.addEventListener("submit", function (event) {
      if (category === "chooseCategory") {
        event.preventDefault();
        categoryError.style.display = "inline";
        return false;
      } else {
        categoryError.style.display = "none" ;
        return true;
      }
    });
*/
    function submitForm(event) {
        event.preventDefault();
        let name = document.getElementById("nameWritten").value;
        let date = document.getElementById("birthDateValue").value;
        let chosenCategory = document.getElementById("category").value;

        let object = { name: name, date: date, category: chosenCategory };
        let objectSerialized = JSON.stringify(object);

        setCookie("cookieExample", objectSerialized, 30);

        console.log("cookieExample", objectSerialized, 30);
    
    }

    function setCookie(cName, cValue, expDays) {
        let date = new Date();
        date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = cName + "=" + cValue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
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

    function autofillForm() {
      let cookieValue = getCookie("cookieExample");
      if (cookieValue) {
          let objectDeserialized = JSON.parse(cookieValue);

          if (objectDeserialized.name) {
              document.getElementById("nameWritten").value = objectDeserialized.name;
          }
          if (objectDeserialized.date) {
              document.getElementById("birthDateValue").value = objectDeserialized.date;
          }
          if (objectDeserialized.category) {
              document.getElementById("category").value = objectDeserialized.category;
          }
      }
  }

/*    function checkCookie() {
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
*/
    function submitKey() {
        form.addEventListener("submit", function(event) {
           event.preventDefault();
            if (!dateValidation() ) {
                event.preventDefault();
            } else {
                submitForm(event);
            }
        });
    }

    function main() {
        submitKey();
    }

    main();

});

