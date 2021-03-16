'use strict';

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

export default scrollBtn;