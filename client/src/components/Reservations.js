import React from "react";
import Login from "./Login";
import Logout from "./Logout"

function Reservations({check_user}) {
    if (check_user)
    {
        return (
            <div className="content">
                Welcome back...
                <Logout />
            </div>
        )
    }
    else
    {
        return (
            <div className="content">
                Greetings! Please sign into our reservation portal to get started. If you don't have an account, you can create one.
                <Login />
             </div>)
    }

}
export default Reservations;
