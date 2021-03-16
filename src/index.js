'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import scrollBtn from './modules/scrollBtn';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeImg from './modules/changeImg';
import inputCheck from './modules/inputCheck';
import calc from './modules/calc';
import sendForm from './modules/sendForm';


setInterval(countTimer, 1000, '31 march 2021');

toggleMenu();

togglePopUp();

scrollBtn();

tabs();

slider();

changeImg();

inputCheck();

calc(100);

sendForm();