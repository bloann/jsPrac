'use strict'

let body = document.querySelector('body');
let div = document.createElement('div');
body.append(div);

let nowDate = function(){
    let year = new Date().getFullYear();

    let monthAndDay = new Date().toLocaleString('ru', { month: 'long', day: 'numeric' });

    let nowDay = new Date();
    nowDay = new Intl.DateTimeFormat('ru-RU', { weekday: 'long'}).format(nowDay).charAt(0).toUpperCase() +  new Intl.DateTimeFormat('ru-RU', { weekday: 'long'}).format(nowDay).slice(1);

    let nowHour = new Date().getHours();
    let changeHoursLabel = function(){
        if(nowHour === 1 || nowHour === 21){
                nowHour = nowHour + ' час';
        }else if (nowHour === 2 || nowHour === 3 || nowHour === 4 || nowHour === 22 || nowHour === 23){
            nowHour = nowHour + ' часа';
        }else{
            nowHour = nowHour + ' часов';
        }
    };
    changeHoursLabel();

    let nowMinutes = new Date().getMinutes();
    let changeMinitsLabel = function(){
        if(nowMinutes === 1 || nowMinutes === 21 || nowMinutes === 31 || nowMinutes === 41 || nowMinutes === 51 ){
            nowMinutes = nowMinutes + ' минута ';
        }else if((nowMinutes >= 2 && nowMinutes <= 4) || (nowMinutes >= 22 && nowMinutes <= 24) || (nowMinutes >= 32 && nowMinutes <= 34) || (nowMinutes >= 42 && nowMinutes <= 44) || (nowMinutes >= 52 && nowMinutes <= 54)){
            nowMinutes = nowMinutes + ' минуты ';
        }else{
            nowMinutes = nowMinutes + ' минут ';
        }
    };
    changeMinitsLabel();

    let nowSeconds = new Date().getSeconds();
    let changeSecondsLable = function(){
        if((nowSeconds >= 5 && nowSeconds <= 20) || (nowSeconds >= 25 && nowSeconds <= 30) || (nowSeconds >= 35 && nowSeconds <= 40) || (nowSeconds >= 45 && nowSeconds <= 50) || (nowSeconds >=55 && nowSeconds <= 59)){
            nowSeconds = nowSeconds + ' секунд';
        }else if(nowSeconds === 1 || nowSeconds === 21 || nowSeconds === 31 || nowSeconds === 41 || nowSeconds === 51){
            nowSeconds = nowSeconds + ' секунда';
        }else{
            nowSeconds = nowSeconds + ' секунды';
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