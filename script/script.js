function game(){
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
                    alert('Загаданное число больше');
                } else if(userNum > randNum){
                    alert('Загаданное число меньше');
                }
                game();
            }
            gameEngine();
        } else if (result == false){ alert('Игра окончена'); }
}
game();