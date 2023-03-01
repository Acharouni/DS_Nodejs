const express = require('express')
const router = express.Router();
const _ = require('lodash')
const path = require('path');
const studF = path.join('files', 'students.json')
const b = express.urlencoded({ extended: true })
const fs = require('fs');
const { student_schema, student_update_schema, module_schema } = require('../models/studentJoi');
const { moy } = require('../function/functions');
const { writefile } = require('../function/writefileFunction');
router.use(express.json());
let buffer = fs.readFileSync(studF);
let students = JSON.parse(buffer);

//api get all students
router.get('/students', (req, res) => {
    res.send(students);
});

//api get one student by name 
router.get('/students/:name', (req, res) => {
    let student = students.find(std => std.nom === req.params.name);
    if (!student)
        return res.status(404).send('Student with given name not found.');
    res.send(student);
});

//api add student
router.post('/students', (req, res) => {
    let valid_res = student_schema.validate(req.body);
    if (valid_res.error)
        return res.status(400).send(valid_res.error.message);
    let student = {
        nom: req.body.nom,
        classe: req.body.classe,
        modules: req.body.modules
    };
    let moyene = moy(student) //calculation moyenne
    student.moyenne = moyene; // reload moyenne 
    students.push(student);
    res.status(201).send(student);
    //call function writefile to write in students.json
    writefile(students, studF);

});

//api update student
router.put('/students/:name', b, (req, res) => {
    let student = students.find(std => std.nom === req.params.name);
    if (!student)
        return res.status(404).send("Student with the given name is not found.")
    let validation_result = student_update_schema.validate(req.body)
    if (validation_result.error)
        return res.status(400).send(validation_result.error.details[0].message)
    if (req.body.nom)
        student.nom = req.body.nom;
    if (req.body.classe)
        student.classe = req.body.classe;
    if (req.body.modules) {
        student.modules = req.body.module;
    }
    student = _.merge(student, req.body);
    let moyene = moy(student) //calculation moyenne
    student.moyenne = moyene; // reload moyenne 
    res.send(student)
        //call function writefile to write in students.json
    writefile(students, studF);
});


//api delete student by name
router.delete('/students/:name', b, (req, res) => {
    let student = students.find(std => std.nom === req.params.name);
    if (!student)
        return res.status(404).send('student with given name is not found.');
    student = students.filter(std => std.nom !== req.params.name);
    res.send(student)
        //call function writefile to write in students.json
    writefile(student, studF);
});

//api add module
router.patch('/astudents/module/:name', b, (req, res) => {
    let student = students.find(std => std.nom === req.params.name);
    if (!student)
        return res.status(404).send("Student with the given name is not found.")
    let valid_res = module_schema.validate(req.body);
    if (valid_res.error)
        return res.status(400).send(valid_res.error.message);
    let modules = req.body
    student.modules.push(modules);
    let moyene = moy(student) //calculation moyenne
    student.moyenne = moyene; // reload moyenne 
    res.send(student);
    //call function writefile to write in students.json
    writefile(students, studF);
});


//api delete one module by name of student and module name
router.delete('/students/module/:name/:module', b, (req, res) => {
    let student = students.find(std => std.nom === req.params.name);
    if (!student)
        return res.status(404).send("Student with the given name is not found.");
    let STmodel = student.modules.find(std => std.module === req.params.module);
    if (!STmodel)
        return res.status(404).send("Module is not found.");
    let positionmodel = student.modules.indexOf(STmodel)
    student.modules.splice(positionmodel, 1)
    let moyene = moy(student) //calculation moyenne
    student.moyenne = moyene; // reload moyenne 
    res.send(student)
        //call function writefile to write in students.json
    writefile(students, studF);
});

module.exports = router;