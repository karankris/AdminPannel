const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
app.use(cors()) 
const mongoose = require('mongoose');
const port = 3001
// mongoose.connect('mongodb+srv://Karan_R:Karan@3009@cluster0.btt0kck.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
try{
  mongoose.connect('mongodb+srv://Karan_R:Karan3009@cluster0.btt0kck.mongodb.net/AdminPannel?retryWrites=true&w=majority&appName=Cluster0',{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected!'))
  .catch((err)=>{
    console.log("Database not connected")
  })

}catch(err){
  console.log("Db is not connected")
}
  // .then(() => console.log('MongoDB connected'))
  // .catch((err) => console.log(err));
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