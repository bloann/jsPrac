'use strict';

const DomElement = function (selector, height, width, bg, fontSize ){
    DomElement.prototype.newBlock = function (){
        const body = document.querySelector('body');
        if(selector.charAt(0) === '.'){
            //создаем элемент 
            const div = document.createElement('div');
            body.append(div);
            //задаем класс элементу
            div.classList.add(selector.slice(1));
            // задаем стиль
            div.style.cssText = `height: ${height}; width: ${width}; background: ${bg}; font-size: ${fontSize}; `;
            //Записываем любой текст
            div.innerHTML = 'Любой текст в div';
        }else if(selector.charAt(0) === '#'){
            //создаем элемент 
            const p = document.createElement('p');
            body.append(p);
            //задаем класс элементу
            p.setAttribute('id', selector.slice(1));
            // задаем стиль
            p.style.cssText = `height: ${height}; width: ${width}; background: ${bg}; font-size: ${fontSize};`;
            //Записываем любой текст
            p.innerHTML = 'Любой текст в p';
        }
    };
};

const newObj = new DomElement(`.block`, `250px`, `100%`, `green`, `100px`);
newObj.newBlock();