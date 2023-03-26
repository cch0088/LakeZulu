import { React } from 'react';

function Logout() {
    const API = "/logout";

    const API_OPT = {
        method: 'DELETE'
    };

    fetch(API, API_OPT)

    return (<div className="content"></div>)
}

export default Logout;
