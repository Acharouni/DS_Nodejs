const _ = require('lodash')

// function return moyenne
module.exports.moy = function moy(student) {
    let val = student.modules.map(function(module) {
        return module.note;
    });
    let result = 0
    let i = 0
    val.forEach(number => {
        i += 1;
        result += number;
    })
    let resulfin = result / i;
    return resulfin;
}

// function return best module 
module.exports.max = function max(student) {
    let val = student.modules.map(function(module) {
        return module;
    });
    let note = 0;
    let module;
    val.forEach(maxmod => {
        if (maxmod.note > note) {
            note = maxmod.note;
            module = maxmod.module;
        }
    })
    let resulfin = { module, note };
    return resulfin;
}

// function return least module 
module.exports.min = function min(student) {
    let val = student.modules.map(function(module) {
        return module;
    });
    let note = val[0].note;
    let module;
    val.forEach(minmod => {
        if (minmod.note < note) {
            note = minmod.note;
            module = minmod.module;
        }
    })
    let resulfin = { module, note };
    return resulfin;
}