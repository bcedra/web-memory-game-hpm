export async function getData() {
    const url = "https://stage.helpdesk.hypertalk.net/api/operators";
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

export function searchOperators(){
    document.getElementById("searchbtn").addEventListener("click", async() =>{
        const input = document.getElementById('search').value;

        const operators = await getData(input);
        const filtered = operators.filter(operator => operator.name.includes(input));

        console.log(filtered);
        displayOperators(filtered.value);
    });
  }

export function displayOperators(operators){
    const opList = document.getElementById('list');
    operators.forEach(operator => {
      const div = document.createElement('div');
      div.textContent = operator.name;
      opList.appendChild(div);
    });

    console.log(opList);
}
  
