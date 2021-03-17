'use strict';

const inputCheck = () => {
    const allInputs = document.querySelectorAll('input');

    allInputs.forEach((element) => {
        
        element.setAttribute('required', 'true');

        element.addEventListener('blur', (element) => {

            allInputs.forEach((element) => {

                if (element.closest('.calc-block')) {

                    element.value = element.value.replace(/[^\d+]/g, '');

                } else
                    if (element.placeholder === 'Ваше имя' ||
                        element.placeholder === 'Ваше сообщение') {

                        element.value = element.value.replace(/[^а-яё\ \-]/ig, '');
                    } else
                        if (element.type === 'email') {
                            if(element.value.match(/[^a-z\@\-\_\d]/ig)){
                                console.log(element.value);
                                element.value = '';
                                element.setCustomValidity('Поле неправильно заполнено');
                            }
                        } else
                            if (element.type === 'tel') {
                                element.value = element.value.replace(/[^\d+\()\-\+]/ig, '');
                            }
            });

            const item = element.target;

            item.value = item.value.replace(/\-+/g, '-');

            let allItems = item.value.match(/./g);
            if (allItems) {
                for (let i = 0; i < allItems.length; i++) {

                    if ((i === 0 || i === allItems.length) &&
                        (allItems[i] === ' ' || allItems[i] === '-')) {
                        allItems.splice(i, 1);
                    }
                    item.value = allItems.join('');

                }

                if (item.placeholder === 'Ваше имя') {
                    const itemArr = item.value.trim().split(' ');
                    item.value = '';

                    itemArr.forEach(elem => {
                        if(elem){
                            item.value += elem[0].toUpperCase() + elem.slice(1).toLowerCase() + ' ';
                        }
                    });
                    
                }
            }

        });
    });
};

export default inputCheck;