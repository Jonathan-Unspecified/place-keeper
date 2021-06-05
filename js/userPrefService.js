'use strict';

function formSubmit(name,color,birthdate,email,age){
    var userData = {
        name,
        color,
        birthdate,
        email,
        age
    }
    saveToStorage('userData', userData);
}

function getPrefColor(){
    var color = loadFromStorage('userData');
    if(!color){
        return '#FFFFFF';
    }else return color.color;
}