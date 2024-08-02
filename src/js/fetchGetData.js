export async function getData(searchvalue) {
    const url = "https://stage.helpdesk.hypertalk.net/api/operators?search=" + searchvalue;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error.message);
    }
  }

  export function searchOperators() {
    async function handleSearch() {
        const input = document.getElementById('search').value;

        const operators = await getData(input);

        clearErrors();
        let hasError = false;

        try {
          const operators = await getData(input);
    
          if (operators.length == 0) {
            setError('search', "No operators found");
            hasError = true;
          }
    
          if (!hasError) {
            displayOperators(operators);
          }
        } catch (error) {
          setError('search', "No operators found");
        }
    }

    document.getElementById("searchbtn").addEventListener("click", handleSearch);

    document.getElementById("search").addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    });
}

export function displayOperators(operators){
    const opList = document.getElementById('list');
    opList.innerHTML='';
    operators.forEach(operator => {
      const div = document.createElement('div');
      div.textContent = operator.name;
      opList.appendChild(div);
    });

    console.log(opList);
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

// window.onload = function(){
//   var ro = document.getElementById("ro_language");
//   var en = document.getElementById("en_language");

//   if(ro.checked == true){
//     initializeTranslations('ro');
//   } 
//   else if(en.checked == true){
//     initializeTranslations('en');
//   }
//   else{
//     //ceva default
//     initializeTranslations('en');
//   }
  
// }
  
