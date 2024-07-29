import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';


function Product() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState({
    name: '',
    discription: '',
    stocks: '',
    cost: '',
    image: '', // Updated field name to 'image'
  });
  const authuser = { 'authorization': localStorage.getItem('authToken') };

  useEffect(() => {
    axios.get('http://localhost:3001/products', { headers: authuser })
      .then(function (response) {
        setProducts(response.data.productData);
        console.log("get meth", response);
      })
      .catch(function (error) {
        console.log("get error", error);
      });
  }, []);

  const handleDelete = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this product data?",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: "Cancel",
        confirm: {
          text: "OK",
          value: true,
          visible: true,
          className: "btn-danger",
        },
      },
    })
      .then(async (userConfirmed) => {
        if (userConfirmed) {
          try {
            const response = await axios.delete(`http://localhost:3001/products/deleteProduct/${id}`, { headers: authuser });
            if (response.status === 204) {
              setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
              swal("Deleted!", "Product deleted!", "success");
            }
          } catch (error) {
            console.log(error);
            swal("Error", "An error occurred while deleting the product.", "error");
          }
        } else {
          swal("Cancelled", "Product not deleted!", "info");
        }
      });
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditProduct({
      name: product.p_name,
      discription: product.p_discription,
      stocks: product.p_stocks,
      cost: product.p_price,
      image: product.image,
    });
    setShowModal(true);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  const handleModalSave = async () => {
    try {
      const formData = new FormData();
      // Append non-empty values to the FormData object
      if (editProduct.name.trim() !== '') {
        formData.append('name', editProduct.name);
      }
      if (editProduct.discription.trim() !== '') {
        formData.append('discription', editProduct.discription);
      }
      if (!isNaN(editProduct.cost)) {
        formData.append('cost', editProduct.cost);
      }
      if (!isNaN(editProduct.stocks)) {
        formData.append('stocks', editProduct.stocks);
      }
      // Append the new image file if it's selected
      if (editProduct.image instanceof File) {
        formData.append('image', editProduct.image);
      }

      const response = await axios.put(`http://localhost:3001/products/updateProduct/${selectedProduct._id}`, formData, { headers: authuser });

      if (response.status === 200) {
        setProducts(prevProducts => prevProducts.map(product => {
          return product._id === selectedProduct._id ? response.data.updatedProduct : product;
        }));
        axios.get('http://localhost:3001/products', { headers: authuser })
          .then(function (response) {
            setProducts(response.data.productData);
            console.log("get meth", response);
          })
          .catch(function (error) {
            console.log("get error", error);
          });
        swal("Updated!", "Product details updated!", "success");
        setShowModal(false);
        setSelectedProduct(null);
      }
    } catch (error) {
      console.error(error);
      swal("Error", "An error occurred while updating the product.", "error");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditProduct({ ...editProduct, image: file });
    }
  };
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filtered = products.filter((product) => {
    return (
      product.p_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.p_discription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.p_stocks.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.p_price.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const [showFullDescriptions, setShowFullDescriptions] = useState({});
 
    const toggleDescription = (productId) => {
      setShowFullDescriptions((prevDescriptions) => ({
        ...prevDescriptions,
        [productId]: !prevDescriptions[productId],
      }));
    }
  

  return (
    <>
      <div data-aos="fade-up" data-aos-duration="2000">
        <h1 style={{ color: "black", fontFamily: "poppins, sans-serif", fontSize: "xx-large", fontWeight: "bold" }} className="mt-3 text-center">PRODUCTS</h1>
        {/* Search bar */}
        <div className="d-flex align-items-center justify-content-sm-end justify-content-center me-md-5 mt-3">
          <i class="fa-solid fa-magnifying-glass me-2 fs-3 mb-1"></i> <input
            type="text"
            placeholder="Search product"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ marginBottom: '10px' }}
            className="search-box p-2"
          />
        </div>
        <Table responsive striped bordered hover className="mt-4 table_des">
          <thead>
            <tr style={{ background: "black", color: "white", fontFamily: "Roboto, sans-serif" }}>
              <th>ID</th>
              <th>PRODUCT NAME</th>
              <th>DESCRIPTION</th>
              <th>STOCKS</th>
              <th>COST</th>
              <th>IMAGE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {!products || filtered.length === 0 ? (
              <tr>
                <td colSpan="7">No product found!!</td>
                <td style={{ display: "none" }}>{localStorage.setItem('Pcount', 0)}</td>
              </tr>
            ) : (
              filtered.map((product, i) => (
                <tr key={product._id}>
                  <td>{i + 1}</td>
                  <td>{product.p_name}</td>
                  <td>  
                      <>
                        {product.p_discription && (
                          <>
                            {showFullDescriptions[product._id] ? (
                              <div>{product.p_discription}</div>
                            ) : (
                              <div>
                                {`${product.p_discription.slice(0, 40)}${product.p_discription.length > 40 ? '...' : ''}`}
                              </div>
                            )}
                            {product.p_discription.length > 40 && (
                              <span className='view-more' onClick={() => toggleDescription(product._id)}>
                                {showFullDescriptions[product._id] ? (
                                 <i class="fa-solid fa-circle-minus fs-5 py-3"style={{cursor:"pointer"}}></i>
                                ) : (
                                  <i class="fa-solid fa-circle-plus fs-5 py-3"style={{cursor:"pointer"}}></i>
                                )}
                              </span>
                            )}
                          </>
                        )}
                      </>
                    </td>
                  <td>{product.p_stocks}</td>
                  <td>{product.p_price}</td>
                  <td>
                    {product.image && (
                      <img
                        src={product.image}
                        alt="Product"
                        style={{ maxWidth: '120px', maxHeight: '70px' }}
                      />
                    )}
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Button className="me-2 opt_btne px-4 py-2 mt-xl-0 mt-2" variant="primary" onClick={() => handleEdit(product)}>Edit</Button>{' '}
                      <Button variant="danger opt_btnd px-3 py-2 mt-xl-0 mt-2" onClick={() => handleDelete(product._id)}>Delete</Button>
                    </div>
                  </td>
                  {localStorage.setItem('Pcount', i + 1)}
                </tr>
              ))
            )}
          </tbody>
        </Table>

        {/* Edit product modal */}
        {editProduct && (
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formProductName">
                  <Form.Label>Product Name</Form.Label>
                  <input
                    className="txt"
                    type="text"
                    placeholder="Enter product name"
                    name="name"
                    value={editProduct.name}
                    onChange={handleModalChange}
                  />
                </Form.Group>
                <Form.Group controlId="formProductDescription">
                  <Form.Label>Description</Form.Label>
                  <textarea
                    className="txt"
                    placeholder="Enter product description"
                    name="discription"
                    value={editProduct.discription}
                    onChange={handleModalChange}
                  />
                </Form.Group>
                <Form.Group controlId="formProductStocks">
                  <Form.Label>Stocks</Form.Label>
                  <input
                    className="txt"
                    type="text"
                    placeholder="Enter stocks"
                    name="stocks"
                    value={editProduct.stocks}
                    onChange={handleModalChange}
                  />
                </Form.Group>
                <Form.Group controlId="formProductCost">
                  <Form.Label>Cost</Form.Label>
                  <input
                    className="txt"
                    type="text"
                    placeholder="Enter cost"
                    name="cost"
                    value={editProduct.cost}
                    onChange={handleModalChange}
                  />
                </Form.Group>
                <Form.Group controlId="formProductImage">
                  <Form.Label>Image</Form.Label>
                  <input
                    className="txt"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleModalSave}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        <div style={{ textAlign: "center" }} className="mt-5">
          <Link to="/addproducts" style={{ textDecoration: 'none' }} className="me-4 mt-5 adpbtn">ADD PRODUCT</Link>
        </div>
      </div>
    </>
  );
}

export default Product;
