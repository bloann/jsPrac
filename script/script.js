let money = +prompt('Ваш месячный доход?', 50000);
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'интернет, такси, коммуналка');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 1000000;

let showTypeOf = function(data){
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(addExpenses);
showTypeOf(deposit);
showTypeOf(mission);

addExpenses = addExpenses.toLowerCase();
console.log(addExpenses.split(', '));

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?', 500);
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?', 500);

function getExpensesMonth(){
    return amount1 + amount2;
}

function getAccumulatedMonth(){
    return money - getExpensesMonth();
}

let accumulatedMonth = getAccumulatedMonth();

function getTargetMonth(){
    return mission / accumulatedMonth;
}

let budgetDay = Math.floor(accumulatedMonth / 30);

console.log('Бюджет на месяц: ' + getAccumulatedMonth());
console.log('Бюджет на день: ' + budgetDay);
console.log('Цель будет достигнута за ' + Math.ceil(getTargetMonth()) + ' месяцев');

let getStatusIncome = function(){
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
};

getStatusIncome();