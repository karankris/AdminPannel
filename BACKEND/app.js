const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
app.use(cors()) 
app.use(express.static('productdata'))
app.use(express.static('uploads'))
const mongoose = require('mongoose');
const port = 3001
// const fs = require('fs').promises; // Using promises for asynchronous operations
// const path = require('path');
// const uploadFolder = path.join(__dirname, 'productdata'); // Adjust based on your project structure
// const uploadFolderUsers = path.join(__dirname, 'uploads');
// app.use(async (req, res, next) => {
//   try {
//     await fs.access(uploadFolder); // Check if folder exists
//   } catch (err) {
//     if (err.code === 'ENOENT') { // Folder doesn't exist, create it
//       await fs.mkdir(uploadFolderUsers, { recursive: true }); // Create folder recursively
//       console.log(`Upload folder created: ${uploadFolderUsers}`);
//     } else {
//       console.error('Error checking/creating upload folder:', err);
      
//     }
//   }
//   try {
//     await fs.access(uploadFolderUsers); // Check if folder exists
//   } catch (err) {
//     if (err.code === 'ENOENT') { // Folder doesn't exist, create it
//       await fs.mkdir(uploadFolderUsers, { recursive: true }); // Create folder recursively
//       console.log(`Upload folder created: ${uploadFolderUsers}`);
//     } else {
//       console.error('Error checking/creating upload folder:', err);      
//     }
//   }
//   next(); // Continue request processing
// });

// mongoose.connect('mongodb+srv://Karan_R:Karan@3009@cluster0.btt0kck.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
try{
  mongoose.connect('mongodb+srv://Karan_R:Karan3009@cluster0.btt0kck.mongodb.net/AdminPannel?retryWrites=true&w=majority&appName=Cluster0')
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