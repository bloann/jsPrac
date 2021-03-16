'use strict';

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

export default toggleMenu;