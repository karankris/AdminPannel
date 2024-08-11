import axios from "axios";
export const AC_ADD_VENDOR =(vendorData) =>{
    console.log('-------',vendorData);
    return (dispatch) => {
        axios.post('https://adminpannel.onrender.com/vendors/addVendor',vendorData)
          .then((response) => {            
            dispatch({type:"ADD_VENDOR",payload:response});
            // console.log("------",response);
          })
          .catch((error) => {
            // dispatch(error.message);// it will show error message on screen when API not hit by post
             console.log('--------',error);
          });
        }
};