const express = require('express')
const Router = express.Router()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const SettingsModel =require('../schema/settings');

// define the home page route
  Router.get('/' , async (req,res)=>{
    let settingData= await SettingsModel.find();
    res.send({settingData : settingData});
});
  
  Router.post('/register', async(req, res) => {
    const newAdmin = new SettingsModel();
    let name  =  req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    // to hash the password
    const hash = bcrypt.hashSync(password, 10);
    newAdmin.name =name;
    newAdmin.email = email;
    newAdmin.password = hash;
    var admin = await newAdmin.save();
    if(!admin)
    {
              res.send({status:0,message:"Invalid Admin Credential !!!"}) 
    } 
    else{
           res.send({status:1,message:"Admin added successfully",name:name}) 
    }
  })
  
  Router.post('/login', async(req, res) => {
    const newAdmin = new SettingsModel();  
    let email = req.body.email; 
    let password = req.body.password;
    let userInfo = await SettingsModel.findOne({email:email});
    
     if(userInfo && userInfo!=null)
     {
      let hashedpassword = userInfo.password;
      let verifypassword =  bcrypt.compareSync(password,hashedpassword);
    if(verifypassword) 
    {
      let token = jwt.sign({ email: email, password:password,type:'user'}, 'Karanadmin@0930');
      res.send({status:1,token:token,message:"Admin is verified !! Logined successfully"}) 
    }
    else{
      res.send({status:0,message:"Invalid Admin Password , Admin details does not match !!!"}) 
       
    }
  }
  else{
    res.send({status:0,message:"Email does not exists in the database"}) 
  }
  })
  module.exports = Router; 
  