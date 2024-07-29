import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, FormGroup } from "react-bootstrap";
import { AC_ADD_ADMIN } from './actions/signup';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
// import { Link } from "react-router-dom";
const SignupForm = ({ onSignup = () => {} }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpass: '',
    
  });

  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    cpass: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
  
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error when the user starts typing
  };

  const validateInput = () => {
    const nameRegex = /^[a-zA-Z\s]{4,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z0-9]).{8,}$/;

    const isNameValid = nameRegex.test(formData.name);
    const isEmailValid = emailRegex.test(formData.email);
    const isPasswordValid = passwordRegex.test(formData.password);
    const isConfirmValid = formData.cpass === formData.password;

    const nameError = isNameValid ? '' : errors.name || 'Name is empty or invalid';
    const emailError = isEmailValid ? '' : errors.email || 'Email is empty or invalid';
    const passwordError = isPasswordValid ? '' : errors.password || 'Password is empty or invalid';
    const cpassError = isConfirmValid ? '' : errors.cpass || 'Confirm Password does not match';

    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      cpass: cpassError,
    });

    const isValid = isNameValid && isEmailValid && isPasswordValid && isConfirmValid;
    setIsValid(isValid);
   
if(isValid)
{
  let adminData = {name:formData.name,email:formData.email,password:formData.password}
  dispatch(AC_ADD_ADMIN(adminData));

}
    return isValid;
  };
  // let email = email;
  // let password =password;
  const handleSubmit = (e) => {
    e.preventDefault();
   
    const isValidInput = validateInput();
    if (isValidInput) {
      swal({
        title: "Sign up success Go back to Login!",
        icon: "success",
        button: "Proceed!",
      
      })
      localStorage.setItem('auth', true);
      localStorage.setItem("User", formData.name);
      window.location.href='/'
      onSignup();
    } else {
      localStorage.setItem('auth', false);
      
    }
   
  };
 

  return (
    <Container className="form-siz"  data-aos="fade-down" data-aos-duration="1000">  
         <Form className="form-design user-bx">
           <iframe src="https://giphy.com/embed/Q7xOBMP7DcOdxSRAsi" width="100" height="100" className="giphy-embed gif_des disabled"></iframe>
         <Form.Label className="pname mt-3" style={{fontSize:"xx-large"}}>SIGN UP</Form.Label>
      <Form.Group className="mb-3 txt-bx"> 
      <Form.Label className="pname" >USER NAME</Form.Label>
        <input type="text" name="name" value={formData.name} placeholder='Enter your name' onChange={handleInputChange} className="txt" required />
        <span style={{ color: 'red' }}  className="err" >{errors.name}</span>
        </Form.Group>
        <Form.Group className="mb-3 txt-bx"> 
      <Form.Label className="pname">EMAIL ID</Form.Label>
      <input type="email" name="email" value={formData.email} placeholder='Enter your Email' onChange={handleInputChange}  className="txt"  required />
        <span style={{ color: 'red' }} className="err">{errors.email}</span>
        </Form.Group>
        <Form.Group className="mb-3 txt-bx"> 
      <Form.Label className="pname">PASSWORD</Form.Label>
        <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} placeholder='Enter your Password' onChange={handleInputChange}  className="txt"  required /> <i id="eye" className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} eye-icon`} onClick={toggleShowPassword}></i>
        <span style={{ color: 'red' }}  className="err" >{errors.password}</span>
        </Form.Group>
        <Form.Group className="mb-3 txt-bx">
      <Form.Label className="pname">CONFIRM PASSWORD</Form.Label>
        <input type="password" name="cpass" value={formData.cpass} onChange={handleInputChange} placeholder='Confirm Password' className="txt"  required />
        <span style={{ color: 'red' }} className="err" >{errors.cpass}</span>
        </Form.Group>
      <Button type="submit" className='btnp px-5 py-2 mt-3' onClick={handleSubmit}>Sign Up</Button>
      <p className='py-4'>
      Already have an account?<Link to="/" className='text-decoration-none'> Login</Link>
      </p>
    </Form>
    </Container>
  );
};

export default SignupForm