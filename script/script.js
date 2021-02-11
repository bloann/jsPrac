let books = document.querySelectorAll('.book');

books[1].after(books[0]);
books[0].after(books[4]);
books[4].after(books[3]);
books[3].after(books[5]);
books[5].after(books[2]);

document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

let booksTitle3 = books[4].getElementsByTagName('a');
booksTitle3[0].textContent = 'Книга 3. this и Прототипы Объектов';

let adv = document.querySelector('.adv');
adv.remove();

let secondBookChapters = books[0].querySelectorAll('li');
let fifthBookChapters = books[5].querySelectorAll('li');
console.log(fifthBookChapters);

secondBookChapters[1].after(secondBookChapters[3]);
secondBookChapters[3].after(secondBookChapters[6]);
secondBookChapters[6].after(secondBookChapters[8]);
secondBookChapters[8].after(secondBookChapters[4]);
secondBookChapters[4].after(secondBookChapters[5]);
secondBookChapters[5].after(secondBookChapters[7]);
secondBookChapters[7].after(secondBookChapters[9]);
secondBookChapters[9].after(secondBookChapters[2]);
secondBookChapters[2].after(secondBookChapters[10]);

fifthBookChapters[1].after(fifthBookChapters[9]);
fifthBookChapters[9].after(fifthBookChapters[3]);
fifthBookChapters[3].after(fifthBookChapters[4]);
fifthBookChapters[4].after(fifthBookChapters[2]);
fifthBookChapters[2].after(fifthBookChapters[6]);
fifthBookChapters[6].after(fifthBookChapters[7]);
fifthBookChapters[7].after(fifthBookChapters[5]);
fifthBookChapters[5].after(fifthBookChapters[8]);
fifthBookChapters[8].after(fifthBookChapters[10]);

books[2].append(books[2].querySelectorAll('li')[0].cloneNode());
books[2].querySelectorAll('li')[10].textContent = 'Глава 8: За пределами ES6';
books[2].querySelectorAll('li')[8].after(books[2].querySelectorAll('li')[10]);