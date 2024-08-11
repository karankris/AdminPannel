const express = require('express');
const Router = express.Router();
var jwt = require('jsonwebtoken');
const multer = require('multer');
const ProductModel = require('../schema/product');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'productdata');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
    
  }
})
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Set your desired file size limit in bytes (5 MB in this example)
});

const fs = require('fs');
const path = require('path');

// Router.get('/', async (req, res) => {
//   let token = req.headers.authorization;
//   console.log("--token---", token);  

//   let decoded = jwt.verify(token, 'Karanadmin@0930');
//   if (decoded) {
//     const allProduct = await ProductModel.find();
//     if (!allProduct) {
//       return res.send({ status: 0, message: 'No Products Found' });
//     }

//     // Process each product to include image URL or base64 representation
 
//     const productsWithImages = allProduct.map(product => {
//       const imagePath = path.join(__dirname, '../productdata', product.image); // Assuming your images are stored in 'uploads' folder
//       const imageBase64 = fs.readFileSync(imagePath, 'base64');
//       const imageUrl = `data:image/jpeg;base64,${imageBase64}`;

//       return {
//         _id: product._id, 
//         p_name: product.p_name, 
//         p_discription: product.p_discription,
//         p_stocks: product.p_stocks, 
//         p_price: product.p_price,
//         image: imageUrl, // or use 'imageBase64' for base64 representation
//       };
//     });

//     res.send({ status: 1, message: 'Products fetched successfully', productData: productsWithImages, token: token });
//   } else {
//     res.send({ status: 0, message: 'Invalid Token' });
//   }
// });
     
// // define the home page route
// Router.get('/', async (req, res) => {
//   let productData = await ProductModel.find();
//   res.send({ productData: productData });
// });

// define the about route


Router.get('/', async (req, res) => {
  let token = req.headers.authorization;
  console.log("--token---", token);

  try {
    let decoded = jwt.verify(token, 'Karanadmin@0930');
    if (decoded) {
      const allProduct = await ProductModel.find();
      if (!allProduct) {
        return res.send({ status: 0, message: 'No Products Found' });
      }

      // Process each product to include image URL or base64 representation
      const productsWithImages = allProduct.map(product => {
        const imagePath = path.join(__dirname, '../productdata', product.image); // Assuming your images are stored in 'productdata' folder

        // let imageUrl = null; // Initialize imageUrl to null

        if (fs.existsSync(imagePath)) {
          const imageBase64 = fs.readFileSync(imagePath, 'base64');
          imageUrl = `data:image/jpeg;base64,${imageBase64}`;
        } else {
          console.error(`Image file not found: ${imagePath}`);
          // You can set a default image URL or handle the case as needed
          imageUrl = 'path/to/default-image.jpg'; // Replace with your actual default image path or URL
        }

        return {
          _id: product._id,
          p_name: product.p_name,
          p_discription: product.p_discription,
          p_stocks: product.p_stocks,
          p_price: product.p_price,
          image: imageUrl, // This will now either be the base64 string or a default image
        };
      });

      res.send({ status: 1, message: 'Products fetched successfully', productData: productsWithImages, token: token });
    } else {
      res.send({ status: 0, message: 'Invalid Token' });
    }
  } catch (error) {
    console.error('Error processing products:', error);
    res.status(500).send({ status: 0, message: 'Internal Server Error' });
  }
});


Router.post('/addProduct', upload.single('image'), async (req, res) => {
  try {
    console.log("Product", req.body); 
    console.log("image", req.file);

    let p_name = req.body.name;
    let p_discription = req.body.discription;
    let p_stocks = req.body.stocks;
    let p_price = req.body.cost;
    let image = req.file ? req.file.filename : null; // check if file exists
    // Validate input
    if (!p_name || p_name.length < 3) {
      return res.send({ message: "Enter a valid product name", status: 0 });
    }

    if (!p_discription || p_discription.length < 20) {
      return res.send({ message: "Enter a valid product description of at least 20 characters", status: 0 });
    }  
    
    if (!p_price || p_price <= 0) {
      return res.send({ message: "Enter a valid product price", status: 0 });
    }

    if (!p_stocks || p_stocks <= 0) {
      return res.send({ message: "Enter a valid product stocks", status: 0 });
    }

    const newProduct = new ProductModel({
      p_name, 
      p_discription,
      p_stocks,
      p_price,
      image
    });

    const savedProduct = await newProduct.save();

    if (savedProduct) {
      return res.send({
        message: "Product details successfully added",
        p_name: p_name,
        p_discription: p_discription,
        p_price: p_price, 
        p_stocks: p_stocks,
        image: savedProduct.image, 
        status: 1,  
      });
    } else {
      return res.send({ message: "Error in adding the product", status: 0 });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error", status: 0 });
  }
});

// Update product using PUT API
Router.put('/updateProduct/:id', upload.single('image') ,async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found', status: 0 });
    }

    // Update the product data
    product.p_name = req.body.name || product.p_name;
    product.p_discription = req.body.discription || product.p_discription;
    product.p_stocks = req.body.stocks || product.p_stocks;
    product.p_price = req.body.cost || product.p_price; 

    if (req.file) {
      const imagePath = path.join(__dirname, '../productdata', product.image);
      fs.unlinkSync(imagePath);
      product.image = req.file.filename;
    } 

    // Save the updated product
    const updatedProduct = await product.save();

    res.status(200).json({ 
      message: 'Product data updated successfully',
      updatedProduct,
      status: 1,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', status: 0 });
  }
});

// Delete product using DELETE API
Router.delete('/deleteProduct/:id', async function (req, res) {
  try {
    const productId = req.params.id;

    // Check if the product exists
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).send({ message: 'Product not found', status: 0 });
    }

    // Delete the product
    await ProductModel.findByIdAndDelete(productId);
 
    res.status(204).send(); // 204 means successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error', status: 0 });
  }
});
 
module.exports = Router;
