var add = document.querySelector(".add");
var input = document.querySelector("input");
var ul = document.querySelector("ul");
var stored_tasks = localStorage.getItem("tasks");
var li;

//status=true is completed.

add.addEventListener("click", addTask);

input.addEventListener("keyup", (event) => {
    if (event.keyCode == 13) {
        event.preventDefault();
        add.click();
    }
});

window.onload = () => {
    if (stored_tasks == null || stored_tasks == []) {
        stored_tasks = [];
        localStorage.setItem("tasks", JSON.stringify([]));
    } else {
        stored_tasks = JSON.parse(stored_tasks);
        stored_tasks.map(addTask);
    }
};

function addTask(obj = undefined) {
    let curr = document.createElement("li");
    let tn;
    let text=input.value.trim()
    let to_be_stored = { task: undefined, status: undefined };
    if (obj.task != undefined) {
        tn = document.createTextNode(obj.task);
    } else {
        if (text.length > 0) {
            tn = document.createTextNode(text);
            to_be_stored.task = text;
        } else return;
    }
    var span = document.createElement("span");
    span.classList = "buttons";

    let status_ele = document.createElement("input");
    status_ele.classList = "status";
    status_ele.type = "checkbox";
    status_ele.addEventListener('click',onStatusChanged)

    if (obj.status != undefined) {
        status_ele.checked = obj.status;
    } else {
        status_ele.checked = false;
        to_be_stored.status = false;
    }
    let del = document.createElement("i");
    del.classList = "fas fa-trash-alt";
    del.addEventListener('click',onDelete)

    if (to_be_stored.task != undefined && to_be_stored.status != undefined) {
        to_be_stored.id = stored_tasks.length;
        stored_tasks.push(to_be_stored);
        localStorage.setItem("tasks", JSON.stringify(stored_tasks));
    }

    span.appendChild(status_ele);
    span.appendChild(del);
    curr.appendChild(tn);
    curr.appendChild(span);

    if(obj.status)  curr.classList = "task checked";
    else curr.classList="task"
    
    if (to_be_stored.id != undefined) curr.id = "" + to_be_stored.id;
    else curr.id = "" + obj.id;
    ul.appendChild(curr);
    input.value = "";
}

function get_li(e){
    return e.target.parentElement.parentElement;
}

function onStatusChanged(e){
    let curr_li=get_li(e)
    curr_li.classList.toggle("checked");
    stored_tasks[curr_li.id].status=!stored_tasks[curr_li.id].status;
    localStorage.setItem('tasks',JSON.stringify(stored_tasks))
}

function updateID(){
    for(let i=0;i<stored_tasks.length;i++){
        stored_tasks[i].id=i;
    }
    li=document.querySelectorAll('li')
    for(let i=0;i<li.length;i++){
        li[i].id=""+i;
    }
    localStorage.setItem('tasks',JSON.stringify(stored_tasks))
}

function onDelete(e){
    let curr_li=get_li(e)
    ul.removeChild(curr_li)
    stored_tasks=stored_tasks.filter((ele)=>ele.id!=curr_li.id)
    updateID();
}
