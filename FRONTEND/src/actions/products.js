import axios from 'axios';
export const AC_ADD_PRODUCT =(productdata)  => {
  return (dispatch) => {
    const formData = new FormData();
    formData.append('name', productdata.name);
    formData.append('discription', productdata.discription);
    formData.append('cost', productdata.cost);
    formData.append('stocks', productdata.stocks);
    formData.append('image', productdata.image);

    axios.post('https://adminpannel.onrender.com/products/addProduct',formData)
      .then((response) => {
        dispatch({type:"ADD_PRODUCT",payload:response.data});
        console.log("------", response.data);
      })
      .catch((error) => {
        // Handle error
        console.log('--------', error);
      });
  };
};