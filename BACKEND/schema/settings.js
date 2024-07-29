const mongoose = require('mongoose');
const SettingsSchema = new mongoose.Schema({
   name:String,
   email:String,
   password:String,
  

});
 
module.exports = mongoose.model('settings',SettingsSchema);