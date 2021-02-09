function game(){
    let result = confirm('Угадай число от 1 до 100');
    function mainGameEngine(){
        if (result == true){
            let randNum = Math.floor(Math.random() * 100) + 1;
            console.log(randNum);
            let i = 10;
                function gameEngine(){
                    let userNum = prompt('Введите число');
                    
                    if (!isFinite(userNum)){
                        alert('Введи число!');
                        return gameEngine();
                    }
                    
                    if(userNum == null){
                        result = false;
                        mainGameEngine();
                    }else if(userNum == randNum){
                        alert('Поздравляю, Вы угадали!!!');
                        mainGameEngine();
                    } else if(userNum < randNum){
                        i--;
                        alert('Загаданное число больше, осталось попыток ' + i);

                        if(i > 0){
                            gameEngine();
                        } else if(i <= 0){
                            result2 = confirm('Попытки закончились, хотите сыграть еще?');
                            if(result2 == true){
                                gameEngine();
                            }else if (result2 == false){
                                alert('Игра окончена');
                                result = false;
                            }
                        }
                        
                    } else if(userNum > randNum){
                        i--;
                        alert('Загаданное число меньше, осталось попыток ' + i);

                        if(i > 0){
                            gameEngine();
                        } else if(i <= 0){
                            result2 = confirm('Попытки закончились, хотите сыграть еще?');
                            if(result2 == true){
                                gameEngine();
                            }else if (result2 == false){
                                alert('Игра окончена');
                                result = false;
                            }
                        }

                    }
                    
                }
                gameEngine();
            } else if (result == false){
                alert('Игра окончена');
        }
    }
    mainGameEngine();
}
game();