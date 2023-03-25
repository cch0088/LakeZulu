import { NavLink } from "react-router-dom";
import React from "react";

function NavBar() {

return(
    <div className="navigation">
        <NavLink to="/about">About</NavLink>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/register">Register</NavLink>
     </div>
    )
}
export default NavBar;