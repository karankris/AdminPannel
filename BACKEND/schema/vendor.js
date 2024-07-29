const mongoose = require('mongoose');
const VendorSchema = new mongoose.Schema({
    vendor_name:String,
    vendor_mailid:String,
    vendor_mobile:Number
});
 
module.exports = mongoose.model('vendor',VendorSchema);