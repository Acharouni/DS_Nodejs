const Joi = require('joi');

//Joi for add student
let student_schema = Joi.object({
    nom: Joi.string().min(6).max(25).required(),
    classe: Joi.string().alphanum().min(3).max(10).required(),
    modules: Joi.array().items(Joi.object({
        module: Joi.string().required(),
        note: Joi.number().min(0).max(20).required()
    })),
    moyenne: Joi.number()
});


//Joi for update student
let student_update_schema = Joi.object({
    nom: Joi.string().min(6).max(25).required(),
    classe: Joi.string().alphanum().min(3).max(10).required(),
    modules: Joi.array().items(Joi.object({
        module: Joi.string().required(),
        note: Joi.number().min(0).max(20).required()
    })),
    moyenne: Joi.number()
});


//Joi for add module
let module_schema = Joi.object({
    module: Joi.string().required(),
    note: Joi.number().min(0).max(20).required()
});

module.exports.module_schema = module_schema;
module.exports.student_schema = student_schema;
module.exports.student_update_schema = student_update_schema;