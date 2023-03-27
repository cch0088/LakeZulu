import React from "react";
import Login from "./Login"

function Reserve({check_user}) {
  if (check_user)
  {
      const username = Object.values(check_user)[1]

      return (
          <div className="content">
            Reserve
              Welcome back {username}!
          </div>
      )
  }
  else
  {
      return <Login />
  }
}
export default Reserve;
