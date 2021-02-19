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

    start(){
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
    }

    showResult(){
        resultBudgetMonth.value = this.budgetMonth;
        resultBudgetDay.value = Math.ceil(this.budgetDay);
        resultExpensesMonth.value = this.expensesMonth;
        resultAdditionalExpenses.value = this.addExpenses.join(', ');
        resultAdditionalIncome.value = this.addIncome.join(' , ');
        resultTargetMonth.value = Math.ceil(this.getTargetMonth());
        resultIncomePeriod.value = this.calcSavedMoney();

        allTypeInputText = document.querySelectorAll('[type=text]');
        allTypeInputText.forEach( item => {
            item.setAttribute('disabled', true);
        });
        
        buttonIdStart.style.display = 'none';
        buttonIdCancel.style.display = 'inline-block';
        
        periodInputSelect.addEventListener('input', this.periodChange.bind(this));
    }

    addExpensesBlock() {
        const cloneExpensesItems = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesButtonPlus);
        cloneExpensesItems.querySelector('.expenses-title').value = '';
        cloneExpensesItems.querySelector('.expenses-amount').value = '';
        expensesItems = document.querySelectorAll('.expenses-items');

        if(expensesItems.length === 3){
            expensesButtonPlus.style.display = 'none';
        }
    }

    addIncomeBlock() {
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
    }

    getExpenses() {
        const _this = this;
        expensesItems.forEach( item => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;

            if(itemExpenses !== '' && cashExpenses !== ''){
                _this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }

    getIncome() {
        this.incomeMonth = 0;
        const _this = this;
        incomeItems.forEach( item => {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;

            if(itemIncome !== '' && cashIncome !== ''){
                _this.income[itemIncome] = cashIncome;
                _this.incomeMonth += +_this.income[itemIncome];
            }
        });
    }

    getAddExpenses() {
        const _this = this;
        let addExpenses = additionalInputExpensesTitle.value.split(',');
        addExpenses.forEach( item => {
            item = item.trim();
            if( item !== ''){
                _this.addExpenses.push(item);
            }
        });
    }

    getAddIncome() {
        const _this = this;
        additionalIncome.forEach( item => {
            const itemValue = item.value.trim();
            if( itemValue !== ''){
                _this.addIncome.push(itemValue);
            }
        });
    }

    getExpensesMonth() {
        for(let item in this.expenses){
            this.expensesMonth += +this.expenses[item];
        }
    }

    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    }

    getTargetMonth() {
        return targetInputAmount.value / this.budgetMonth;
    }

    calcSavedMoney() {
        return this.budgetMonth * periodInputSelect.value;
    }

    getValue() {
        periodAmount.textContent = periodInputSelect.value;
    }

    periodChange() {
        resultIncomePeriod.value = this.calcSavedMoney();
    }

    checkReady() {
        if(salaryInputAmount.value !== ''){
            buttonIdStart.style.display = 'inline-block';
        }else{
            buttonIdStart.style.display = 'none';
            
        }
    }

    reset() {
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

        allTypeInputText.forEach( item =>{
            item.value = '';
            item.removeAttribute('disabled');
        });
        
        buttonIdStart.style.display = 'inline-block';
        buttonIdCancel.style.display = 'none';
    }

    eventsListeners() {
        this.checkReady();

        salaryInputAmount.addEventListener('input', this.checkReady);
        periodInputSelect.addEventListener('input', this.getValue);

        buttonIdStart.addEventListener('click', this.start.bind(this));
        expensesButtonPlus.addEventListener('click', this.addExpensesBlock);
        incomeButtonPlus.addEventListener('click', this.addIncomeBlock);
        buttonIdCancel.addEventListener('click', this.reset.bind(this));

        document.addEventListener('input', () => {
            const inputName = document.querySelectorAll('[placeholder="Наименование"]');
            const inputNumber = document.querySelectorAll('[placeholder="Сумма"]');
            
            inputName.forEach( item => {
                item.value = item.value.replace(/[^а-яё\W+]/ig, '');
            });

            inputNumber.forEach( item => {
                item.value = item.value.replace(/[^\d+]/g, '');
            });
        });
    }
}


const appData = new AppData();

appData.eventsListeners();