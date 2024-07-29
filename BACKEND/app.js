const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
app.use(cors()) 
const mongoose = require('mongoose');
const port = 3001
mongoose.connect('mongodb://127.0.0.1:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//Routers connect
require('./routes')(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 
// Backend Node js  