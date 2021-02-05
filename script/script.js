function newOne(randVar){
    if (typeof(randVar) == 'number'){
        alert('Sike Thats the wrong Number');
    }else{
        return randVar = randVar.trim().slice(0, 30) + '...';
    }
}
console.log(newOne('       With their tanks and their bombs and their bombs and their guns       '));