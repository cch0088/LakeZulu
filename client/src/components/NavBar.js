
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import React from "react";

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