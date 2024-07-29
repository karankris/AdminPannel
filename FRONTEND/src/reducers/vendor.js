const initialState ={
    isVendorAuth:false,
    Vstatus:false
}
const VendorReducer = (state = initialState,action)=>{
    console.log(action);
    switch(action.type)
    {
        case "ADD_VENDOR":
            return{...state,Vstatus:true}
      default:
          return state;
  }
};
export default VendorReducer;