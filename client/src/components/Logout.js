import { useHistory } from "react-router-dom";

function Logout() {
  const history = useHistory();

  function handleLogout() {
    const API = "/logout";
    const API_OPT = {
        method: 'DELETE'
    };

    fetch(API, API_OPT);
    history.push("/");
  }

  return (<input className="button" 
                 type="button"
                 name="logout" 
                 value="Log Out"
                 onClick={handleLogout} />)
}
export default Logout;
