function game(){
    let i = 10;
    function mainGameEngine(){
        let result = confirm('Угадай число от 1 до 100');
        if (result == true){
                function gameEngine(){
                    let randNum = Math.floor(Math.random() * 100) + 1;
                    let userNum = prompt('Введите число'); // пробел учитывается как ноль и это фича
                    
                    if (!isFinite(userNum)){
                        alert('Введи число!');
                        return gameEngine();
                    }
                
                    if(userNum == randNum){
                        alert('Поздравляю, Вы угадали!!!');

                    } else if(userNum < randNum){
                        i--;
                        alert('Загаданное число больше, осталось попыток ' + i);
                    } else if(userNum > randNum){
                        i--;
                        alert('Загаданное число меньше, осталось попыток ' + i);
                    }
                    if(i > 0){
                        mainGameEngine();
                    } else if(i <= 0){
                        result2 = confirm('Попытки закончились, хотите сыграть еще?');
                        if(result2 == true){
                            game();
                        }else if (result2 == false){
                            alert('Игра окончена');
                            result = false;
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