import React, { useEffect, useState } from "react";
import Genres from "../components/Genres";
import Books from "../components/Books";
import Ratings from "../components/Ratings";
import Stats from "../components/Stats";
import Challenge from "../components/Challenge";
import Sidebar from "../components/Sidebar";

const Dashboard = (props) => {
    const currentyear = new Date().getFullYear();
    const [year, setYear] = useState(currentyear);
    const [readingYears, setReadingYears] = useState([]);

    const getData = async () => {
        const data = await import("../components/Data.js");
        const getYears = await data.getReadingYears();
        setReadingYears(getYears);
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
            <div className="topbar">
                <img className="logo" src="/static/images/logo_white.png" />
                <div className="chooseYear">
                    <i className="fa fa-calendar"></i>
                    <span className="stats-number" style={{ marginRight: '0px' }}>
                        <select className="yearselector" value={year} onChange={(event) => setYear(event.target.value)}>
                            {readingYears.map((year, i) => {
                                return (<option key={i} value={year}>{year}</option>)
                            })}
                            {!readingYears.includes(currentyear) ? <option key={currentyear} value={currentyear}>{currentyear}</option> : ''}
                        </select>
                    </span>
                </div>

                <div className="topbar_right">
                    <ul>
                        <li><i className="fas fa-book"></i></li>
                        <li style={{ borderRight: "solid 1px rgba(255,255,255,0.5)", paddingRight: '20px' }}><i className="fas fa-tasks"></i></li>
                        <li onClick={() => logout()}><i className="fas fa-power-off"></i></li>
                    </ul>
                </div>
            </div>
            {/* <Sidebar /> */}
            <div className="content">
                <div className="container-fluid">
                    {/* <div className="row">
                        <div className="col-md-12">
                            
                        </div>
                    </div> */}
                    <div className="row">
                        <div className="col-md-8">
                            <Stats year={year} />
                            <Challenge year={year} />
                            <Books year={year} />
                        </div>

                        <div className="col-md-4">
                            
                            <Genres year={year} />
                            <Ratings year={year} />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Dashboard;