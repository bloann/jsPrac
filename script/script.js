let arr = ['79', '261', '697', '22', '74', '879', '626'];

console.log(arr);

arr.forEach(element => {
    if(element.search(/(2|7)/)===0) {
        console.log(element);
    }
});