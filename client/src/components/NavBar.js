import { NavLink } from "react-router-dom";
import React from "react";

function NavBar() {

return(
    <div className="navigation">
        <NavLink to="/create_res">Make Reservations</NavLink>
        <NavLink to="/Events">Upcoming Events</NavLink>
        <NavLink to="/SpecialPkgs">Special Packages</NavLink>
        <NavLink to="/BoatsList">Our Boat Inventory</NavLink>
        <NavLink to="/ContactPage">Contact Information</NavLink>
     </div>
    )
}

export default NavBar;