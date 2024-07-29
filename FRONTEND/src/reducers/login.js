const initialState ={
    isAuth:false,
    status:false
}
const LoginReducer = (state = initialState,action)=>{
    console.log(action);
    switch(action.type)
    {
        case "ADD_LOGIN":
            return{...state,status:true}
      default:
          return state;
  }
};
export default LoginReducer;