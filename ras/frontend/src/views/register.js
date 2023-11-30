import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Register = (props) => {
    const [isRegistered, setIsRegistered] = useState(false);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        var email = event.target.email.value;
        var username = event.target.username.value;
        var password = event.target.password.value;

        const formData = new FormData();
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);

        const data = await import("../components/Data.js");
        const register = await data.registerUser(formData);

        if(register.code && register.code === 'OK'){
            setIsRegistered(true);
        }
    }

    return(
        <React.Fragment>
            <div className='login_overlay'></div>
            <div className='login register'>
                <img className="logo_text" src="/static/images/logo.png" />

                {isRegistered &&(
                    <div id="ok_msg" class="alert alert-success" style={{ marginTop: '20px', textAlign: 'center' }}>Account aangemaakt! Klik <Link to="/">hier</Link> om in te loggen.</div>
                )}

                <form onSubmit={(event) => handleFormSubmit(event)}>
                    <p style={{ textAlign: 'center', marginBottom: '25px' }}>Leuk dat je een account aan gaat maken op NovelMetrix! Vul hieronder de gegevens in en na het aanmaken kun je gelijk inloggen op je nieuwe account.</p>
                    <div className="mb-3">
                        <input type="text" className="form-control" name="email" id="email" placeholder="E-mailadres" required/>
                    </div>

                    <div className="mb-3">
                        <input type="text" className="form-control" name="username" id="username" placeholder="Gebruikersnaam" required/>
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" name="password" id="password" placeholder="Wachtwoord" required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Registreer</button>
                    <div id='err_msg'></div>
                </form>
            </div>
        </React.Fragment>
    )
}