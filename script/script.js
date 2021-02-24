'use strict';

const username = document.querySelector(`#username`),
    reg = document.querySelector(`#registerUser`),
    login = document.querySelector(`#login`),
    userList = document.querySelector(`#list`);

let userArray = [];

const readyArrToJSON = () => {
    let readyJSON = JSON.stringify(userArray);
    return readyJSON;
},

// Вывод на страницу
render = () => {
    userList.textContent = '';

    userArray.forEach(item => {
        localStorage.setItem(`usersList`, readyArrToJSON());

        const li = document.createElement(`li`);

        li.innerHTML = `<span>
        Имя: ${item.firstName}, фамилия: ${item.secondName}, зарегистрирован: ${item.regDate}
        </span>
        <button id="delete" style="height: 17px;">Удалить</button>`;

        userList.append(li);

        const btnDelete = li.querySelector('#delete');
        btnDelete.addEventListener('click', () =>{
            if(userArray.length === 1){
                userArray = [];
                localStorage.clear();
            }else{
                var itemIndex = userArray.indexOf(item);
                userArray.splice(itemIndex, 1);
            }
            render();
        });
    });
};

// Регистрация
reg.addEventListener(`click`, event => {
    event.preventDefault();

    const registration = () => {    
        let askUsername = prompt(`Введите через пробел Имя и фамилию пользователя`);
        if(askUsername){
            let usernameArray = askUsername.split(` `);
            if(usernameArray.length > 2){
                do {
                     alert(`Ошибка`);
                     askUsername = prompt(`Введите через пробел Имя и фамилию пользователя`);
                     usernameArray = askUsername.split(` `);
                 } while(usernameArray.length > 2);
            }
         
            let askLogin = prompt(`Введите логин`),
            askPassword = prompt(`Введите пароль`);
         
            const User = {
                firstName: usernameArray[0],
                secondName: usernameArray[1],
                login: askLogin,
                password: askPassword,
                regDate: new Date().toLocaleString(`ru`, {year: `numeric`, month: `long`, day: `numeric`, hour: `numeric`, minute: `numeric`, second: `numeric`})
            };
         
            userArray.push(User);

            render();
        }
    };
    registration();
});

// Логин
login.addEventListener(`click`, () => {
    let askLogin = prompt(`Введите логин`),
    text = username.innerHTML;
    
    if(askLogin){
        let askPassword = prompt(`Введите пароль`);
        userArray.forEach(user => {
            if(askLogin === user.login && askPassword === user.password){
                username.innerHTML = user.firstName;
            }
        });
    
        if(username.innerHTML === text){
            alert(`Пользователь не найден`);
        }
    }
});

// Импорт из локал стореджа
window.addEventListener(`DOMContentLoaded`,()=>{
    if(localStorage.getItem(`usersList`)){
        userArray = JSON.parse(localStorage.getItem(`usersList`));

        render();
    }
});