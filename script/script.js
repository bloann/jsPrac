let week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
function getDay(){
    let weekday = new Date().getDay();
    switch(weekday){
        case(0):
            return 'Воскресенье';
            break;
        case(1):
            return 'Понедельник';
            break;
        case(2):
            return 'Вторник';
            break;
        case(3):
            return 'Среда';
            break;
        case(4):
            return 'Четверг';
            break;
        case(5):
            return 'Пятница';
            break;
        case(6):
            return 'Суббота';
            break;
    }
}

for(let key in week){
    switch(week[key]){
        case(getDay()):
            document.writeln(week[key].bold() + '<br>');
            break;
        case('Суббота'):
            document.writeln(week[key].italics() + '<br>');
            break;
        case('Воскресенье'):
            document.writeln(week[key].italics());
            break;
        default:
            document.writeln(week[key] + '<br>');
            break;
    }
}


// console.log('%c' + week[1], 'font-weight: bold;');