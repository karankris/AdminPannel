import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { AC_ADD_USER } from "../actions/users";
import { Link ,useNavigate} from "react-router-dom";
import swal from 'sweetalert';
function Adduser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // User Name
  const [user_name, setUser_name] = useState("");
  const [usernameerr, setUsernameerr] = useState(false)
  //Email
  const [email, setEmail] = useState("");
  const [mailerr, setMailerr] = useState(false)
  //Phone no
  const [phone, setPhone] = useState("");
  const [pherr, setPherr] = useState(false)
  // image
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const userauth = (event) => {
    let value = event.target.value;
    let id = event.target.id;
    let mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
   
    if (id == 'user_name') {
      if (value.length >= 3) {
        setUser_name(value)
        setUsernameerr(false)
      }
      else {
        setUser_name(value)
        setUsernameerr(true)
      }
    }

    if (id == 'email') {
      if (mailPattern.test(email) == true) {
        setEmail(value)
        setMailerr(false)
      }
      else {
        setEmail(value)
        setMailerr(true)
      }
    }
    if (id == 'phone') {
      setPhone(value)
      setPherr(false)
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
  const uservalidate = () => {

    let mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let Ph = /^\d{10}$/;
    var u_flag = 0;
    var m_flag = 0;
    var p_flag = 0;
    var i_flag = 0;
    let user = user_name;
    let Mailid = email;
    let Mobile = phone;
   
    if (user.length >= 3) {
      setUsernameerr(false)
      u_flag = 1;
    }
    else {
      setUsernameerr(true)
    }
    if (mailPattern.test(Mailid) == true) {
      setMailerr(false)
      m_flag = 1;
    }
    else {
      setMailerr(true)
    }
    if (Ph.test(Mobile) == true) {
      setPherr(false)
      p_flag = 1;
    }
    else {
      setPherr(true)
    }
    if (!selectedFile) {
      setFileError('Please select a file.');
      i_flag = 0;
    }
    else{
      i_flag = 1;
    }

    console.log("meta img",selectedFile);
    if (u_flag == 1 && m_flag == 1 && p_flag == 1 && i_flag == 1) {
      let userData = { user: user_name, mailid: email, mobile: phone, image:selectedFile}
      dispatch(AC_ADD_USER(userData));
      swal("User added Successfully!", "Success!", "success");
      navigate("/users");
    }
  }
  

  return (
    <>
      <Container className="form-siz ">
        <Form action="/addUser" className="form-design user-bx" data-aos="fade-left" data-aos-duration="1000">
          <Form.Group className="mb-3 txt-bx">
            <Form.Label className="pname">USER NAME</Form.Label>
            <input type="text" placeholder="Enter User Name" value={user_name} id="user_name" onChange={userauth} className="txt" />
            {usernameerr ? <Form.Label style={{ color: 'red' }} className="err" onChange={userauth}>*Enter the user name </Form.Label> : ""}
          </Form.Group>
          <Form.Group className="mb-3 txt-bx">
            <Form.Label className="pname">EMAIL ID</Form.Label>
            <input type="text" id="email" value={email} onChange={userauth} className="txt" placeholder="Enter User Email" />
            {mailerr ? <Form.Label style={{ color: 'red' }} className="err" onChange={userauth}>
              *Enter the valid email. </Form.Label> : ""}
          </Form.Group>
          <Form.Group className="mb-3 txt-bx">
            <Form.Label className="pname ">MOBILE</Form.Label>

            <input type="text" id="phone" value={phone} onChange={userauth} className="txt" placeholder="Enter User MobileNo" />
            {pherr ? <Form.Label style={{ color: 'red' }} className="err" onChange={userauth}>*Enter the valid Mobile number</Form.Label> : ""}
          </Form.Group>

          <Form.Group className="mb-3 txt-bx">
            <Form.Label className="pname ">UPLOAD IMAGE</Form.Label>

            <input type="file" name="image" accept=".png, .jpg, .jpeg" onChange={handleFileChange} />
        {fileError && <span style={{ color: 'red' }}>{fileError}</span>}

        {/* Image preview */}
        {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />}
          </Form.Group>

          <div style={{ textAlign: 'center' }}>
            <Button variant="primary" className="btnp mt-1" onClick={uservalidate} >Add User</Button>
          </div>
          <div className="arrow-pos">
            <Link to="/users"><i className="fa-solid fa-circle-arrow-left arr"></i></Link>
          </div>
        </Form>

      </Container>
    </>
  );

}
export default Adduser;