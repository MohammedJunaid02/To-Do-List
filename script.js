const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
//set was used here to prevent duplicate tasks from getting added
const taskSet=new Set();

function addTask(){
    taskName=inputBox.value.trim();
    if(taskName=== ""){
        alert("You must add some tasks..!!");
        return;
    }

    if(isTaskDuplicate(taskName)){
        alert("A task with the same name already exists");
        return;
    }

    let li=document.createElement("li");
    li.innerHTML=taskName;
    li.textContent=taskName;
    listContainer.appendChild(li);

    let span=document.createElement("span");
    span.innerHTML="\u00d7";
    li.appendChild(span);

    taskSet.add(taskName.toLowerCase());

    saveData();
    
    inputBox.value='';
}

listContainer.addEventListener("click",function(e){
    if(e.target.tagName==="LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName==="SPAN"){
        const taskName=e.target.parentElement.textContent.trim();
        taskSet.delete(taskName.toLowerCase());
        //taskSet.delete(taskName.toUpperCase());
        e.target.parentElement.remove();
        saveData();
    }
},false);


function isTaskDuplicate(taskName){
    return Array.from(taskSet).some(existingTask=>existingTask.toLowerCase() === taskName.toLowerCase());
}

function clearTasks(){
    listContainer.innerHTML="";
    taskSet.clear();
    saveData();
}

function saveData() {
    localStorage.setItem("data",listContainer.innerHTML);
}

function showData(){
    listContainer.innerHTML=localStorage.getItem("data");
}

showData();

