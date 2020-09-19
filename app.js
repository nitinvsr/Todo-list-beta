//selectors
const todoinput = document.querySelector('.todo-input');
const todobutton = document.querySelector('.todo-button');
const todolist = document.querySelector('.todo-list');

//event listener
todobutton.addEventListener('click', addtodo)
todolist.addEventListener('click', checked)

if (localStorage.getItem('storage') === null) {
    var rarr = [];
    localStorage.setItem('storage', JSON.stringify(rarr));
} else {
    var retrievedObject = localStorage.getItem('storage');
    var rarr = [];
    rarr = JSON.parse(retrievedObject);
    for (var i = 0; i < rarr.length; i++) {

        makeddiv(rarr[i]);
    }
}

//functions
function addtodo(event) {
    //prevents form submisson
    event.preventDefault();
    //each div of todo

    if (rarr.indexOf(todoinput.value) > -1) {
        todoinput.value = null;
        todoinput.placeholder = "Task Duplicated";
    } else {
        makeddiv(todoinput.value);
        rarr.push(todoinput.value);
        localStorage.setItem("storage", JSON.stringify(rarr))
        todoinput.value = null;
        todoinput.placeholder = "Add new task";

    }
}


function makeddiv(data) {
    var tododiv = document.createElement('div');
    tododiv.classList.add('todo');
    //li element inside div
    const newtodo = document.createElement('li');
    newtodo.innerText = data;
    newtodo.classList.add('todo-item');
    tododiv.appendChild(newtodo);
    //check mark button
    const completedbutton = document.createElement('button');
    completedbutton.innerHTML = '<i class="fas fa-check"></i>';
    completedbutton.classList.add("complete-button");
    tododiv.appendChild(completedbutton);
    //trash mark button
    const trashbutton = document.createElement('button');
    trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
    trashbutton.classList.add("trash-button");
    tododiv.appendChild(trashbutton);
    //hr line
    const hrline = document.createElement('hr');
    hrline.classList.add('hr-line');
    todolist.appendChild(tododiv);
    todolist.appendChild(hrline);
}

function checked(event) {
    const item = event.target;
    //check it
    if (item.classList[0] === 'complete-button') {
        const todo = item.parentElement;
        const hr = item.parentElement.nextElementSibling
        hr.classList.toggle('light-hr-line');
        todo.classList.toggle('completed');

    }
    if (item.classList[0] === 'trash-button') {
        const todo = item.parentElement;
        const hr = item.parentElement.nextElementSibling
        todo.classList.add("fall");
        todo.addEventListener('transitionend', function() {
                var index = rarr.indexOf(todo.innerText);
                if (index > -1) {
                    rarr.splice(index, 1);
                }
                localStorage.setItem('storage', JSON.stringify(rarr));
                todo.remove();
                hr.remove();
            }

        );

    }
}