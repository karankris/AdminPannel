const initialState ={
    isAuth:false,
    status:false
}
const SignupReducer = (state = initialState,action)=>{
    console.log(action);
    switch(action.type)
    {
        case "ADD_ADMIN":
            return{...state,status:true}
      default:
          return state;
  }
};
export default SignupReducer;