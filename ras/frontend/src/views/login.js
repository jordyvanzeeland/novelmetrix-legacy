import React, { useState } from "react";

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedin, setLoggedin] = useState(false);
    
    const getToken = (idToken) => {
        localStorage.getItem('token');
    }

    const setToken = (idToken) => {
        localStorage.setItem('token', idToken)
    }

    const isTokenExpired = (token) => {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    const login = async (username, password) => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        return authFetch(`http://localhost:8000/api/auth/login?username=${username}&password=${password}`, {
            method: 'POST',
            body: formData
        }).then(res => {
            console.log(res.user);
            if(res.user){
                localStorage.setItem('id', res.user.id);
                localStorage.setItem('name', res.user.name);
                localStorage.setItem('username', res.user.username);
                localStorage.setItem('email', res.user.email);

                setToken(res.token);
                return Promise.resolve(res);
            }
        })
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const res = await login(username, password);
        console.log(res);

        if(res.user.id){
            setLoggedin(true);
            window.location.href = "/";
        }else{
            alert("Inlogegevens zijn onjuist. Probeer het opnieuw");
        }
    }

    const handleChange = (event) => {
        if(event.target.name === 'username'){
            setUsername(event.target.value);
        }else{
            setPassword(event.target.value);
        }
    }

    const loggedIn = () => {
        const token = getToken()
        return !!token && !isTokenExpired(token)
    }

    const authFetch = (url, options) => {
        if (loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, options)
            .then(_checkStatus)
            .then(response => response.json())
    }

    const _checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }

    return (
        <React.Fragment>
            <div className='login_overlay'></div>
            <div className='login'>
                <img className="logo_text" src="/static/images/logo.png" />

                <form onSubmit={(event) => handleFormSubmit(event)}>
                    <div className="mb-3">
                        <span className='icon'>
                            <i className="fas fa-user"></i>
                        </span>
                        <input type="text" onChange={handleChange} className="form-control" name="username" id="username" placeholder="Gebruikersnaam" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <span className='icon'>
                            <i className="fas fa-key"></i>
                        </span>
                        <input type="password" onChange={handleChange} className="form-control" name="password" id="password" placeholder="Wachtwoord"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Inloggen</button>
                    <div id='err_msg'></div>
                </form>
            </div>
        </React.Fragment>
    );
}

export default Login;