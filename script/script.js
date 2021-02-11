let nowDate = function(){
    let year = new Date().getFullYear();

    let monthAndDay = new Date().toLocaleString('ru', { month: 'long', day: 'numeric' });

    let nowDay = new Date().getDay();
    nowDay = new Intl.DateTimeFormat('ru-RU', {weekday: 'long'}).format(nowDay).charAt(0).toUpperCase() + new Intl.DateTimeFormat('ru-RU', {weekday: 'long'}).format(nowDay).slice(1);

    let nowHour = new Date().getHours();
    let changeHourLabel = function(){
        if(nowHour == 0 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 ) {
                nowHour = nowHour + ' часов';
        }else if(nowHour == 1 | 21){
                nowHour = nowHour + ' час';
        }else if (nowHour == 2 | 3 | 4 | 22 | 23){
            nowHour = nowHour + ' часа';
        }
    };
    changeHourLabel();

    let nowMinutes = new Date().getMinutes() + ' минут ';

    let nowSeconds = new Date().getSeconds() + ' секунды';

    console.log('Сегодня ' + nowDay + ', ' + monthAndDay + ' ' + year + ' года, ' + nowHour + ' ' + nowMinutes + nowSeconds);
    // 'Сегодня Вторник, 4 февраля 2020 года, 21 час 5 минут 33 секунды'
};
setInterval(() => nowDate(), 1000);

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
    console.log(plusZero(day) + '.' + plusZero(month) + '.' + year + ' - ' + plusZero(hour) + ':' + plusZero(minutes) + ':' + plusZero(seconds));
    //04.02.2020 - 21:05:33
};
setInterval(() => shortNowDate(), 1000);