'use strict';

const DomElement = function (selector, height, width, bg, fontSize ){
    const body = document.querySelector('body');

    DomElement.prototype.rectBlock = function (){
        let top = 0,
        left = 0;

        const div = document.createElement('div');
        
        body.append(div);
        
        div.style.cssText = `height: 100px; width: 100px; background: red; position: absolute;`;
        

        const func = function (event){
            switch (event.key) {
                case `ArrowUp`:
                    top -= 10;
                    div.style.top = `${top}px`;
                    break;
                case `ArrowDown`:
                    top += 10;
                    div.style.top = `${top}px`;
                    break;
                case `ArrowRight`:
                    left += 10;
                    div.style.left = `${left}px`;
                    break;
                case `ArrowLeft`:
                    left -= 10;
                    div.style.left = `${left}px`;
                    break;
            }
        };
        
        document.addEventListener('keydown', func);
    };

    DomElement.prototype.newBlock = function (){
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

const newObj = new DomElement(`#block`, `250px`, `100%`, `green`, `100px`);

document.addEventListener('DOMContentLoaded', newObj.rectBlock());
newObj.newBlock();