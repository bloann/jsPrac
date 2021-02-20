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

    this.getAddExpInc();
    this.getExpInc();
    
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

    addExpIncBlock(e){
            const startStr = e.target.className.split(' ')[1].split('_')[0];
            const item = document.querySelectorAll(`.${startStr}-items`);
            const cloneItem = item[0].cloneNode(true);

            cloneItem.querySelector(`.${startStr}-title`).value = '';
            cloneItem.querySelector(`.${startStr}-amount`).value = '';

            item[0].parentNode.insertBefore(cloneItem, e.target);

            const allItems = document.querySelectorAll(`.${startStr}-items`);

            if(allItems.length === 3){
                e.target.style.display = 'none';
            }
    }

    getExpInc(){
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if(itemTitle !== '' && itemAmount !== '') {
                console.log([startStr]);
                this[startStr][itemAmount] = itemAmount;
            }
        };

        incomeItems.forEach(count);
        expensesItems.forEach(count);

        for (const key in this.income){
            this.incomeMonth += +this.income[key];
        }
    }

    getAddExpInc(){
        const count = item => {

            const startStr = item.className.split('_')[1].split('-')[0];

            if(startStr === `income`){
                item = item.value.trim();
                item.forEach(item => {
                    if(item !== ''){
                        this.addIncome.push(item);
                    }
                });
            }else if(startStr === `expenses`){
                item = item.value.trim().split(',');
                item.forEach(item => {
                    if(item !== ''){
                        this.addExpenses.push(item);
                    }
                });
            }
        };

        additionalIncome.forEach(count);
        count(additionalInputExpensesTitle);
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
        expensesButtonPlus.addEventListener('click', this.addExpIncBlock);
        incomeButtonPlus.addEventListener('click', this.addExpIncBlock);
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