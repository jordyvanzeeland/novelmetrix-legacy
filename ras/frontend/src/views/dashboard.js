import React, { useEffect, useState } from "react";
import Genres from "../components/Genres";
import Books from "../components/Books";
import Ratings from "../components/Ratings";
import Stats from "../components/Stats";
import * as moment from 'moment';
import "../components/DataTables.css";
import Readed from "../components/Readed.js";
import Sidebar from "../components/Sidebar.js";
moment.locale('nl');

const Dashboard = (props) => {
    const currentyear = new Date().getFullYear();
    const [year, setYear] = useState(currentyear);
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [readingYears, setReadingYears] = useState([]);

    const getData = async () => {
        const [data, functions] = await Promise.all([
            import("../components/Data.js"),
            import("../Functions.js")
        ])
        const getYears = await data.getReadingYears();
        setReadingYears(getYears);

        const getbooks = await data.getBooksByYear(year);
        var months = [];

        for(var i = 1; i < 13; i++){
            months[i] = [];

            getbooks.forEach(book => {
                if(moment(book.readed).format("M") == i){
                    months[i].push(book);
                }
            });
        }
        
        setBooks(getbooks);
        functions.initDataTable();
    }

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    }

    useEffect(() => {
        getData();
    }, [year]);

    return (
        <React.Fragment>
            <Sidebar />
            <div className="topbar">
                <img className="logo" src="/static/images/logo_white.png" />

                <div className="topbar_right">
                    <ul>
                        <li className="currentUser"><i class="fas fa-user-circle"></i> {localStorage.getItem('name')}</li>
                    </ul>
                </div>
            </div>
            
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-4 col-sm-4">
                                    <div className="stat-block">
                                    <i className="fa fa-calendar"></i>  
                                        <span className="stats-label">Selecteer jaar:</span>
                                        <span className="stats-number">
                                        <select className="yearselector" value={year} onChange={(event) => setYear(event.target.value)}>
                                            {readingYears.map((year, i) => {
                                                return (<option key={i} value={year}>{year}</option>)
                                            })}
                                            {!readingYears.includes(currentyear) ? <option key={currentyear} value={currentyear}>{currentyear}</option> : ''}
                                        </select>
                                        </span>
                                    </div>
                                </div>
                                <Stats year={year} />
                            </div>
                            
                            <Books year={year} />
                        </div>

                        <div className="col-md-4">
                            <Genres year={year} />
                            <Ratings year={year} />
                        </div>
                    </div>
                </div>

                {showModal && (<Readed year={year} />)}
            </div>
        </React.Fragment>
    )
}

export default Dashboard;