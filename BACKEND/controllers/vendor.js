const express = require('express')
const Router = express.Router()
const VendorModel = require('../schema/vendor')
var jwt = require('jsonwebtoken');  
// Get the vendor data from DB
// Router.get('/', async (req, res) => {
//   let vendorData = await VendorModel.find();
//   res.send({ vendorData: vendorData });
// });

  // define the home page route
  Router.get('/', async (req, res)=>{ 
    let token = req.headers.authorization;
    console.log("--token---",token);
 
     let decoded =  jwt.verify(token,'Karanadmin@0930') 
     if (decoded) {
      const vendorData = await VendorModel.find();
      if (!vendorData) {
          return res.send({ status: 0, message: 'No Vendors Found'});
      }
      res.send({ status: 1, message: 'Vendor fetched successfully', vendorData: vendorData, token: token });
    } else {
        res.send({ status: 0, message: 'Invalid Token'});
    }
  });





// Post new data to the backend
Router.post('/addVendor', async (req, res) => {
  let mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let Ph = /^\d{10}$/;

  // Fetching data from front end
  let vendor_name = req.body.v_name
  let vendor_mailid = req.body.vendor_mailid;
  let vendor_mobile = req.body.vendor_mobile;
  const newVendor = new VendorModel();
  if (!vendor_name) {
    res.send({ message: "Name field is Empty", status: 0 })
  }
  else if (vendor_name.length < 3) {
    res.send({ message: "Enter the valid name", status: 0 })
  }
  if (!vendor_mailid) {
    res.send({ message: "Mail feild is empty", status: 0 })
  }
  else if (mailPattern.test(vendor_mailid) == false) {
    res.send({ message: "Please enter valid email", status: 0 })
  }
  if (!vendor_mobile) {
    res.send({ message: "Mobile feild is empty", status: 0 })
  }
  else if (Ph.test(vendor_mobile) == false) {
    res.send({ message: "Please enter valid Mobile Number", status: 0 })
  }
  else {
    newVendor.vendor_name = vendor_name
    newVendor.vendor_mailid = vendor_mailid
    newVendor.vendor_mobile = vendor_mobile
    let Vendor = await newVendor.save();
    if (Vendor) {
      res.send({ message: "Vendor Details successfully added", Username: vendor_name, MailID: vendor_mailid, Mobile: vendor_mobile, status: 1 })
    }
    else {
      res.send({ message: "Error in adding the vendor" })
    }
  }
  console.log({ message: "Vendor Details successfully added", Username: vendor_name, MailID: vendor_mailid, Mobile: vendor_mobile, status: 1 })
})
// update data using put api
Router.put('/updateVendor/:id', async (req, res) => {
  try {
    const vendorId = req.params.id;
    const vendor = await VendorModel.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found', status: 0 });
    }

    // Update the vendor data
    vendor.vendor_name = req.body.vendor_name || vendor.vendor_name;
    vendor.vendor_mailid = req.body.vendor_mailid || vendor.vendor_mailid;
    vendor.vendor_mobile = req.body.vendor_mobile || vendor.vendor_mobile;

    // Save the updated vendor
    const updatedVendor = await vendor.save();

    res.status(200).json({
      message: 'Vendor data updated successfully',
      updatedVendor,
      status: 1,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', status: 0 });
  }
});


// delete item using delete API
Router.delete('/deleteVendor/:id', async function (req, res) {
  try {
    // Assuming you're using MongoDB and Mongoose
    const vendorId = req.params.id;

    // Check if the vendor exists
    const vendor = await VendorModel.findById(vendorId);
    if (!vendor) {
      return res.status(404).send({ message: 'Vendor not found', status: 0 });
    }

    // Delete the vendor
    await VendorModel.findByIdAndDelete(vendorId);

    res.status(204).send(); // 204 means successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error', status: 0 });
  }
});


module.exports = Router;

