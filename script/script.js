'use strict'

let buttonIdStart = document.getElementById('start');

let income = document.querySelector('.income');
let expenses = document.querySelector('.expenses');
let incomeButtonPlus = income.getElementsByTagName('button')[0];
let expensesButtonPlus = expenses.getElementsByTagName('button')[0];
let checkboxId = document.querySelector('#deposit-check');

let additionalIncome = document.querySelectorAll('.additional_income-item');

let resultBudgetMonth = document.getElementsByClassName('budget_month-value')[0];
let resultBudgetDay = document.getElementsByClassName('budget_day-value')[0];
let resultExpensesMonth = document.getElementsByClassName('expenses_month-value')[0];
let resultAdditionalIncome = document.getElementsByClassName('additional_income-value')[0];
let resultAdditionalExpenses = document.getElementsByClassName('additional_expenses-value')[0];
let resultIncomePeriod = document.getElementsByClassName('income_period-value')[0];
let resultTargetMonth = document.getElementsByClassName('target_month-value')[0];

let salaryInputAmount = document.querySelector('.salary-amount');
let incomeInputTitle = document.querySelector('.income-title');
let incomeInputAmount = document.querySelector('.income-amount');
let incomeItems = document.querySelectorAll('.income-items');
let additionalInputIncomeTitle = document.querySelectorAll('.additional_income-item');
let expensesInputTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalInputExpensesTitle = document.querySelector('.additional_expenses-item');
let targetInputAmount = document.querySelector('.target-amount');
let periodInputSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    addIncome: [],
    incomeMonth: 0,
    expenses: {},
    addExpenses: [],
    expensesMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 100000,
    start: function(){

        appData.budget = +salaryInputAmount.value;

        appData.getAddExpenses();
        appData.getAddIncome();

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getBudget();
        appData.getTargetMonth();

        appData.showResult();
    },
    showResult: function(){
        resultBudgetMonth.value = appData.budgetMonth;
        resultBudgetDay.value = Math.ceil(appData.budgetDay);
        resultExpensesMonth.value = appData.expensesMonth;
        resultAdditionalExpenses.value = appData.addExpenses.join(', ');
        resultAdditionalIncome.value = appData.addIncome.join(' , ');
        resultTargetMonth.value = Math.ceil(appData.getTargetMonth());
        resultIncomePeriod.value = appData.calcSavedMoney();

        

    },
    addExpensesBlock: function(){
        let cloneExpensesItems = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesButtonPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if(expensesItems.length === 3){
            expensesButtonPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function(){
        let cloneIncomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomeButtonPlus);
        incomeItems = document.querySelectorAll('.income-items');

        if(incomeItems.length === 3){
            incomeButtonPlus.style.display = 'none';
        }
        console.log(incomeItems);
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function(){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;

            if(itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            appData.incomeMonth += +appData.income[itemIncome];
            }
        });
    },
    getAddExpenses: function(){
        let addExpenses = additionalInputExpensesTitle.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if( item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function(){
        additionalIncome.forEach(function(item){
            let itemValue = item.value.trim();
            if( itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },

    getExpensesMonth: function(){
        for(let key in appData.expenses){
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function (){
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },

    getTargetMonth: function(){
        return targetInputAmount.value / appData.budgetMonth;
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * periodInputSelect.value;
    },
    getValue: function(){
        periodAmount.textContent = periodInputSelect.value;
    },
    periodChange: function(event){
        if(event){
            appData.start();
        }
    },
    checkReady: function(){
        if(salaryInputAmount.value !== ''){
            buttonIdStart.style.display = 'inline-block';
        }else{
            buttonIdStart.style.display = 'none';
        }
}
};

setInterval(() => appData.checkReady(), 1000);
buttonIdStart.addEventListener('click', appData.start);
expensesButtonPlus.addEventListener('click', appData.addExpensesBlock);
incomeButtonPlus.addEventListener('click', appData.addIncomeBlock);
periodInputSelect.addEventListener('change', appData.getValue);
periodInputSelect.addEventListener('change', appData.periodChange);



// if(appData.getTargetMonth <= 0){
//     console.log('Цель не будет достигнута');
// }else{
//     console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
// }
