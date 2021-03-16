'use strict';

const changeImg = () => {
    const command = document.getElementById('command'),
        commandImg = command.querySelectorAll('.command__photo');

    command.addEventListener('mouseover', (event) => {
        const target = event.target;

        commandImg.forEach((element) => {
            if (element === target) {
                let newDataset = target.src;
                target.src = target.dataset.img;
                target.dataset.img = newDataset;
            }
        });
    });

    command.addEventListener('mouseout', (event) => {
        const target = event.target;

        commandImg.forEach((element) => {
            if (element === target) {
                let newDataset = target.src;
                target.src = target.dataset.img;
                target.dataset.img = newDataset;
            }
        });
    });
};

export default changeImg;