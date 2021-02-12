'use strict';

let todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');
    
var todoData = [];

const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';


    todoData.forEach(function(item){

        const itemIndex = todoData.indexOf(item);
        const readyJSON = JSON.stringify(todoData[itemIndex]);
        localStorage.setItem(item.value, readyJSON);

        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
            '</div>';

        if(item.completed){
            todoCompleted.append(li);
        }else{todoList.append(li);}

        const btnTodoCompleted = li.querySelector('.todo-complete');

        btnTodoCompleted.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });

        const btnTodoRemove = li.querySelector('.todo-remove');

        btnTodoRemove.addEventListener('click', function(){
            const itemIndex = todoData.indexOf(item);
            localStorage.removeItem(item.value);
            todoData.splice(itemIndex, 1);

            render();
        });
    });
   
};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    if(headerInput.value.trim() !== ''){
    
        const newTodo = {
            value: headerInput.value,
            completed: false
        };

        todoData.push(newTodo);

        headerInput.value = '';
        
        render();
    }
});

window.addEventListener('DOMContentLoaded',function(){
    for(let key in localStorage){
        if(localStorage.getItem(key) !== null){
            todoData.push(JSON.parse(localStorage.getItem(key)));

            render();
        }
    }
});