const initialState ={
    isUserAuth:false,
    Ustatus:false
}
const UserReducer = (state = initialState,action)=>{
    console.log(action);
    switch(action.type)
    {
        case "ADD_USER":
            return{...state,Ustatus:true}
      default:
          return state;
  }
};
export default UserReducer;