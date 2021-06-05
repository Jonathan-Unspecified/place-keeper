'use strict';

function getRandomId(){
    var options = [1,2,3,4,5,6,7,8,9];
    var id = '';
    for(var i = 0 ; i < 5 ; i++){
        id += options[getRandomInt(0,options.length-1)]
    }
    return id;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}