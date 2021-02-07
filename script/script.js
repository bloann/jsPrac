let isNumber = function(n){ // Функция проверки числа
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'интернет, такси, коммуналка');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 1000000;

let showTypeOf = function(data){
    console.log(data, typeof(data));
};

let start = function(){ // Ввод месяногого дохода
    do{
        money = prompt('Ваш месячный доход?', 50000);
    } while (!isNumber(money));
}
start();

showTypeOf(money);
showTypeOf(income);
showTypeOf(addExpenses);
showTypeOf(deposit);
showTypeOf(mission);

let expenses = []; // Массив для ввода статей расхода

console.log(addExpenses.toLowerCase().split(', '));

function getExpensesMonth(){ // Расходы за месяц
    let sum = 0;
    let amount = 0;
    for (let i = 0; i < 2; i++) {
            expenses[i] = prompt('Введите обязательную статью расходов?');
            do{
                amount = prompt('Во сколько это обойдется?', 500);
            } while (!isNumber(amount));
            sum += parseFloat(amount);
    }
    return sum;
}
let expensesAmount = getExpensesMonth();

function getAccumulatedMonth(){ // Бюджет на месяц
    return money - expensesAmount;
}

let accumulatedMonth = getAccumulatedMonth();

function getTargetMonth(){ // Время выполнения миссии
    return mission / accumulatedMonth;
}

let budgetDay = Math.floor(accumulatedMonth / 30); // Бюджет на день

console.log('Бюджет на месяц: ' + getAccumulatedMonth());
console.log('Бюджет на день: ' + budgetDay);

if(getTargetMonth <= 0){ // Проверка выполнимости цели
    console.log('Цель не будет достигнута');
}else{
    console.log('Цель будет достигнута за ' + Math.ceil(getTargetMonth()) + ' месяцев');
}

let getStatusIncome = function(){ // Определения статуса дохода
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