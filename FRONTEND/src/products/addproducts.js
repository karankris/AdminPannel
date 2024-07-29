import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { AC_ADD_PRODUCT } from "../actions/products";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
function Addproduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Product Name
  const [p_name, setP_name] = useState("");
  const [nameerror, setNameerr] = useState(false)
  //Product discription
  const [p_dis, setP_dis] = useState("");
  const [diserror, setDiserror] = useState(false)
  //Product Stock Count
  const [p_count, setP_count] = useState("");
  const [cerror, setCerror] = useState(false)
  //Product Price
  const [price, setPrice] = useState("");
  const [costerror, setCosterror] = useState(false)

  // image
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const validate = (event) => {
    let value = event.target.value;
    let id = event.target.id;
    if (id == 'p_name') {
      if (value.length >= 3) {
        setP_name(value)
        setNameerr(false)
      }
      else {
        setP_name(value)
        setNameerr(true)
      }
    }

    if (id == 'p_dis') {
      if (value.length >= 20) {
        setP_dis(value)
        setDiserror(false)
      }
      else {
        setP_dis(value)
        setDiserror(true)
      }
    }
    if (id == 'p_count') {
      {
        setP_count(value)
        setCerror(false)
      }
    }
    if (id == 'price') {
      setPrice(value)
      setCosterror(false)
    }
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

      if (allowedTypes.includes(file.type)) {
        setFileError('');
        setSelectedFile(file);

        // Create a URL for the selected image and update the preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFileError('Invalid file type. Please select a PNG, JPG, or JPEG file.');
        setSelectedFile(null);
        setImagePreview(null);
      }
    }
  };
  const formvalidate = () => {
    var p_flag = 0;
    var d_flag = 0;
    var c_flag = 0;
    var cost_flag = 0;
    var i_flag = 0;
    let product_name = p_name;
    let product_discription = p_dis;
    let product_count = p_count;
    let Product_price = price;
    if (product_name.length >= 3) {
      setNameerr(false)
      p_flag = 1;
    }
    else {
      setNameerr(true)
    }
    if (product_discription.length >= 20) {
      setDiserror(false)
      d_flag = 1;
    }
    else {
      setDiserror(true)
    }
    if (product_count > 0) {
      setCerror(false)
      c_flag = 1;
    }
    else {
      setCerror(true)
    }
    if (Product_price > 0) {
      setCosterror(false)
      cost_flag = 1;
    }
    else {
      setCosterror(true)
    }
    if (!selectedFile) {
      setFileError('Please select a file.');
      i_flag = 0;
    }
    else {
      i_flag = 1;
    }
    if (p_flag == 1 && d_flag == 1 && c_flag == 1 && cost_flag == 1 && i_flag == 1) {
      let productData = { name: p_name, discription: p_dis, cost: price, stocks: p_count, image: selectedFile }
      dispatch(AC_ADD_PRODUCT(productData));
      swal("Product added Successfully!", "Success!", "success");
      navigate("/products");
    }
  }
  return (
    <>
      <Container className="form-siz ">
        <Form className="form-design user-bx" data-aos="fade-left" data-aos-duration="1000">
          <Form.Group className="mb-3 txt-bx">
            <Form.Label className="pname">PRODUCT NAME</Form.Label>
            <input type="text" placeholder="Enter Product Name" value={p_name} id="p_name" onChange={validate} className="txt" />
            {nameerror ? <Form.Label style={{ color: 'red' }} className="err" onChange={validate}>*Enter the valid name </Form.Label> : ""}
          </Form.Group>
          <Form.Group className="mb-3 txt-bx">
            <Form.Label className="pname">PRODUCT DISCRIPTION</Form.Label>
            <textarea type="textarea" rows={3} cols={10} id="p_dis" value={p_dis} onChange={validate} className="txt" placeholder="Enter Product discription" />
            {diserror ? <Form.Label style={{ color: 'red' }} className="err" onChange={validate}>
              *Description of up to 20 characters. </Form.Label> : ""}
          </Form.Group>
          <Form.Group className="mb-3 txt-bx">
            <Form.Label className="pname ">STOCKS</Form.Label>
            <input type="text" id="p_count" value={p_count} onChange={validate} className="txt" placeholder="Enter stock count" />
            {cerror ? <Form.Label style={{ color: 'red' }} className="err" onChange={validate}>*Enter the valid Stocks</Form.Label> : ""}
          </Form.Group>
          <Form.Group className="mb-3 txt-bx">
            <Form.Label className="pname ">PRICE</Form.Label>
            <input type="text" id="price" value={price} onChange={validate} className="txt" placeholder="Enter stock price" />
            {costerror ? <Form.Label style={{ color: 'red' }} className="err" onChange={validate}>*Enter valid cost</Form.Label> : ""}
          </Form.Group>
          <Form.Group className="mb-3 txt-bx">
            <Form.Label className="pname ">UPLOAD IMAGE</Form.Label>

            <input type="file" name="image" accept=".png, .jpg, .jpeg" onChange={handleFileChange} />
            {fileError && <span style={{ color: 'red' }}>{fileError}</span>}

            {/* Image preview */}
            {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />}
          </Form.Group>
          <div style={{ textAlign: 'center' }}>
            <Button variant="primary" className="btnp mt-1" onClick={formvalidate} >ADD-ITEM</Button>
            <div className="arrow-pos">
              <Link to="/products"><i className="fa-solid fa-circle-arrow-left arr"></i></Link>
            </div>
          </div>
        </Form>
      </Container>
    </>
  );

}
export default Addproduct;