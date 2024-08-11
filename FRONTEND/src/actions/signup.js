import axios from "axios";
export const AC_ADD_ADMIN =(loginData) =>{
    console.log('-------',loginData);
    return (dispatch) => {
        axios.post('https://adminpannel.onrender.com/auth/register',loginData)
          .then((response) => {            
            dispatch({type:"ADD_ADMIN",payload:response});
            // console.log("------",response);
          })
          .catch((error) => {
            // dispatch(error.message);// it will show error message on screen when API not hit by post
             console.log('--------',error);
          });
        }
}; 