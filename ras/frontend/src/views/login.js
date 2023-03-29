import React from "react";
import '../components/DataTables.css';
import { useNavigate } from "react-router-dom";
import * as moment from 'moment';
import { readCookie } from "../Functions";
const $ = require('jquery');
$.DataTable = require('datatables.net');
moment.locale('nl');

function Login() {

    var navigate = useNavigate();

    const loginSubmit = (event) => {
        event.preventDefault();

        var details = {
            'username': event.target.username.value,
            'password': event.target.password.value
        };

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "X-CSRFToken": readCookie('csrftoken')
            },
            body: formBody
        })
            .then(response => response.json())
            .then(data => {
                if(data.token){
                    localStorage.setItem("token", data.token);

                    
                    navigate("/manage", { replace: true });
                }else{
                    console.log("No Token Inside");
                }
            })
    }

    return (
        <React.Fragment>
            <div className="content loginbg">
                <form method="POST" onSubmit={(event) => loginSubmit(event)}>
                    <div className="form-group">
                        <label htmlFor="username">Gebruikersnaam</label>
                        <input type="text" className="form-control username" name="username" id="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Wachtwoord</label>
                        <input type="password" className="form-control password" name="password" id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Inloggen</button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Login;