let num = 266219; // число
let str = num.toString(); // преобразуем в строку
let numLenght = str.length; // вычисляем длинну
let a = 1; // это еденица для умножения

for(let i = 0; i<numLenght; i++) {
    let x = str[i]; // берем число из массива
    a = a * x; // умножаем числа
}

console.log(a); // получаем результат

console.log(a**3); // возодим в степень 3 при помощи оператора **

console.log(String(a**3).slice(0, 2)); // вывод первых двух цифр 