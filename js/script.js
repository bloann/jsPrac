'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    addToStorage(){
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
        <span class="text-todo">${todo.value}</span>
        <div class="todo-buttons">
            <button class="todo-edit"></button>
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>
        `);

        if(todo.completed){
            this.todoCompleted.append(li);
        }else{
            this.todoList.append(li);
        }
    }

    addTodo(e) {
        e.preventDefault();
        if(this.input.value.trim()){
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
            this.input.value = '';
        }
        
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    // я точно не знаю зачем я сделал проверку, но пусть она будет
    deleteItem(target) {
        if(this.todoData.has(target.key)){
            this.todoData.delete(target.key);
            this.render();
        }
    }

    completedItem(target) {
        if(this.todoData.has(target.key)){
            this.todoData.get(target.key).completed = true;
            this.render();
        }
    }

    //todo item edit
    //При повторном нажатии на кнопку редактирования происходит запоминание и рендер 
    editItem(target) {
        const targetText = target.querySelector('.text-todo');

        if(targetText.getAttribute('contenteditable')){
            targetText.setAttribute('contenteditable', 'false');
            this.todoData.get(target.key).value = targetText.textContent;
            
            this.render();
        }else{
            targetText.setAttribute('contenteditable', 'true');
        }
        
    }

    handler() {
        const todoContaier = document.querySelector('.todo-container');

        todoContaier.addEventListener('click', (event) => {
            let target = event.target;

            if(target.matches('.todo-remove')){
                this.deleteItem(target.closest('.todo-item'));

            }else if(target.matches('.todo-complete')){
                this.completedItem(target.closest('.todo-item'));

            }else if(target.matches('.todo-edit')){
                this.editItem(target.closest('.todo-item'));
            }
        });
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
        this.handler();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();