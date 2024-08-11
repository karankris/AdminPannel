import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
// import { Link } from "react-router-dom"; --> doubt error is displayed while using router
//get methord

function LoginForm() {
  // const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [nameerr, setNameerr] = useState(false);
  const [email, setEmail] = useState("");
  const [mailerr, setMailerr] = useState(false);
  const [password, setPassword] = useState("");
  const [passerr, setPasserr] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (event) => {
    let value = event.target.value;
    let id = event.target.id;
  
    if(id==='name')
    {
      if(name.length>=3)
      {
        setName(value);
        setNameerr(false);
      }
      else{
        setName(value);
        setNameerr(true);
      }
    }
    if (id === 'email') {
      setEmail(value);
      setMailerr(false);
    }
    if (id === 'password') {
      setPassword(value);
      setPasserr(false);
    }
  }
const uservalidate = (event) => {
  event.preventDefault()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   const passwordRegex = /^(?=.*[a-zA-Z0-9]).{8,}$/;
   var f_name = name;
   var MailId = email;
   var pass  = password;
   var m_flag =0;
   var p_flag =0;
   var n_flag =0;
   
   if(emailRegex.test(MailId)==true)
   {
      setMailerr(false)
      m_flag=1;
   }
   else{
    setMailerr(true)
   }
   if(passwordRegex.test(pass)==true)
   {
    setPasserr(false)
    p_flag=1;
   }
   else{
    setPasserr(true)
   }
   if(f_name.length>=3)
   {
    n_flag=1;
    setNameerr(false)
   }
   else{
    setNameerr(true)
   }

   if(p_flag==1 && m_flag==1 && n_flag==1)
   {
    let loginDetails ={email:email,password:password}
    axios.post('https://adminpannel.onrender.com/auth/login',loginDetails)
          .then((response) => {            
            // dispatch({type:"ADD_LOGIN",payload:response}); -- no need dispatch here
            console.log("------",response.data);
            if(response.data.status)
            {
              swal({
                title: "Admin Login Success!",
                icon: "success",
                button: "Proceed!",
                message:response.data.message
              })
              localStorage.setItem('authToken',response.data.token)
              localStorage.setItem("User",f_name);
              window.location.href="/"
            }
            else{
              swal("Error",response.data.message, "error")
              .then(()=>
              {    
                localStorage.setItem('auth',false)
              })
            }
          })
          .catch((error) => {
            // swal("Error", "An error occurred while processing your request", "error");
             console.log('--------',error);
          });    
  }
}
  
  return (
    <Container className="form-siz"  data-aos="fade-down" data-aos-duration="1000">  
         <Form className="form-design user-bx">
         <iframe src="https://giphy.com/embed/Q7xOBMP7DcOdxSRAsi" width="100" height="100" className="giphy-embed gif_des disabled"></iframe>
         <Form.Label className="pname mt-3" style={{fontSize:"xx-large"}}>LOGIN</Form.Label>

         <Form.Group className="mb-3 txt-bx"> 
      <Form.Label className="pname">NAME</Form.Label>
      <input type="text" id="name" value={name} placeholder='Enter your Name' onChange={handleInputChange}  className="txt"  required />
      {nameerr ?<Form.Label style={{color:'red'}} className="err" onChange={handleInputChange}> 
                 *Enter the valid name. </Form.Label>:""}
        </Form.Group>
        <Form.Group className="mb-3 txt-bx"> 
      <Form.Label className="pname">EMAIL ID</Form.Label>
      <input type="email" id="email" value={email} placeholder='Enter your Email' onChange={handleInputChange}  className="txt"  required />
      {mailerr ?<Form.Label style={{color:'red'}} className="err" onChange={handleInputChange}> 
                 *Enter the valid email. </Form.Label>:""}
        </Form.Group>
        <Form.Group className="mb-3 txt-bx"> 
    

      <Form.Label className="pname">PASSWORD</Form.Label>
        <input    type={showPassword ? 'text' : 'password'} id="password" value={password} placeholder='Enter your Password' onChange={handleInputChange}  className="txt" required /> <i id="eye" className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} eye-icon`} onClick={toggleShowPassword}></i>
        {passerr ?<Form.Label style={{color:'red'}} className="err" onChange={handleInputChange}> 
                 *Enter the valid password </Form.Label>:""}
          
        </Form.Group>
      <Button type="submit"  className='btnp px-5 py-2 mt-3' onClick={uservalidate}>Log in</Button>
      <p className='py-4'>
        Don't have an account? <Link to="/signup" className='text-decoration-none'>Sign up</Link>
      </p>
    </Form>
      
    </Container>
  );
};

export default LoginForm



