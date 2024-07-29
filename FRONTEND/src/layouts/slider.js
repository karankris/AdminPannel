import { Link } from "react-router-dom";
import React from "react"
function slide()
{
    return(
            <div className="border-end side-bg" id="sidebar-wrapper">
                <div className="sidebar-heading side-bg border-bottom" style={{color:"white", fontWeight:'normal',fontSize:"25px", fontFamily:"Raleway', sans-serif"}}><span className="blink">Nova</span> Admin</div>
                <div className="list-group list-group-flush ">        
                  <Link  className="list-clr list-group-item list-group-item-action list-group-item p-3"to="/">Dashboard</Link>
                  <Link  className="list-clr list-group-item list-group-item-action list-group-item p-3"to="/products">Products</Link>
                  <Link  className="list-clr list-group-item list-group-item-action list-group-item p-3"to="/users">Users</Link>
                  <Link  className="list-clr list-group-item list-group-item-action list-group-item p-3"to="/vendor">Vendors</Link>
          
                </div>
                </div>

                )
        }
        export default slide;