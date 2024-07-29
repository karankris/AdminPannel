import { combineReducers } from "redux";
import ProductReducer from "./reducers/products";
import UserReducer from "./reducers/users";
import VendorReducer from "./reducers/vendor";
import SignupReducer from "./reducers/signup";
import LoginReducer from "./reducers/login";
const  rootReducers = combineReducers({
     ProductState : ProductReducer,   
     UserState : UserReducer,
     VendorState:VendorReducer,
     LoginState:LoginReducer,
     SignupState:SignupReducer
});
 
export default rootReducers;