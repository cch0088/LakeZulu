import React from "react";
import { useHistory } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout"

function Reservations({check_user}) {
    if (check_user)
    {
        const username = Object.values(check_user)[1]

        return (
            <div className="content">
                Welcome back {username}!
                <ReserveButton />
                <ViewButton />
                <Logout />
            </div>
        )
    }
    else
    {
        return <Login />
    }
}
export default Reservations;

function ReserveButton() {
    const history = useHistory();
  
    function handleClick() {
      history.push("/new_res")
    }
  
    return (<input className="button" type="button" name="reserve" value="New Reservation" onClick={handleClick} />)
}

function ViewButton() {
    const history = useHistory();
  
    function handleClick() {
      history.push("/view_res")
    }
  
    return (<input className="button" type="button" name="view" value="View Reservations" onClick={handleClick} />)
}
