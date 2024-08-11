import axios from 'axios';
export const AC_ADD_USER = (userdata) => {
  return (dispatch) => {
    const formData = new FormData();
    formData.append('image', userdata.image);
    formData.append('user', userdata.user);
    formData.append('mailid', userdata.mailid);
    formData.append('mobile', userdata.mobile);

    axios.post('https://adminpannel.onrender.com/users/addUser',formData)  
      .then((response) => {
        dispatch({ type: "ADD_USER", payload: response.data });
        console.log("------", response.data);
      })
      .catch((error) => {
        // Handle error
        console.log('--------', error);
      });
  };
};