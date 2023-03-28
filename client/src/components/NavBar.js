import { NavLink } from "react-router-dom";
import React from "react";

function NavBar() {

return(
    <div className="navigation">
        <NavLink to="/create_res">Make Reservations</NavLink>
        <NavLink to="/events">Upcoming Events</NavLink>
        <NavLink to="/packages">Special Packages</NavLink>
        <NavLink to="/inventory">Our Boat Inventory</NavLink>
        <NavLink to="/contact_page">Contact Information</NavLink>
     </div>
    )
}

export default NavBar;