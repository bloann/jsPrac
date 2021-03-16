'use strict';

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

export default togglePopUp;