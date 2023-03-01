const express = require('express')
const app = express()
const port = 5000
const Studentroute = require('./routes/students')
const Displayroute = require('./routes/displayStudent')


app.use(Studentroute);
app.use(Displayroute)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))