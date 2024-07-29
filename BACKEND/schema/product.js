const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
   p_name:String,
   p_discription:String,
   p_stocks:Number, 
   p_price:Number,
   image:String
});
 
module.exports = mongoose.model('products',ProductSchema);