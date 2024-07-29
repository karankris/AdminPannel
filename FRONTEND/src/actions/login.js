// import axios from "axios";
// import swal from 'sweetalert';
// export const AC_ADD_LOGIN =(loginDetails) =>{
//     console.log('-------',loginDetails);
//     return (dispatch) => {
//         axios.post('http://localhost:3001/auth/login',loginDetails)
//           .then((response) => {            
//             // dispatch({type:"ADD_LOGIN",payload:response});
//             console.log("------",response.data);
//             if(response.data.status)
//             {
//               localStorage.setItem('isauth',response.data.token)
               
//               .then(()=>
//               {
//                  window.location.href="/"
//               });
//             }
//             else{
//               swal("error".response.data.message,"warning")
//               then(()=>
//               {
//                 localStorage.setItem('isauth',false)
//               })
//             }
//           })
//           .catch((error) => {
//             // dispatch(error.message);// it will show error message on screen when API not hit by post
//              console.log('--------',error);
//           });
//         }
        
// }; 