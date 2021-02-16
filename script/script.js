'use strict';

let colorChangeButton = document.getElementById('change');
let colorTitle = document.getElementById('color');

var generateHexColor = function(){
    var hexColorCode = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    colorTitle.innerHTML = hexColorCode;
    colorChangeButton.style.color = hexColorCode;
    document.body.style.backgroundColor = hexColorCode;
};

colorChangeButton.addEventListener('click', generateHexColor);