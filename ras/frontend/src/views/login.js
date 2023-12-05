import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedin, setLoggedin] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState(null);
    
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

        const data = await import("../components/Data.js");
        const user = await data.loginUser(username, password, formData);

        if(user.error){
            setHasError(true);
            setError(user.error)
        }else{
            localStorage.setItem('id', user.user.id);
            localStorage.setItem('name', user.user.name);
            localStorage.setItem('username', user.user.username);
            localStorage.setItem('email', user.user.email);

            setToken(user.token);
            window.location.reload();
        }
        
    }

    // const getUser = (username, password, formData) => {
    //     return authFetch(`/api/auth/login?username=${username}&password=${password}`, {
    //         method: 'POST',
    //         body: formData
    //     }).then(res => {
    //         if(res.user){
    //             localStorage.setItem('id', res.user.id);
    //             localStorage.setItem('name', res.user.name);
    //             localStorage.setItem('username', res.user.username);
    //             localStorage.setItem('email', res.user.email);

    //             setToken(res.token);
    //             return Promise.resolve(res);
    //         }
    //         else{
    //             return res;
    //         }
    //     })
    // }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const res = await login(username, password);

        if(res && res.user && res.user.id){
            setLoggedin(true);
            window.location.href = "/";
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

                {hasError && error === 'UserNotExist' && (<div id='err_msg' className="alert alert-danger" style={{ textAlign: 'center' }}>Deze gebruiker heeft geen account</div>)}
                {hasError && error === 'WrongCredentials' && (<div id='err_msg' className="alert alert-danger" style={{ textAlign: 'center' }}>De ingevulde gegevens zijn onjuist.</div>)}

                <form onSubmit={(event) => handleFormSubmit(event)}>
                    <div className="mb-3">
                        <span className='icon'>
                            <i className="fas fa-user"></i>
                        </span>
                        <input type="text" onChange={handleChange} className="form-control" name="username" id="username" placeholder="Gebruikersnaam" aria-describedby="emailHelp" required/>
                    </div>
                    <div className="mb-3">
                        <span className='icon'>
                            <i className="fas fa-key"></i>
                        </span>
                        <input type="password" onChange={handleChange} className="form-control" name="password" id="password" placeholder="Wachtwoord" required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Inloggen</button>
                </form>
                <Link className="btn" to="/register" style={{ width: '100%', marginTop: '15px' }}>Maak een account aan</Link>
            </div>
        </React.Fragment>
    );
}

export default Login;