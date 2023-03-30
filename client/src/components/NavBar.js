import { NavLink } from "react-router-dom";
import React from "react";

function NavBar({ setDarkMode }) {

return(
    <div className="navigation">
        <NavLink to="/create_res">Make Reservations</NavLink>
        <NavLink to="/Events">Upcoming Events</NavLink>
        <NavLink to="/SpecialPkgs">Special Packages</NavLink>
        <NavLink to="/BoatsList">Our Boat Inventory</NavLink>
        <NavLink to="/ContactPage">Contact Information</NavLink>
        <button  id="darkMode"
                 onClick={ (e) => {
            // sets a class on the whole body, so the *entire* page has dark mode
            document.querySelector('body').classList.toggle('darkMode')
            (setDarkMode(prev => !prev))
        }}     
             >Dark Mode</button>
     </div>
    )
}

export default NavBar;