'use strict';

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

export default slider;