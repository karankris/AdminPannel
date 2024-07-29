import React ,{ useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import {AC_ADD_VENDOR} from "../actions/vendor";
import { Link,useNavigate } from "react-router-dom";
import swal from 'sweetalert';
function Addvendor()
{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // vendor Name
    const[vendor_name,setVendor_name]=useState("");
    const[vendornameerr,setVendornameerr] =useState(false)
  //vendor_mail
    const[vendor_mail,setVendor_mail]=useState("");
    const[vendormailerr,setVendormailerr] =useState(false)
  //vendor_phone no
    const[vendor_phone,setVendor_phone]=useState("");
    const[vendorpherr,setVendorpherr] =useState(false)
    
    const  vendorauth=(event)=>{
         let value = event.target.value;
         let id =event.target.id;
         let mailPattern= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
       if(id == 'vendor_name')
       {
         if(value.length>=3)
        {
          setVendor_name(value)
         setVendornameerr(false)
        }
        else{       
         setVendor_name(value)
         setVendornameerr(true)
        }
      }
   
      if(id=='vendor_mail')
      {
        if(mailPattern.test(vendor_mail)==true)
        {
            setVendor_mail(value)
            setVendormailerr(false)
        }
        else{
            setVendor_mail(value)
            setVendormailerr(true)
        }
      }
      if(id=='vendor_phone')
      {
          setVendor_phone(value)
          setVendorpherr(false)
      }     
    }

    const vendorvalidate=()=>
    {
      let mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
      let Ph =/^\d{10}$/;
        var u_flag=0;
        var m_flag=0;
        var p_flag=0;
        let vendor = vendor_name;
        let Mailid = vendor_mail; 
        let Mobile = vendor_phone;
         if(vendor.length>=3)
         {
            setVendornameerr(false)
            u_flag=1;
         }
         else{
            setVendornameerr(true)
         }
         if(mailPattern.test(Mailid)==true)
         {
            setVendormailerr(false)
            m_flag=1;
         }
         else{
            setVendormailerr(true)
         }
         if(Ph.test(Mobile)==true)
         {
          setVendorpherr(false)
          p_flag=1;
         }
         else{
          setVendorpherr(true)
         }
         if(u_flag==1 && m_flag==1 && p_flag==1){
          let vendorData = {v_name:vendor_name,vendor_mailid:vendor_mail,vendor_mobile:vendor_phone}
          dispatch(AC_ADD_VENDOR(vendorData));
          swal("Vendor added Successfully!", "Success!", "success");
          navigate("/vendor")
        }
    }

   return(
    <>
    <Container className="form-siz ">
 
<Form className="form-design vendor-bx" data-aos="fade-left" data-aos-duration="1000">

      <Form.Group className="mb-3 txt-bx">
        
        <Form.Label className="pname">VENDOR NAME</Form.Label>
        <input type="text" placeholder="Enter Vendor Name" value={vendor_name} id="vendor_name" onChange={vendorauth} className="txt"/>
        {vendornameerr ?<Form.Label style={{color:'red'}} className="err" onChange={vendorauth}>*Enter the vendor name </Form.Label>:""}
      </Form.Group>
      <Form.Group className="mb-3 txt-bx">
        <Form.Label className="pname">Vendor_mail ID</Form.Label>
        <input type="text" id="vendor_mail" value={vendor_mail} onChange={vendorauth} className="txt" placeholder="Enter vendor email" />
        {vendormailerr ?<Form.Label style={{color:'red'}} className="err" onChange={vendorauth}> 
                 *Enter the valid mail. </Form.Label>:""}
      </Form.Group>
      <Form.Group className="mb-3 txt-bx">
        <Form.Label className="pname ">MOBILE</Form.Label>
        <input type="text" id="vendor_phone" value={vendor_phone} onChange={vendorauth} className="txt" placeholder="Enter vendor MobileNo" />
        {vendorpherr ?<Form.Label style={{color:'red'}} className="err" onChange={vendorauth}>*Enter the valid Mobile number</Form.Label>:""}
      </Form.Group>
      <div style={{textAlign:'center'}}>
      <Button variant="primary" className="btnp mt-1"  onClick={vendorvalidate} >Add vendor</Button>
      </div>
      <div className="arrow-pos">
          <Link to= "/vendor"><i className="fa-solid fa-circle-arrow-left arr"></i></Link>
        </div>
    </Form>
    </Container>
    </>
   );

}
export default Addvendor;