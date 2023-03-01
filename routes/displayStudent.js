const express = require('express')
const router = express.Router();
const _ = require('lodash')
const path = require('path');
const studF = path.join('files', 'students.json')
const { max, min } = require('../function/functions');
const fs = require('fs');
router.use(express.json());
let buffer = fs.readFileSync(studF);
let students = JSON.parse(buffer);


//display each student with their best and worst module
router.get('/modules', (req, res) => {
    let tab = new Array();
    students.forEach(student => {
        let affich = {
            nom: student.nom,
            meilleure: max(student),
            moindre: min(student)
        };
        tab.push(affich)
    });
    res.send(tab);
});


//endpoint to display the average of all students
router.get('/average', (req, res) => {
    let sum_moy = students.reduce((b, std) => b + std.moyenne, 0);
    let AVG = sum_moy / students.length;
    res.json({ moyenne: AVG });
});


//display each study with their average
router.get('/nameavrage', (req, res) => {
    let tab = new Array();
    students.forEach(student => {
        let affich = {
            nom: student.nom,
            moyenne: student.moyenne
        };
        tab.push(affich)

    });
    res.send(tab)
});




module.exports = router;