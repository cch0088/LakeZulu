import { useState } from 'react';
import React from "react";

function Register() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const API = "http://localhost:5555/registration";
    
    function handleSubmit(event) {
        event.preventDefault();
        
        if (username.length > 0 && password.length > 0)
        {
            setErrors([]);

            const formData = {
                username: username,
                password: password
            };

            const API_OPT = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            };
            
            fetch(API, API_OPT).then(r => r.json())
        }
        else
        {
            setErrors(["Missing password or username!"]);
        }
    }

    function handleUsername(event) {
        setUserName(event.target.value);
    }

    function handlePassword(event) {
        setPassword(event.target.value);
    }

return (
    <div className="content">
        <form onSubmit={handleSubmit}>
            Username:
            <input type="text" name="username" onChange={handleUsername} value={username}/>
            <br />
            <br />
            Password:
            <input type="password" name="password" onChange={handlePassword} value={password}/>
            <br />
            <br />
            <input type="submit" value="Register" />
        </form>

        {
            errors.length > 0
            ? errors.map((error, index) => (<p key={index}>{error}</p>))
            : null
        }
    </div>
    )
}

export default Register;