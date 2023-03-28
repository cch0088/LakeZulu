import React from "react";
import Login from "./Login"

function Reserve({check_user}) {
  if (check_user)
  {
    const username = Object.values(check_user)[1]
    
    const API = "/times";

    fetch(API).then(resp => resp.json())
    .then(data => {
      for (let record of data) {
        console.log(record['day']);
        console.log(record['hour']);
        console.log(record['boats']);
      }
    });
    
    return (
      <div className="content">
        Welcome back {username}! The following days are available at this time:
      </div>
    )
  }
  else
  {
      return <Login />
  }
}
export default Reserve;
