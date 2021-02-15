'use strict';

let todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'),
    todoData = [];

const readyArrToJSON = function (){
    var readyJSON = JSON.stringify(todoData);
    return readyJSON;
};

const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';


    todoData.forEach(function(item){
        localStorage.setItem('itemList', readyArrToJSON());

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
            if(todoData.length === 1){
                todoData = [];
                localStorage.clear();
            }else{
            var itemIndex = todoData.indexOf(item);
            todoData.splice(itemIndex, 1);
            }

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
    if(localStorage.getItem('itemList')){
        todoData = JSON.parse(localStorage.getItem('itemList'));

        render();
    }
});