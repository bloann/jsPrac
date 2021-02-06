let arr = ['49', '261', '694', '22', '47', '849', '624'];

console.log(arr);

arr.forEach(element => {
    if(element.search(/(2|4)/)===0) {
        console.log(element);
    }
});

let n = 100;
primeNum:
for (let i = 2; i <= n; i++){
    for (let j = 2; j < i; j++) {
        if(i % j == 0){continue primeNum;}
    }
    console.log(i);
    console.log('Делители этого числа: 1 и ' + i);
}