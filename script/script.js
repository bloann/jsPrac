function newOne(randVar){
    if (typeof(randVar) == 'number'){
        alert('Sike Thats the wrong Number');
    }else{
        randVar.trim();
        randVar = randVar.slice(0, 30) + '...';
        return randVar;
    }
}
console.log(newOne('       With their tanks and their bombs and their bombs and their guns       '));