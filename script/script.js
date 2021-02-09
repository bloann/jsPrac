function game(){
    let result = confirm('Угадай число от 1 до 100');
    function checkResult(){
        if (result == true){
                let randNum = Math.floor(Math.random() * 100) + 1;
                console.log(randNum);
                    function gameEngine(){
                        let userNum = prompt('Введите число');
                        if (!isFinite(userNum)){
                            alert('Введи число!');
                            return gameEngine();
                        }
                    
                        if(userNum == randNum){
                            alert('Поздравляю, Вы угадали!!!');
                            checkResult();
                        }else if(userNum == null){
                            result = false;
                            checkResult();
                        } else if(userNum < randNum){
                            alert('Загаданное число больше');
                            gameEngine();
                        } else if(userNum > randNum){
                            alert('Загаданное число меньше');
                            gameEngine();
                        }
                    }
                    gameEngine();
        } else if (result == false){ alert('Игра окончена'); }
    }
    checkResult();
    
}
game();