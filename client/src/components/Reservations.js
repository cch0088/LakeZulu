import React from "react";
import { useHistory } from "react-router-dom";

function Reservations({user}) {
    return (
        <div className="content">
            Welcome back {user.username}!
            <ReserveButton />
            <ViewButton />
            <LogoutButton />
        </div>)
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

function LogoutButton() {
    const history = useHistory();

    function handleLogout() {
      const API = "/logout";
      const API_OPT = {
          method: 'DELETE'
      };
  
      fetch(API, API_OPT).then(history.push("/"));
    }
  
    return (<input className="button" type="button" name="logout" value="Log Out" onClick={handleLogout} />)
  }
