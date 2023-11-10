import React, { useEffect, useState } from "react";
import Genres from "../components/Genres";
import Books from "../components/Books";
import Ratings from "../components/Ratings";
import Stats from "../components/Stats";
import Sidebar from "../components/Sidebar";

const Dashboard = (props) => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [readingYears, setReadingYears] = useState([]);

    const getData = async () => {
        const data = await import("../components/Data.js");
        const getYears = await data.getReadingYears();
        setReadingYears(getYears);
    }

    useEffect(() => {
        getData();
    }, [year]);

    return (
        <React.Fragment>
            <div className="topbar">
                <div className="chooseYear">
                        <i className="fa fa-calendar"></i>
                        <span className="stats-label" style={{ marginRight: '0px' }}>Selecteer jaar</span>
                        <span className="stats-number" style={{ marginRight: '0px' }}>
                            <select className="yearselector" value={year} onChange={(event) => setYear(event.target.value)}>
                                {readingYears.map((year, i) => {
                                    return (<option key={i} value={year}>{year}</option>)
                                })}
                            </select>
                        </span>
                    </div>
            </div>
            <Sidebar />
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <Stats year={year} />
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