import React, { useState } from 'react';
// import Navbar from 'react-bootstrap/Navbar';
import swal from 'sweetalert';
function Nav()
{
    const [isToggled, setIsToggled] = useState(false);
    const click = () => {
        const sidebarToggle = document.body.querySelector('#sidebar-wrapper');// without using event
        if (sidebarToggle) {
            // event.preventDefault(); // with using event 
            sidebarToggle.click(); 
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
            setIsToggled(!isToggled); // Toggle the state
        }
    };
    const authuser = {'authorization':localStorage.getItem('token')}
const logout=()=>{
    swal({
        title: "Are you sure?",
        text: "Do you need to logout!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willlogout) => {
        if (willlogout) {
        //   localStorage.setItem('auth',false)//without using token (true || false)
        localStorage.removeItem("authToken"); // using auth token Jwt token more security
        window.location.href='/'
        }
      });
}
// Set Name for both Login and SignUp
var User = localStorage.getItem('User');
    return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom nav-clr" style={{height:"4.1rem"}}>
    <div className="container-fluid">
    <i
          className={`fa fa-solid font_Fam ${isToggled ? 'fa-backward' : 'fa-forward'}`}
          onClick={click} id="sidebarToggle"></i>    
    {/* <i className="fa-solid fa-backward back"id="sidebarToggle" onClick={click}></i> */}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon nav_icon"></span></button>
    <div className="collapse navbar-collapse nav_c rounded px-5" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0 ">
            <li className="nav-item active me-3 "><a className="nav-link l-clr" href="#!"><i className="fa-solid fa-house"></i> Home</a></li>
            <li className="nav-item"><a className="nav-link me-3 l-clr" href="#!"><i className="fa-solid fa-user profile lgo"></i> {User} </a></li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle me-3 l-clr" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Services</a>
                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#!">Users</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#!">Products</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#!">Vendors</a>
                </div>
            </li>
            <li className="nav-item active me-3" style={{cursor:'pointer'}}><a className="nav-link l-clr" onClick={logout}><i className="fa-solid fa-right-from-bracket "></i> Signout</a></li>
        </ul>
    </div>
</div>
</nav>
    )
}
export default  Nav;
