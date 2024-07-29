const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    user_name:String,
    mail:String,
    phone:Number, 
    image:String
});
 
module.exports = mongoose.model('user',UserSchema);