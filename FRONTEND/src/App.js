import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";
import  Navbar from './layouts/navbar'
import Slider from './layouts/slider'
import Dashboard from "./dashboard";
import Product from "./products";
import Addproduct from './products/addproducts'
import Users from './users'
import AddUsers from './users/addusers'
import Vendor from "./vendors";
import Addvendor from "./vendors/addvendor";
import LoginForm from "./login";   
import SignupForm from "./signup";
// const authToken = (localStorage.getItem('authToken')); //get token
function App() {
  const [authtoken, setAuthToken] = useState(localStorage.getItem('authToken'));
  useEffect(() => {
    // Check and update the token on every render
    setAuthToken(localStorage.getItem('authToken'));
  }, []);
  return (
    <BrowserRouter>
      {!authtoken || authtoken == null ? (
        <Routes>
           <Route path="/" element={<LoginForm/>}/>
           <Route path="/signup" element={<SignupForm/>}/>
        </Routes>
      ) : (
        <div className="d-flex" id="wrapper">
          <Slider/>
          <div id="page-content-wrapper">
            <Navbar />
            <Routes>
            <Route path="/" element={<Dashboard/>}>
        </Route>
        <Route path="products" element={<Product/>}>
        </Route>
        <Route path="users" element={<Users/>}>
        </Route>
        <Route path="addproducts" element={<Addproduct/>}>
        </Route>
        <Route path="addusers" element={<AddUsers/>}>
        </Route>
        <Route path="vendor" element={<Vendor/>}>
        </Route>
        <Route path="addvendor" element={<Addvendor/>}>
        </Route>
    
            </Routes>
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;

