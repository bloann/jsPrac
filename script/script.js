let money = 12000; //доход за месяц
let income = 'фриланс'; //доп доход
let addExpenses = 'интернет, такси, коммуналка'; //доп расходы
let deposit = true; //булевой тип данных
let mission = 1000000000; //сумма, которую хочу накопить
let period = 12; //число месяцев

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length)

console.log('"Период равен '+ period + ' месяцев" и "Цель заработать ' + mission +' рублей/долларов/гривен/юани"');

console.log(addExpenses.toLowerCase(addExpenses.split(', ')));

let budgetDay = money / 30; //доход за день

console.log(budgetDay);