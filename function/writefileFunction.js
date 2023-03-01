const fs = require('fs');

//function writefile to add in students.json
module.exports.writefile = function writefile(students, studF) {
    let jsonContent = JSON.stringify(students);
    fs.writeFile(studF, jsonContent, 'utf8', function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    });
}