'use strict'

let body = document.querySelector('body');
let div = document.createElement('div');
body.append(div);
console.log(div);

let nowDate = function(){
    let year = new Date().getFullYear();

    let monthAndDay = new Date().toLocaleString('ru', { month: 'long', day: 'numeric' });

    let nowDay = new Date();
    nowDay = new Intl.DateTimeFormat('ru-RU', { weekday: 'long'}).format(nowDay).charAt(0).toUpperCase() +  new Intl.DateTimeFormat('ru-RU', { weekday: 'long'}).format(nowDay).slice(1);

    let nowHour = new Date().getHours();
    let changeHoursLabel = function(){
        if(nowHour === 0 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 ) {
                nowHour = nowHour + ' часов';
        }else if(nowHour === 1 | 21){
                nowHour = nowHour + ' час';
        }else if (nowHour === 2 | 3 | 4 | 22 | 23){
            nowHour = nowHour + ' часа';
        }
    };
    changeHoursLabel();

    let nowMinutes = new Date().getMinutes();
    let changeMinitsLabel = function(){
        if(nowMinutes === 0 | 5-20 | 25-30 | 35-40 | 45-50 | 55-59 ){
            nowMinutes = nowMinutes + ' минут ';
        }else if(nowMinutes === 1 | 21 | 31 | 41 | 51 ){
            nowMinutes = nowMinutes + ' минута ';
        }else if(nowMinutes === 2-4 | 22-24 | 32-34 | 42-44 | 52-54 ){
            nowMinutes = nowMinutes + ' минуты ';
        }
    };
    changeMinitsLabel();

    let nowSeconds = new Date().getSeconds();
    let changeSecondsLable = function(){
        if(nowSeconds === 5-20 | 25-30 | 35-40 | 45-50 | 55-59){
            nowSeconds += ' секунд';
        }else if(nowSeconds === 1 | 21 | 31 | 41 | 51){
            nowSeconds += ' секунда';   
        }else if(nowSeconds === 0-4 | 22-24 | 32-34 | 42-44 | 52-54 ){
            nowSeconds += ' секунды';
        }
    };
    changeSecondsLable();

    let todayDate = ('Сегодня ' + nowDay + ', ' + monthAndDay + ' ' + year + ' года, ' + nowHour + ' ' + nowMinutes + nowSeconds + '<br>');
    return todayDate;
    // 'Сегодня Вторник, 4 февраля 2020 года, 21 час 5 минут 33 секунды'
};

let shortNowDate = function(){
    let nowDate = new Date();

    let day = nowDate.getDay();

    let month = nowDate.getMonth();

    let year = nowDate.getFullYear();

    let hour = nowDate.getHours();

    let minutes = nowDate.getMinutes();

    let seconds = nowDate.getSeconds();

    let plusZero = function(prop){
        if(prop < 10){
            prop = '0' + prop;
        }
        return prop;
    };
    let realDate = (plusZero(day) + '.' + plusZero(month) + '.' + year + ' - ' + plusZero(hour) + ':' + plusZero(minutes) + ':' + plusZero(seconds));
    return realDate;
    //04.02.2020 - 21:05:33
};

setInterval(() => div.innerHTML = nowDate() + shortNowDate(), 1000);