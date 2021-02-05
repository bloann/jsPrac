let money = +prompt('Ваш месячный доход?', 50000);
let income = 'фриланс'; //доп доход
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 1000000; //сумма, которую хочу накопить
let period = 12; //число месяцев

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('"Период равен '+ period + ' месяцев" и "Цель заработать ' + mission +' рублей/долларов/гривен/юани"');

addExpenses = addExpenses.toLowerCase();
console.log(addExpenses.split(', '));

let budgetDay = money / 30; //доход за день

console.log(budgetDay);

let budgetMonth = money - (amount1 + amount2);
console.log('Бюджет на месяц: ' + budgetMonth);

let truePeriod = Math.ceil(mission / budgetMonth);
console.log('Цель будет достигнута за ' + truePeriod + ' месяцев');

budgetDay = Math.floor(budgetMonth / 30);
console.log('Бюджет на день: ' + budgetDay);

switch (true){
    case budgetDay >= 1200:
        console.log('У вас высокий уровень дохода');
        break;
    case budgetDay >= 600 && budgetDay < 1200:
        console.log('У вас средний уровень дохода');
        break;
    case budgetDay >= 0 && budgetDay < 600:
        console.log('К сожалению у вас уровень дохода ниже среднего');
        break;
    default:
        console.log('Что то пошло не так');
}