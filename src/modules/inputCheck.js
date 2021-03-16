'use strict';

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

export default inputCheck;