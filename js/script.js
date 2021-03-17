'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    addToStorage() {
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

        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(e) {
        e.preventDefault();
        if (this.input.value.trim()) {
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

    deleteItem(target) {
        if (this.todoData.has(target.key)) {
            this.todoData.delete(target.key);

            //hard lesson
            const _this = this;

            let start = Date.now();

            const draw = (timePassed) => {
                target.style.opacity = 1 - timePassed / 1000;
            };

            let timer = setInterval(function () {
                let timePassed = Date.now() - start;

                if (timePassed >= 1000) {
                    clearInterval(timer);
                    _this.render();
                    return;
                }

                draw(timePassed);

            }, 20);
        }
    }

    completedItem(target) {

        if (this.todoData.has(target.key)) {
            
            //hard lesson
            const completedAnimation = (target, _this) => {
                let start = Date.now();

                const draw = (timePassed) => {
                    target.style.right = timePassed / 0.1 + 'px';
                };

                let timer = setInterval(function () {
                    let timePassed = Date.now() - start;

                    if (timePassed >= 500) {
                        clearInterval(timer);
                        _this.render();
                        return;
                    }

                    draw(timePassed);

                }, 20);
            };

            if (this.todoData.get(target.key).completed) {
                this.todoData.get(target.key).completed = false;
                completedAnimation(target, this);

            } else {
                this.todoData.get(target.key).completed = true;
                completedAnimation(target, this);
            }
        }
    }

    editItem(target) {
        const targetText = target.querySelector('.text-todo');

        if (targetText.getAttribute('contenteditable')) {
            targetText.setAttribute('contenteditable', 'false');
            this.todoData.get(target.key).value = targetText.textContent;

            this.render();
        } else {
            targetText.setAttribute('contenteditable', 'true');
        }

    }

    handler() {
        const todoContaier = document.querySelector('.todo-container');

        todoContaier.addEventListener('click', (event) => {
            let target = event.target;

            if (target.matches('.todo-remove')) {
                this.deleteItem(target.closest('.todo-item'));

            } else if (target.matches('.todo-complete')) {
                this.completedItem(target.closest('.todo-item'));

            } else if (target.matches('.todo-edit')) {
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