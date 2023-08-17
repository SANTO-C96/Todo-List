const inputBox =document.getElementById("input-box");
const listContainer =document.getElementById("list-container");
const filterSelect = document.getElementById('filterSelect');
function addTask(){
    if(inputBox.value === ''){
        alert("You must write something");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        li.classList.add('incomplete');
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        updateFilter();
    }
    inputBox.value = "";
    saveData();
}

filterSelect.addEventListener('change', () => {
    updateFilter();
  });

listContainer.addEventListener("click", function(e){
    const listItem =e.target;
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        listItem.classList.toggle('completed');
        listItem.classList.toggle('incomplete');
        saveData();
        updateFilter();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
        updateFilter();
    }
},false);



  function updateFilter() {
    const selectedFilter = filterSelect.value;
    const todos =listContainer.querySelectorAll('li');
    todos.forEach(todo => {
        if(selectedFilter === 'all'){
            todo.style.display = 'block';
        }
        else if(selectedFilter === 'completed'){
            todo.style.display = todo.classList.contains('completed') ? 'block' : 'none';
        }
        else if(selectedFilter === 'incomplete') {
            todo.style.display = todo.classList.contains('incomplete') ? 'block' : 'none';
        }
    });
  }

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
    updateFilter();
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
    updateFilter();
}
showTask();


