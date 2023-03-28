import React from "react";
import Login from "./Login"

function View({check_user}) {
  if (check_user)
  {
      const username = Object.values(check_user)[1]

      return (
          <div className="content">
            Current reservations for {username}:
          </div>
      )
  }
  else
  {
      return <Login />
  }
}
export default View;