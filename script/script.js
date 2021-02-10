let isNumber = function(n){ // Функция проверки числа
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function(){
    do{
        money = prompt('Ваш месячный доход?', 50000);
    } while (!isNumber(money));
};

start();

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    expensesMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 100000,
    period: 12,
    asking: function(){

        if(confirm('Есть ли у вас дополнительный источник заработока?')){
            let itemIncome;
            do{
                itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'починка принтеров');
            }while(isNumber(itemIncome));
            let cashIncome;
            do{
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 5000);
            }while(!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }

        appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'интернет, такси, коммуналка');
        appData.addExpenses = appData.addExpenses.toLowerCase().split(', ');
        for(let key in appData.addExpenses){
            appData.addExpenses[key] = appData.addExpenses[key].charAt(0).toUpperCase() + appData.addExpenses[key].slice(1);
        }
        console.log(appData.addExpenses.join(', '));
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            let example;
            do{
                example = prompt('Введите обязательную статью расходов?');
            }while(isNumber(example));
        
            do{
                appData.expenses[example] = +prompt('Во сколько это обойдется?', 500);
            } while (!isNumber(appData.expenses[example]));
        }
    },

    getExpensesMonth: function(){
        for(let key in appData.expenses){
            appData.expensesMonth += appData.expenses[key];
        }
    },

    getBudget: function (){
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    },

    getTargetMonth: function(){
        return Math.ceil(appData.mission / appData.budgetMonth);
    },

    getStatusIncome: function(){
        switch (true){
            case appData.budgetDay >= 1200:
                console.log('У вас высокий уровень дохода');
                break;
            case appData.budgetDay >= 600 && appData.budgetDay < 1200:
                console.log('У вас средний уровень дохода');
                break;
            case appData.budgetDay >= 0 && appData.budgetDay < 600:
                console.log('К сожалению у вас уровень дохода ниже среднего');
                break;
            default:
                console.log('Что то пошло не так');
        }
    },
    getInfoDeposit: function(){
        if(appData.deposit){
            do{
                appData.percentDeposit = prompt('Какой годовой процент?', 10);
            }while(!appData.percentDeposit);
            do{
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }while(!appData.moneyDeposit);
            
        }
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();

console.log('Бюджет на месяц: ' + appData.budgetMonth);
console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log('Бюджет на день: ' + appData.budgetDay);

if(appData.getTargetMonth <= 0){
    console.log('Цель не будет достигнута');
}else{
    console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
}

appData.getStatusIncome();

for(let item in appData){
    console.log('Наша программа включает в себя данные: ' + item + ' Значение: ' + appData[item]);
}