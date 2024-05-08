import React, { useEffect, useState } from 'react';

const BookStats = (props) =>{
    const [totalbooks, setTotalbooks] = useState(0);
    const [totalgenres, setTotalgenres] = useState(0);
    const [yearrating, setYearrating] = useState(0);

    const getData = async () => {
        const data = await import("./Data.js");
        const stats = await data.getStats(props.year);

        setTotalbooks(stats.totalbooks);
        setTotalgenres(stats.totalgenres);
        setYearrating(stats.avgyearrating);
    }

    useEffect(() => {
        getData();
    }, [props.year])

    return (
        <React.Fragment>
                <div className="col-md-6 col-sm-6">
                    <div className="stat-block">
                        <i className="fas fa-book-open"></i>   
                        <span className="stats-label">Gelezen boeken:</span>
                        <span className="stats-number">{totalbooks ? totalbooks : 0}</span>
                    </div>
                </div>
                
                {/* <div className="col-md-4 col-sm-4">
                    <div className="stat-block">
                        <i className="fas fa-book-open"></i>   
                        <span className="stats-label">Genres:</span>
                        <span className="stats-number">{totalgenres ? totalgenres : 0}</span>
                        
                    </div>
                </div> */}
        </React.Fragment>
    )
}

export default BookStats;