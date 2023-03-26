import { React, useState } from 'react';

function Register({server}) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const API = server + "/registration";
    
    function handleSubmit(event) {
        event.preventDefault();
        
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
                        alert(`Username ${data[key]} created successfully!`);
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

        {error}
    </div>
    )
}

export default Register;