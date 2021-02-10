let buttonIdStart = document.getElementById('start');
console.log(buttonIdStart);

let income = document.querySelector('.income');
let expenses = document.querySelector('.expenses');
let buttonPlus1 = income.getElementsByTagName('button')[0];
let buttonPlus2 = expenses.getElementsByTagName('button')[0];
console.log(buttonPlus1);
console.log(buttonPlus2);

let checkboxId = document.querySelector('#deposit-check');
console.log(checkboxId);

let additionalIncome1 = document.querySelectorAll('.additional_income-item')[0];
let additionalIncome2 = document.querySelectorAll('.additional_income-item')[1];
console.log(additionalIncome1);
console.log(additionalIncome2);

let resultBudgetMonth = document.getElementsByClassName('budget_month-value')[0];
let resultBudgetDay = document.getElementsByClassName('budget_day-value')[0];
let resultExpensesMonth = document.getElementsByClassName('expenses_month-value')[0];
let resultAdditionalIncome = document.getElementsByClassName('additional_income-value')[0];
let resultAdditionalExpenses = document.getElementsByClassName('additional_expenses-value')[0];
let resultIncomePeriod = document.getElementsByClassName('income_period-value')[0];
let resultTargetMonth = document.getElementsByClassName('target_month-value')[0];
console.log(resultBudgetMonth);
console.log(resultBudgetDay);
console.log(resultExpensesMonth);
console.log(resultAdditionalIncome);
console.log(resultAdditionalExpenses);
console.log(resultIncomePeriod);
console.log(resultTargetMonth);

let salaryInputAmount = document.querySelector('.salary-amount');
let incomeInputTitle = document.querySelector('.income-title');
let incomeInputAmount = document.querySelector('.income-amount');
let additionalInputIncomeTitle1 = document.querySelectorAll('.additional_income-item')[0]; // при простом селекторе я не нашел как вывести второй, поэтому я сделал через all и индексы 
let additionalInputIncomeTitle2 = document.querySelectorAll('.additional_income-item')[1];
let expensesInputTitle = document.querySelector('.expenses-title');
let expensesInputAmount = document.querySelector('.expenses-amount');
let additionalInputIncomeTitle = document.querySelector('.additional_expenses-item');
let targetInputAmount = document.querySelector('.target-amount');
let periodInputSelect = document.querySelector('.period-select');
console.log(salaryInputAmount);
console.log(incomeInputTitle);
console.log(incomeInputAmount);
console.log(additionalInputIncomeTitle1);
console.log(additionalInputIncomeTitle2);
console.log(expensesInputTitle);
console.log(expensesInputAmount);
console.log(additionalInputIncomeTitle);
console.log(targetInputAmount);
console.log(periodInputSelect);