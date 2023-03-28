import { React, useState } from 'react';

function Login() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    
    function handleSubmit(event) {
        let API = "/login";

        if (event.target.name === "register")
        {
            API = "/register";
        }
        
        if (username.length > 0 && password.length > 0)
        {
            setError("");

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
            
            fetch(API, API_OPT)
            .then(resp => resp.json())
            .then(data => {
                for (let key in data)
                {
                    if (key === 'error')
                    {
                        setError(data[key]);
                    }
                    else if (key === 'username')
                    {
                        if (event.target.name === "register")
                        {
                            setError("Thanks for registering. Please log in.")
                        }
                        else
                        {
                            window.location.reload(false);
                        }
                    }
                }
            })
        }
        else
        {
            setError("Missing password or username!");
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
        Greetings! Please sign into our reservation portal to get started. If you don't have an account, you can create one.
        <div className="login-form">
            <form>
                <div className="label">Username:</div>
                <input className="field" type="text" name="username" onChange={handleUsername} value={username}/>
                <div className="label">Password:</div>
                <input className="field" type="password" name="password" onChange={handlePassword} value={password}/>
                <input className="button" type="button" name="login" value="Log In" onClick={handleSubmit} />
                <input className="button" type="button" name="register" value="Register" onClick={handleSubmit} />
            </form>

            {error}
        </div>
    </div>
    )
}

export default Login;