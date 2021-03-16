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
            } else if (target.closest('.menu')) {
                menu.classList.toggle('active-menu');
            } else if (target.nodeName !== 'MENU' && menu.classList.contains('active-menu')) {
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

            if (target.classList.contains('.popup-close')) {
                popup.style.display = 'none';
            }

            target = target.closest('.popup-content');

            if (!target) {
                popup.style.display = 'none';
            }
        });
    };
    togglePopUp();

    const scrollBtn = () => {
        const anchors = document.querySelectorAll('a');

        anchors.forEach((anchor) => {
            if ((anchor.className !== 'close-btn' && anchor.closest('menu') || anchor.closest('img '))) {
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
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
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

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
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

        for (let i = 0; i < slide.length; i++) {
            let crateDot = document.createElement('li');
            dotList.appendChild(crateDot);

        }

        let dots = dotList.querySelectorAll('li');
        dots.forEach((elem, index) => {
            elem.classList.add('dot');
            if (index === 0) {
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
            if (currentSlide >= slide.length) {
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

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide(2000);
            }
        });

        startSlide(2000);
    };
    slider();

    const changeImg = () => {
        const command = document.getElementById('command'),
            commandImg = command.querySelectorAll('.command__photo');

        command.addEventListener('mouseover', (event) => {
            const target = event.target;

            commandImg.forEach((element) => {
                if (element === target) {
                    let newDataset = target.src;
                    target.src = target.dataset.img;
                    target.dataset.img = newDataset;
                }
            });
        });

        command.addEventListener('mouseout', (event) => {
            const target = event.target;

            commandImg.forEach((element) => {
                if (element === target) {
                    let newDataset = target.src;
                    target.src = target.dataset.img;
                    target.dataset.img = newDataset;
                }
            });
        });
    };
    changeImg();

    const inputCheck = () => {
        const allInputs = document.querySelectorAll('input');

        allInputs.forEach((element) => {
            element.addEventListener('input', () => {
                allInputs.forEach((element) => {
                    if (element.closest('.calc-block')) {

                        element.value = element.value.replace(/[^\d+]/g, '');

                    } else
                        if (element.placeholder === 'Ваше имя' ||
                            element.placeholder === 'Ваше сообщение') {
                            element.value = element.value.replace(/[^а-яё\ \-]/ig, '');
                        } else
                            if (element.type === 'email') {
                                element.value = element.value.replace(/[^a-z\@\-\_\.\!\~\*\']/ig, '');
                            } else
                                if (element.type === 'tel') {
                                    element.value = element.value.replace(/[^\d+\()\-\+]/ig, '');
                                }
                });

            });

            element.addEventListener('blur', (element) => {
                const item = element.target;

                item.value = item.value.replace(/\-+/g, '-');

                let allItems = item.value.match(/./g);
                if (allItems) {
                    for (let i = 0; i < allItems.length; i++) {

                        if ((i === 0 || i === allItems.length) &&
                            (allItems[i] === ' ' || allItems[i] === '-')) {
                            allItems.splice(i, 1);
                        }

                    }

                    item.value = allItems.join('');
                    if (item.placeholder === 'Ваше имя') {
                        item.value = item.value[0].toUpperCase() + item.value.slice(1);
                    }
                }

            });
        });
    };
    inputCheck();

    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const animateValue = (obj, start, end, duration) => {//https://codepen.io/chriscoyier/pen/xxVBqEg
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) {
                    startTimestamp = timestamp;
                }
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                obj.innerHTML = Math.floor(progress * (end - start) + start);

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        };

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;

            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value < 5 && calcDay.value) {
                dayValue *= 2;
            } else if (calcDay.value < 10 && calcDay.value) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
            } else {
                total = 0;
            }

            animateValue(totalValue, 0, total, 750);
        };


        calcBlock.addEventListener('change', (event) => {
            const target = event.target;

            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });
    };
    calc(100);

    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так!',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

        const form = document.querySelectorAll('form');

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'margin: 10px; color: white; font-size: 2rem;';

        const postData = (body) => {
            
            body.forEach((val, key) => {
                body[key] = val;
            });

            return fetch('./server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
        };

        form.forEach((item) => {
            item.addEventListener('submit', (event) => {
                event.preventDefault();

                const form = event.target;

                form.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;

                const formData = new FormData(form);

                postData(formData)
                    .then((response) => {
                        if(response.status === 200) {
                            statusMessage.textContent = successMessage;
                        }else {
                            statusMessage.textContent = errorMessage;
                            throw new Error('status network not 200');
                        }
                    } )
                    .catch(
                        (error) => {
                            statusMessage.textContent = errorMessage;
                            console.error(error);
                        }
                    );

                form.querySelectorAll('input').forEach(item => item.value = '');
            });
        });

    };
    sendForm();
});