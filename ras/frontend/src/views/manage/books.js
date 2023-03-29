import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../components/DataTables.css';
import * as moment from 'moment';
const $ = require('jquery');
$.DataTable = require('datatables.net');
moment.locale('nl');

function ManageBooks() {

    var navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("token") || localStorage.getItem("token") && localStorage.getItem("token") === ''){
            // window.location.href = "/login";
            navigate("/login")
        }
    })

    return (
        <React.Fragment>
            <div className="content">
                <h1>Boeken beheren</h1>
            </div>
        </React.Fragment>
    )
}

export default ManageBooks;