import { NavLink } from "react-router-dom";
import React from "react";

function NavBar() {

return(
    <div className="navigation">
        <NavLink to="/create_res">Reservations</NavLink>
        <NavLink to="/Events">Events</NavLink>
        <NavLink to="/SpecialPkgs">Packages</NavLink>
        <NavLink to="/ContactPage">Contact Us</NavLink>
        <button  id="darkMode"
                 onClick={ (e) => { // sets a class on the whole body, so the *entire* page has dark mode
                                    document.querySelector('body').classList.toggle('darkMode')}}     
                                    >Dark Mode</button>
     </div>
    )
}

export default NavBar;