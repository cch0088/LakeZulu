
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import React from "react";


// #horz-list ul {
//     margin: 50;
//     padding: 0;
//     list-style-type: none;
//     text-align: center;
//   }
  
//   #horz-list ul li {
//     display: inline;
//     padding: 30px;
//     color: white;
//     font-weight: bold;
//   }

const linkStyles = {
  display: "inline-block",
  width: "50px",
  padding: "12px",
  margin: "0 6px 6px",
  textDecoration: "none",
  color: "black",
  textAlign: "center",
  fontWeight: "bold",
  padding: "30px",
  background: "white",
};

function NavBar() {

return(
    <div className="horz-list">
        <NavLink to="/home" exact style={linkStyles}>Home</NavLink>
        <NavLink to="/menu" exact style={linkStyles}>Menu</NavLink>
        <NavLink to="/options" exact style={linkStyles}>Builder</NavLink>
        <NavLink to="/about" exact style={linkStyles} activeStyle={{background: "white"}}>Contact</NavLink>
        <NavLink to ='/orders' exact style={linkStyles}>Orders</NavLink>
     </div>
    )
}
export default NavBar;