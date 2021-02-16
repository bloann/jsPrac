'use strict';

var buttonIdStart = document.getElementById('start');
var buttonIdCancel = document.getElementById('cancel');

var income = document.querySelector('.income');
var expenses = document.querySelector('.expenses');
var incomeButtonPlus = income.getElementsByTagName('button')[0];
var expensesButtonPlus = expenses.getElementsByTagName('button')[0];
var checkboxId = document.querySelector('#deposit-check');

var additionalIncome = document.querySelectorAll('.additional_income-item');

var resultBudgetMonth = document.getElementsByClassName('budget_month-value')[0];
var resultBudgetDay = document.getElementsByClassName('budget_day-value')[0];
var resultExpensesMonth = document.getElementsByClassName('expenses_month-value')[0];
var resultAdditionalIncome = document.getElementsByClassName('additional_income-value')[0];
var resultAdditionalExpenses = document.getElementsByClassName('additional_expenses-value')[0];
var resultIncomePeriod = document.getElementsByClassName('income_period-value')[0];
var resultTargetMonth = document.getElementsByClassName('target_month-value')[0];

var salaryInputAmount = document.querySelector('.salary-amount');
var incomeInputTitle = document.querySelector('.income-title');
var incomeInputAmount = document.querySelector('.income-amount');
var incomeItems = document.querySelectorAll('.income-items');
var additionalInputIncomeTitle = document.querySelectorAll('.additional_income-item');
var expensesInputTitle = document.querySelector('.expenses-title');
var expensesItems = document.querySelectorAll('.expenses-items');
var additionalInputExpensesTitle = document.querySelector('.additional_expenses-item');
var targetInputAmount = document.querySelector('.target-amount');
var periodInputSelect = document.querySelector('.period-select');
var periodAmount = document.querySelector('.period-amount');
var allTypeInputText = document.querySelectorAll('[type=text]');

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
    start: function(){
        this.addExpenses = [];
        this.addIncome = [];

        this.budget = +salaryInputAmount.value;

        this.getAddExpenses();
        this.getAddIncome();

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getBudget();
        this.getTargetMonth();

        this.showResult();
    },
    showResult: function(){
        resultBudgetMonth.value = this.budgetMonth;
        resultBudgetDay.value = Math.ceil(this.budgetDay);
        resultExpensesMonth.value = this.expensesMonth;
        resultAdditionalExpenses.value = this.addExpenses.join(', ');
        resultAdditionalIncome.value = this.addIncome.join(' , ');
        resultTargetMonth.value = Math.ceil(this.getTargetMonth());
        resultIncomePeriod.value = this.calcSavedMoney();

        allTypeInputText = document.querySelectorAll('[type=text]');

        allTypeInputText.forEach(function(item){
            item.setAttribute('disabled', true);
        });
        
        buttonIdStart.style.display = 'none';
        buttonIdCancel.style.display = 'inline-block';
        
        periodInputSelect.addEventListener('input', this.periodChange);
    },
    addExpensesBlock: function(){
        let cloneExpensesItems = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesButtonPlus);
        cloneExpensesItems.querySelector('.expenses-title').value = '';
        cloneExpensesItems.querySelector('.expenses-amount').value = '';
        expensesItems = document.querySelectorAll('.expenses-items');

        if(expensesItems.length === 3){
            expensesButtonPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function(){
        let cloneIncomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomeButtonPlus);

        var incomeTitle = cloneIncomeItems.querySelector('.income-title');
        var incomeAmount = cloneIncomeItems.querySelector('.income-amount');

        incomeTitle.value = '';
        incomeAmount.value = '';

        incomeItems = document.querySelectorAll('.income-items');

        if(incomeItems.length === 3){
            incomeButtonPlus.style.display = 'none';
        }
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
        this.incomeMonth = 0;
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
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    },

    getTargetMonth: function(){
        return targetInputAmount.value / this.budgetMonth;
    },
    calcSavedMoney: function(){
        return this.budgetMonth * periodInputSelect.value;
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
    },
    reset: function(){
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.income = {};
        this.addIncome = [];
        this.incomeMonth = 0;
        this.expenses = {};
        this.addExpenses = [];
        this.expensesMonth = 0;
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        
        periodAmount.innerHTML = '1';
        periodInputSelect.value = '1';

        allTypeInputText = document.querySelectorAll('[type=text]');

        allTypeInputText.forEach(function(item){
            item.value = '';
            item.removeAttribute('disabled');
        });
        
        buttonIdStart.style.display = 'inline-block';
        buttonIdCancel.style.display = 'none';
    }
};

appData.checkReady();
salaryInputAmount.addEventListener('input', appData.checkReady);
buttonIdStart.addEventListener('click', appData.start.bind(appData));
expensesButtonPlus.addEventListener('click', appData.addExpensesBlock);
incomeButtonPlus.addEventListener('click', appData.addIncomeBlock);
periodInputSelect.addEventListener('input', appData.getValue);
buttonIdCancel.addEventListener('click', appData.reset.bind(appData));

document.addEventListener('input', function(){
    var inputName = document.querySelectorAll('[placeholder="Наименование"]');
    var inputNumber = document.querySelectorAll('[placeholder="Сумма"]');
    
    inputName.forEach(function(item){
        item.value = item.value.replace(/[^а-яё\W+]/ig, '');
    });

    inputNumber.forEach(function(item){
        item.value = item.value.replace(/[^\d+]/g, '');
    });
});