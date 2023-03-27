import React from "react";
import Login from "./Login"

function Reserve({check_user}) {
  if (check_user)
  {
      const username = Object.values(check_user)[1]

      return (
          <div className="content">
              Welcome back {username}! Please pick a day to get started.
          </div>
      )
  }
  else
  {
      return <Login />
  }
}
export default Reserve;
