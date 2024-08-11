import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
import axios from "axios";

// import { useSelector } from 'react-redux';
function Vendor() {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editVendor, setEditVendor] = useState({
    vendor_name: '',
    vendor_mailid: '',
    vendor_mobile: '',
  });
  const authuser = { 'authorization': localStorage.getItem('authToken') };
  useEffect(() => {
    axios.get('https://adminpannel.onrender.com/vendors',{ headers: authuser })
      .then(function (response) {
        setVendors(response.data.vendorData)
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, [])
  // delete using the function 
  const handleDelete = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this vendor data?",
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
            const response = await axios.delete(`https://adminpannel.onrender.com/vendors/deleteVendor/${id}`);
            if (response.status === 204) {
              // Remove the deleted vendor from the state
              setVendors(prevVendors => prevVendors.filter(vendor => vendor._id !== id));
              swal("Deleted!", "Vendor deleted!", "success");
            }
          } catch (error) {
            console.log(error);
            swal("Error", "An error occurred while deleting the vendor.", "error");
          }
        } else {
          swal("Cancelled", "Vendor not deleted!", "info");
        }
      });
  };

  // update using put api
  const handleEdit = (vendor) => {
    setSelectedVendor(vendor);
    setEditVendor({
        vendor_name : vendor.vendor_name,
        vendor_mailid : vendor.vendor_mailid,
        vendor_mobile : vendor.vendor_mobile
    })
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedVendor(null);
  };

  const handleModalSave = async () => {
    try {
      const response = await axios.put(`https://adminpannel.onrender.com/vendors/updateVendor/${selectedVendor._id}`, {
        vendor_name: editVendor.vendor_name,
        vendor_mailid: editVendor.vendor_mailid,
        vendor_mobile: editVendor.vendor_mobile,
      });

      if (response.status === 200) {
        // Update the vendor in the state
        setVendors(prevVendors => prevVendors.map(vendor => {
          return vendor._id === selectedVendor._id ? response.data.updatedVendor : vendor;
        }));

        swal("Updated!", "Vendor details updated!", "success");
        setShowModal(false);
        setSelectedVendor(null);
      }
    } catch (error) {
      console.error(error);
      swal("Error", "An error occurred while updating the vendor.", "error");
    }
  };
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); 
  };
      // Filter vendors based on the search term
      const filtered = vendors.filter((vendor) =>{
      return(
      vendor.vendor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.vendor_mailid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.vendor_mobile.toString().toLowerCase().includes(searchTerm.toLowerCase()) 
      );
      });

  return (
    <>
      <div data-aos="fade-up" data-aos-duration="2000">
        <h1 style={{ color: "black", fontFamily: "poppins, sans-serif", fontSize: "xx-large", fontWeight: "bold" }} className="mt-3 text-center">VENDORS</h1>

           {/* Search bar */}
           <div className="d-flex align-items-center justify-content-sm-end justify-content-center me-md-5 mt-3">
           <i class="fa-solid fa-magnifying-glass me-2 fs-3 mb-1"></i> <input
          type="text"
          placeholder="Search vendor"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginBottom: '10px' }}
           className="search-box p-2"
        />
         </div>
        <Table responsive striped bordered hover className="mt-4 table_des">
          <thead>
            <tr style={{ background: "black", color: "white", fontFamily: "Roboto, sans-serif" }}>
              <th className="pb-xl-2  pb-3">ID</th>
              <th className="pb-xl-2  pb-3">VENDOR NAME</th>
              <th className="pb-xl-2  pb-3">VENDOR MAIL</th>
              <th className="pb-xl-2  pb-3">VENDOR MOBILE</th>
              <th className="pb-xl-2  pb-3">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" >No vendor found!!</td>
                <td style={{ display: "none" }}>{localStorage.setItem('Vcount', 0)}</td>
              </tr>
            ) : (
              filtered.map((vendor, i) => (
                <tr key={vendor._id}>
                  <td>{i + 1}</td>
                  <td>{vendor.vendor_name}</td>
                  <td>{vendor.vendor_mailid}</td>
                  <td>{vendor.vendor_mobile}</td>
                  <td>

                    <Button className="me-2 opt_btne px-4 py-2 mt-xl-0 mt-2 " variant="primary" onClick={() => handleEdit(vendor)}>Edit</Button>{' '}
                    <Button variant="danger opt_btnd px-3 py-2 mt-xl-0 mt-2" onClick={() => handleDelete(vendor._id)}>Delete</Button>
                  </td>
                  {localStorage.setItem('Vcount', i + 1)} {/* Increment the count for each vendor */}
                </tr>
              ))
            )}
          </tbody>
        </Table>
        {/* Edit vendor table */}
        {editVendor && (
          <Modal show={showModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Vendor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formVendorName">
                  <Form.Label className="pname">Vendor Name</Form.Label>
                  <input
                    className="txt"
                    type="text"
                    placeholder="Enter vendor name"
                    value={editVendor.vendor_name}
                    onChange={(e) => setEditVendor({ ...editVendor, vendor_name: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formVendorMail">
                  <Form.Label className="pname">Vendor Mail</Form.Label>
                  <input
                    className="txt"
                    type="email"
                    placeholder="Enter vendor mail"
                    value={editVendor.vendor_mailid}
                    onChange={(e) => setEditVendor({ ...editVendor, vendor_mailid: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="formVendorMobile">
                  <Form.Label className="pname">Vendor Mobile</Form.Label>
                  <input
                    className="txt"
                    type="text"
                    placeholder="Enter vendor mobile"
                    value={editVendor.vendor_mobile}
                    onChange={(e) => setEditVendor({ ...editVendor, vendor_mobile: e.target.value })}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleModalClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleModalSave}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        <div style={{ textAlign: "center" }} className="mt-5">
          <Link to="/addvendor" style={{ textDecoration: 'none' }} className="me-4 mt-5 adpbtn">ADD VENDOR</Link>
        </div>
      </div>
    </>
  );
}
export default Vendor;


