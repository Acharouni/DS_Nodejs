this project was created by Aymen Charouni and Donia Bel hadj kacem 

we create :
 ## In routes folder:
    @_ students.js:
          =>Api get all students  -> '/students'
          =>Api get one student by name -> '/students/:name'
          =>Api add student ->  '/students'
          =>Api update student by name -> '/students/:name'
          =>Api delete student by name -> '/students/:name'
          =>Api add module -> '/astudents/module/:name'
          =>Api delete one module by name of student and module name -> '/students/module/:name/:module'
        
      @_ displayStudents:
          =>Api display each student with their best and worst module ->'/modules'
          =>endpoint to display the average of all students ->'/average'
          =>Api display the moyenne of all students -> '/nameavrage'
 
  ## In models folder:
    @_ studentJoi.js:
          => Joi for add student
          => Joi for update student
          => Joi for add module

 ## In function folder:
    @_ functions.js:
          => function return moyenne
          => function return best module 
          => function return least module
         
    @_ writefileFunction.js:
          => function writefile to add in students.json

         