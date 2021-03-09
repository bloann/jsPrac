window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const countTimer = (deadline) => {

        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeReamaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeReamaining % 60),
                minutes = Math.floor((timeReamaining / 60) % 60),
                hours = Math.floor(timeReamaining / 60 / 60);

            if (dateStop < dateNow) {
                return { timeReamaining: 0, hours: 0, seconds: 0, minutes: 0 };
            } else {
                return { timeReamaining: timeReamaining, hours: hours, minutes: minutes, seconds: seconds };
            }
        }

        function updateClock() {
            let timer = getTimeRemaining();

            function plusZero(a) {
                if (a < 10) {
                    a = '0' + a;
                }
                return a;
            }

            timerHours.textContent = plusZero(timer.hours);
            timerMinutes.textContent = plusZero(timer.minutes);
            timerSeconds.textContent = plusZero(timer.seconds);

            if (timer.timeReamaining > 0) {
                setTimeout(updateClock);
            }
        }
        updateClock();
    };

    setInterval(countTimer, 1000, '31 march 2021');

    const toggleMenu = () => {
        const menu = document.querySelector('menu');

        document.addEventListener('click', (event) => {
            let target = event.target;
  
            if (target.closest('menu')) {
                menu.classList.toggle('active-menu');
            }else if (target.closest('.menu')) {
                menu.classList.toggle('active-menu');
            }else if (target.nodeName !== 'MENU' && menu.classList.contains('active-menu')){
                menu.classList.toggle('active-menu');
            }
        });
    };
    toggleMenu();

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content');

        popupBtn.forEach((elem) => {
            const popupAnimate = () => {
                if (screen.width > 768) {
                    popup.style.display = 'block';

                    let start = Date.now();

                    const draw = (timePassed) => {
                        popupContent.style.top = timePassed / 10 + 'px';
                    };

                    let timer = setInterval(function () {
                        let timePassed = Date.now() - start;

                        if (timePassed >= 2000) {
                            clearInterval(timer);
                            return;
                        }

                        draw(timePassed);

                    }, 20);
                } else {
                    popup.style.display = 'block';
                }
            };

            elem.addEventListener('click', popupAnimate);
        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        popup.addEventListener('click', (event) => {
            let target = event.target;

            if(target.classList.contains('.popup-close')){
                popup.style.display = 'none';
            }

            target = target.closest('.popup-content');

            if(!target){
                popup.style.display = 'none';
            }
        });
    };
    togglePopUp();

    const scrollBtn = () => {
        const anchors = document.querySelectorAll('a');
    
        anchors.forEach((anchor) => {
            if((anchor.className !== 'close-btn' && anchor.closest('menu') || anchor.closest('img '))){
                anchor.addEventListener('click', (elem) => {
                    elem.preventDefault();

                    const blockID = anchor.getAttribute('href');

                    document.querySelector(blockID).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                });
            }
        });
    };
    scrollBtn();

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++) {
                if(index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if(target){
                tab.forEach((item, i) => {
                    if(item === target){
                        toggleTabContent(i);
                    }
                });
            }

            
        });
    };
    tabs();

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelector('.portfolio-btn'),
            dotList = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval;

        for(let i = 0; i < slide.length; i++) {
            let crateDot = document.createElement('li');
            dotList.appendChild(crateDot);
            
        }
        
        let dots = dotList.querySelectorAll('li');
        dots.forEach((elem, index) => {
            elem.classList.add('dot');
            if(index === 0){
                elem.classList.add('dot-active');
            }
        });
        

        const dot = document.querySelectorAll('.dot');

        const prevSlide = (elem, index, strSlide) => {
            elem[index].classList.remove(strSlide);
        };

        const nextSlide = (elem, index, strSlide) => {
            elem[index].classList.add(strSlide);
        };

        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time) => {
            interval = setInterval(autoPlaySlide, time);
        };
        
        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) =>{
            event.preventDefault();
            
            const target = event.target;

            if(!target.matches('.portfolio-btn, .dot')){
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            
            if(target.matches('#arrow-right')){
                currentSlide++;
            }else if(target.matches('#arrow-left')){
                currentSlide--;
            }else if(target.matches('.dot')){
                dot.forEach((elem, index) => {
                    if(elem === target){
                        currentSlide = index;
                    }
                });
            }

            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            
            if(currentSlide < 0){
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                startSlide(2000);
            }
        });

        startSlide(2000);
    };
    slider();
});