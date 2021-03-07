window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const countTimer = function (deadline) {

        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining(){
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeReamaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeReamaining % 60),
                minutes = Math.floor((timeReamaining / 60) % 60),
                hours = Math.floor(timeReamaining / 60 / 60);
            
            if(dateStop < dateNow){
                return {timeReamaining: 0, hours: 0, seconds: 0, minutes: 0};
            }else{
                return {timeReamaining: timeReamaining, hours: hours, minutes: minutes, seconds: seconds};
            }
        }

        function updateClock(){
            let timer = getTimeRemaining();
            
            function plusZero(a){
                if(a < 10){
                    a =  '0' + a;
                }
                return a;
            }

            timerHours.textContent = plusZero(timer.hours);
            timerMinutes.textContent = plusZero(timer.minutes);
            timerSeconds.textContent = plusZero(timer.seconds);

            if(timer.timeReamaining > 0){
                setTimeout(updateClock);
            }
        }
        updateClock();
    };

    setInterval(countTimer, 1000, '31 march 2021');

    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));

    };

    toggleMenu();

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupClose = document.querySelector('.popup-close'),
        popupContent = document.querySelector('.popup-content');

        popupBtn.forEach((elem) => {
            const popupAnimate = function() {
                popup.style.display = 'block';
                
                let start = Date.now();

                function draw(timePassed) {
                    popupContent.style.top = timePassed / 5 + 'px';
                }

                let timer = setInterval(function() {
                let timePassed = Date.now() - start;

                if (timePassed >= 2000) {
                    clearInterval(timer); 
                    return;
                }

                draw(timePassed);

                }, 20);
            };

            elem.addEventListener('click', popupAnimate);
        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };

    togglePopUp();
});