window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    function clock(){
        let hello = document.querySelector('.hello'),
            nowDate = document.querySelector('.now-date'),
            nowTime = document.querySelector('.now-time'),
            timeReamaining = document.querySelector('.time-reamaining'),
            date = new Date(),
            day = date.toLocaleString('ru', {weekday: 'long'}),
            time = date.toLocaleTimeString('ru'),
            reamaining = Math.floor(((new Date('2021 december 31') - date) / 1000) / 60 / 60 / 24),
            hours = date.getHours();

        if(hours > 6 && hours < 12) {
            hello.textContent = 'Доброе Утро';
        }else if(hours > 12 && hours < 18) {
            hello.textContent = 'Добрый День';
        }else if(hours > 18 && hours < 21) {
            hello.textContent = 'Добрый Вечер';
        }else{
            hello.textContent = 'Доброй Ночи';
        }
        
        nowDate.textContent = `Сегодня: ${day}`;
        nowTime.textContent = `Текущее время:${time}`;

        if(reamaining > 1){
            timeReamaining.textContent = `До нового года осталось ${reamaining} день`;
        }else if(reamaining >= 2){
            timeReamaining.textContent = `До нового года осталось ${reamaining} дня`;
        }else if(reamaining >= 5){
            timeReamaining.textContent = `До нового года осталось ${reamaining} дней`;
        }
    }

    setInterval(clock, 1000);
});