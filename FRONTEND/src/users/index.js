import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
// import { useSelector } from 'react-redux';

function User() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState({
    user_name: '',
    mail: '',
    phone: '',
    image: null , // New field for editing image
  });
  const authuser = { 'authorization': localStorage.getItem('authToken') };

  useEffect(() => {
    axios.get('http://localhost:3001/users', { headers: authuser }) // user auth
      .then(function (response) {
        setUsers(response.data.userData);
        console.log("get meth",response);
      })
      .catch(function (error) {
        console.log("get error",error);
        
      });
  }, []);

  // Function to handle user deletion
  const handleDelete = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this user data?",
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
            const response = await axios.delete(`http://localhost:3001/users/deleteUser/${id}`, { headers: authuser });
            if (response.status === 204) {
              // Remove the deleted user from the state
              setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
              swal("Deleted!", "User deleted!", "success");
            }
          } catch (error) {
            console.log(error);
            swal("Error", "An error occurred while deleting the user.", "error");
          }
        } else {
          swal("Cancelled", "User not deleted!", "info");
        }
      });
  };

  // Function to handle user editing
  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditUser({
      user_name: user.user_name,
      mail: user.mail,
      phone: user.phone,
      image: user.image,
    });
    setShowModal(true);
  };

  // Function to handle changes in the modal form
  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };



  // Function to handle submitting the updated user data
  const handleModalSave = async () => {
    try {
      const formData = new FormData();

      // Append non-empty values to the FormData object
      if (editUser.user_name.trim() !== '') {
        formData.append('user_name',editUser.user_name);
      }
      if (editUser.mail.trim() !== '') {
        formData.append('mail', editUser.mail);
      }
      if (!isNaN(editUser.phone)) {
        formData.append('phone', editUser.phone);
      }
  

      // Append the new image file if it's selected
      if (editUser.image instanceof File) {
        formData.append('image', editUser.image);
      }

      const response = await axios.put(`http://localhost:3001/users/updateUser/${selectedUser._id}`, formData, { headers: authuser });
       
      if (response.status === 200) {
        // Update the user in the state
        setUsers(prevUsers => prevUsers.map(user => {
          return user._id === selectedUser._id ? response.data.updatedUser : user;
        }));
        axios.get('http://localhost:3001/users', { headers: authuser }) // user auth
        .then(function (response) {
          setUsers(response.data.userData);
          console.log("get meth",response);
        })
        .catch(function (error) {
          console.log("get error",error);
          
        });
        swal("Updated!", "User details updated!", "success");
        setShowModal(false);
        setSelectedUser(null);
      }
    } catch (error) {
      console.error(error);
      swal("Error", "An error occurred while updating the user.", "error");
    }
  };
// -------------- Additional file changes---------------------
// Function to handle file changes in the modal form
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
      setEditUser({ ...editUser, image: file});
  }
};
const [searchTerm, setSearchTerm] = useState('');

const handleSearchChange = (e) => {
  setSearchTerm(e.target.value); 
};
    // Filter vendors based on the search term
    const filtered = users.filter((users) =>{
    return(
      users.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      users.mail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      users.phone.toString().toLowerCase().includes(searchTerm.toLowerCase()) 
    );
    });
  return (
    <>
      <div data-aos="fade-up" data-aos-duration="2000">
        <h1 style={{ color: "black", fontFamily: "poppins, sans-serif", fontSize: "xx-large", fontWeight: "bold" }} className="mt-3 text-center">USERS</h1>
              {/* Search bar */}
              <div className="d-flex align-items-center justify-content-sm-end justify-content-center me-md-5 mt-3">
           <i class="fa-solid fa-magnifying-glass me-2 fs-3 mb-1"></i> <input
          type="text"
          placeholder="Search user"
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
              <th>USER NAME</th>
              <th>MAIL ID</th>
              <th>MOBILE</th>
              <th>USER ID PROOF</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {!users || filtered.length === 0 ? (
              <tr>
                <td colSpan="6">No user found!!</td>
                <td style={{ display: "none" }}>{localStorage.setItem('Ucount', 0)}</td>
              </tr>
            ) : (
              filtered.map((user, i) => (
                <tr key={user._id}>
                  <td>{i + 1}</td>
                  <td>{user.user_name}</td>
                  <td>{user.mail}</td>
                  <td>{user.phone}</td>
                  <td>
                {user.image && (
                  <img
                    src={user.image}
                    alt="User"
                    style={{ maxWidth: '120px', maxHeight: '90px'}}
                  />
                )}
              </td>
                  <td>
                    <Button className="me-2 opt_btne px-4 py-2 mt-xl-0 mt-2 " variant="primary" onClick={() => handleEdit(user)}>Edit</Button>{' '}
                    <Button variant="danger opt_btnd px-3 py-2 mt-xl-0 mt-2" onClick={() => handleDelete(user._id)}>Delete</Button>
                  </td>
                  {localStorage.setItem('Ucount', i + 1)} {/* Increment the count for each user */}
                </tr>
              ))
            )}
          </tbody>
        </Table>

        {/* Edit user modal */}
        {editUser && (
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formUserName">
                  <Form.Label>User Name</Form.Label>
                  <input
                    className="txt"
                    type="text"
                    placeholder="Enter user name"
                    name="user_name"
                    value={editUser.user_name}
                    onChange={handleModalChange}
                  />
                </Form.Group>
                <Form.Group controlId="formUserMail">
                  <Form.Label>Mail ID</Form.Label>
                  <input
                    className="txt"
                    type="email"
                    placeholder="Enter mail id"
                    name="mail"
                    value={editUser.mail}
                    onChange={handleModalChange}
                  />
                </Form.Group>
                <Form.Group controlId="formUserPhone">
                  <Form.Label>Mobile</Form.Label>
                  <input
                    className="txt"
                    type="text"
                    placeholder="Enter mobile"
                    name="phone"
                    value={editUser.phone}
                    onChange={handleModalChange}
                  />
                </Form.Group>
                <Form.Group controlId="formUserImage">
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
          <Link to="/addusers" style={{ textDecoration: 'none' }} className="me-4 mt-5 adpbtn">ADD USER</Link>
        </div>
      </div>
    </>
  );
}

export default User;
