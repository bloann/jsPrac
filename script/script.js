'use strict';

const buttonIdStart = document.getElementById('start');
const buttonIdCancel = document.getElementById('cancel');

const income = document.querySelector('.income');
const expenses = document.querySelector('.expenses');
const incomeButtonPlus = income.getElementsByTagName('button')[0];
const expensesButtonPlus = expenses.getElementsByTagName('button')[0];
const checkboxId = document.querySelector('#deposit-check');

const additionalIncome = document.querySelectorAll('.additional_income-item');

const resultBudgetMonth = document.getElementsByClassName('budget_month-value')[0];
const resultBudgetDay = document.getElementsByClassName('budget_day-value')[0];
const resultExpensesMonth = document.getElementsByClassName('expenses_month-value')[0];
const resultAdditionalIncome = document.getElementsByClassName('additional_income-value')[0];
const resultAdditionalExpenses = document.getElementsByClassName('additional_expenses-value')[0];
const resultIncomePeriod = document.getElementsByClassName('income_period-value')[0];
const resultTargetMonth = document.getElementsByClassName('target_month-value')[0];

const salaryInputAmount = document.querySelector('.salary-amount');
const incomeInputTitle = document.querySelector('.income-title');
const incomeInputAmount = document.querySelector('.income-amount');
let incomeItems = document.querySelectorAll('.income-items');
const additionalInputIncomeTitle = document.querySelectorAll('.additional_income-item');
const expensesInputTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalInputExpensesTitle = document.querySelector('.additional_expenses-item');
const targetInputAmount = document.querySelector('.target-amount');
const periodInputSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
let allTypeInputText = document.querySelectorAll('[type=text]');

class AppData {
    constructor(){
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
    }
}

AppData.prototype.start = function(){
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
};

AppData.prototype.showResult = function(){
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
    
    periodInputSelect.addEventListener('input', this.periodChange.bind(this));
};

AppData.prototype.addExpensesBlock = function(){
    const cloneExpensesItems = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesButtonPlus);
    cloneExpensesItems.querySelector('.expenses-title').value = '';
    cloneExpensesItems.querySelector('.expenses-amount').value = '';
    expensesItems = document.querySelectorAll('.expenses-items');

    if(expensesItems.length === 3){
        expensesButtonPlus.style.display = 'none';
    }
};

AppData.prototype.addIncomeBlock = function(){
    const cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomeButtonPlus);

    const incomeTitle = cloneIncomeItems.querySelector('.income-title');
    const incomeAmount = cloneIncomeItems.querySelector('.income-amount');

    incomeTitle.value = '';
    incomeAmount.value = '';

    incomeItems = document.querySelectorAll('.income-items');

    if(incomeItems.length === 3){
        incomeButtonPlus.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function(){
    const _this = this;
    expensesItems.forEach(function(item){
        const itemExpenses = item.querySelector('.expenses-title').value;
        const cashExpenses = item.querySelector('.expenses-amount').value;

        if(itemExpenses !== '' && cashExpenses !== ''){
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};

AppData.prototype.getIncome = function(){
    this.incomeMonth = 0;
    const _this = this;
    incomeItems.forEach(function(item){
        const itemIncome = item.querySelector('.income-title').value;
        const cashIncome = item.querySelector('.income-amount').value;

        if(itemIncome !== '' && cashIncome !== ''){
            _this.income[itemIncome] = cashIncome;
            _this.incomeMonth += +_this.income[itemIncome];
        }
    });
};

AppData.prototype.getAddExpenses = function(){
    const _this = this;
    let addExpenses = additionalInputExpensesTitle.value.split(',');
    addExpenses.forEach(function(item){
        item = item.trim();
        if( item !== ''){
            _this.addExpenses.push(item);
        }
    });
};

AppData.prototype.getAddIncome = function(){
    const _this = this;
    additionalIncome.forEach(function(item){
        const itemValue = item.value.trim();
        if( itemValue !== ''){
            _this.addIncome.push(itemValue);
        }
    });
};

AppData.prototype.getExpensesMonth = function(){
    const _this = this;
    for(let key in _this.expenses){
        _this.expensesMonth += +_this.expenses[key];
    }
};

AppData.prototype.getBudget = function (){
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
};

AppData.prototype.getTargetMonth = function (){
    return targetInputAmount.value / this.budgetMonth;
};

AppData.prototype.calcSavedMoney = function (){
    return this.budgetMonth * periodInputSelect.value;
};

AppData.prototype.getValue = function(){
    periodAmount.textContent = periodInputSelect.value;
};

AppData.prototype.periodChange = function (){
    resultIncomePeriod.value = this.calcSavedMoney();
};

AppData.prototype.checkReady = function (){
    if(salaryInputAmount.value !== ''){
        buttonIdStart.style.display = 'inline-block';
    }else{
        buttonIdStart.style.display = 'none';
        
    }
};

AppData.prototype.reset = function (){
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
};

AppData.prototype.eventsListeners = function(){
    this.checkReady();

    salaryInputAmount.addEventListener('input', this.checkReady);
    periodInputSelect.addEventListener('input', this.getValue);

    buttonIdStart.addEventListener('click', this.start.bind(this));
    expensesButtonPlus.addEventListener('click', this.addExpensesBlock);
    incomeButtonPlus.addEventListener('click', this.addIncomeBlock);
    buttonIdCancel.addEventListener('click', this.reset.bind(this));

    document.addEventListener('input', function(){
        const inputName = document.querySelectorAll('[placeholder="Наименование"]');
        const inputNumber = document.querySelectorAll('[placeholder="Сумма"]');
        
        inputName.forEach(function(item){
            item.value = item.value.replace(/[^а-яё\W+]/ig, '');
        });

        inputNumber.forEach(function(item){
            item.value = item.value.replace(/[^\d+]/g, '');
        });
    });
};


const appData = new AppData();

appData.eventsListeners();