'use strict';

const sendForm = () => {
    const errorMessage = 'Что-то пошло не так!',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const form = document.querySelectorAll('form');

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'margin: 10px; color: white; font-size: 2rem;';

    const postData = (body) => {

        body.forEach((val, key) => {
            body[key] = val;
        });

        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };

    form.forEach((item) => {
        item.addEventListener('submit', (event) => {
            event.preventDefault();

            const form = event.target;

            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;

            const formData = new FormData(form);

            postData(formData)
                .then((response) => {
                    if (response.status === 200) {
                        statusMessage.textContent = successMessage;
                        const popUp = document.querySelector('.popup');
                        popUp.setTimeout(() => popUp.style.display = 'none', 3000);
                    } else {
                        statusMessage.textContent = errorMessage;
                        const popUp = document.querySelector('.popup');
                        setTimeout(() => popUp.style.display = 'none', 1500);
                        throw new Error('status network not 200');
                    }
                })
                .catch(
                    (error) => {
                        statusMessage.textContent = errorMessage;
                        console.error(error);
                    }
                );

            form.querySelectorAll('input').forEach(item => item.value = '');
        });
    });

};

export default sendForm;