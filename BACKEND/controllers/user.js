const express = require('express')
const Router = express.Router()
var jwt = require('jsonwebtoken');  
const multer  = require('multer') 
const UserModel =require('../schema/user')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+'.jpg')
  }
})
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // Set your desired file size limit in bytes (5 MB in this example)
});


  // define the home page route
  const fs = require('fs');
  const path = require('path');
  Router.get('/' , async (req,res)=>{
    let token = req.headers.authorization;
    console.log("--token---",token);
  
     let decoded =  jwt.verify(token,'Karanadmin@0930') 
     if (decoded) {
      const allUsers = await UserModel.find();
      if (!allUsers) {
          return res.send({ status: 0, message: 'No Users Found'});
      }

      // Process each user to include image URL or base64 representation
      const usersWithImages = allUsers.map(user => {
        const imagePath = path.join(__dirname, '../uploads', user.image); // Assuming your images are stored in 'uploads' folder
        const imageBase64 = fs.readFileSync(imagePath, 'base64');
        const imageUrl =  `data:image/jpeg;base64,${imageBase64}`; 

        return {
          _id: user._id,
          user_name: user.user_name,
          mail: user.mail,
          phone: user.phone,
          image: imageUrl, // or use 'imageBase64' for base64 representation
        };  
      });

      res.send({ status: 1, message: 'Users fetched successfully', userData: usersWithImages, token: token });
  } else {
      res.send({ status: 0, message: 'Invalid Token'});
  }
  });


  Router.post('/addUser', upload.single('image'), async (req, res) => {
    try {
      console.log("User", req.body);
      console.log("image", req.file);
  
      let mailPattern = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
      let Ph = /^\d{10}$/;
  
      // Fetching data from front end
      let user_name = req.body.user;
      let mail = req.body.mailid;
      let phone = req.body.mobile;
      let image = req.file ? req.file.filename : null; // check if file exists
  
      // Validate input
      if (!user_name || user_name.length < 3) {
        return res.send({ message: "Enter a valid name", status: 0 });
      }
  
      if (!mail || !mailPattern.test(mail)) {
        return res.send({ message: "Enter a valid email", status: 0 });
      }
  
      if (!phone || !Ph.test(phone)) {
        return res.send({ message: "Enter a valid mobile number", status: 0 });
      }
  
      const newUser = new UserModel({
        user_name,
        mail,
        phone,
        image
      });
  
      const savedUser = await newUser.save();
  
      if (savedUser) {
        return res.send({
          message: "User details successfully added",
          user_name : user_name,
          mail : mail,
          phone : phone,
          image: savedUser.image,
          status: 1
        });
      } else {
        return res.send({ message: "Error in adding the user", status: 0 });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal Server Error", status: 0 });
    }
  });
  // Update user using PUT API
Router.put('/updateUser/:id', upload.single('image'),async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found', status: 0 });
    }

    // Update the user data
    user.user_name = req.body.user_name || user.user_name;
    user.mail = req.body.mail || user.mail;
    user.phone = req.body.phone || user.phone;
    if (req.file) {
      const imagePath = path.join(__dirname, '../uploads', user.image);
      fs.unlinkSync(imagePath);
      user.image = req.file.filename;
    }

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json({
      message: 'User data updated successfully',
      updatedUser,
      status: 1,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', status: 0 });
  }
});

// Delete user using DELETE API
Router.delete('/deleteUser/:id', async function (req, res) {
  try {
    const userId = req.params.id;

    // Check if the user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found', status: 0 });
    }

    // Delete the user
    await UserModel.findByIdAndDelete(userId);

    res.status(204).send(); // 204 means successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error', status: 0 });
  }
});
   
  module.exports = Router;  
  

