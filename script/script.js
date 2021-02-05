let lang = prompt('Выберите язык(ru/en)');

let enWeek = 'Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday';
let ruWeek = 'Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье';

// первый способ с if
if (lang == 'ru'){
    console.log(ruWeek);
} else if (lang == 'en'){
    console.log(enWeek);
} else{
    console.log('Error');
}
// второй способ с switch-case
switch (lang){
    case('ru'):
        console.log(ruWeek);
        break;
    case('en'):
        console.log(enWeek);
        break;
    default:
        console.log('Error');
}
//третий способ
let matrix = {
    en: ['Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday'],
    ru: ['Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье']
};
console.log(matrix[lang]);

// второе задание
let namePerson = prompt('Введите имя');

let result = namePerson === 'Артем' ? console.log('директор') : false;
result = namePerson === 'Максим' ? console.log('преподаватель') : console.log('студент');