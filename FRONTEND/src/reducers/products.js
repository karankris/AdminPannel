const initialState ={
    isAuth:false,
    status:false
}
const ProductReducer = (state = initialState,action)=>{
    console.log(action);
    switch(action.type)
    {
        case "ADD_PRODUCT":
            return{...state,status:true}
      default:
          return state;
  }
};
export default ProductReducer;