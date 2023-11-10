import React, { useEffect, useState } from 'react';

const BookStats = (props) =>{
    const [totalbooks, setTotalbooks] = useState(0);
    const [totalgenres, setTotalgenres] = useState(0);

    const getData = async () => {
        const data = await import("./Data.js");
        const stats = await data.getStats(props.year);

        setTotalbooks(stats.totalbooks);
        setTotalgenres(stats.totalgenres);
    }

    useEffect(() => {
        getData();
    }, [props.year])

    return (
        <React.Fragment>
            <div className='row'>
                <div className="col-md-4">
                    <div className="stat-block">
                        <i class="fas fa-book-open"></i>   
                        <span className="stats-label">Gelezen boeken:</span>
                        <span className="stats-number">{totalbooks}</span>
                        
                    </div>
                </div>
                
                <div className="col-md-4">
                    <div className="stat-block">
                        <i class="fas fa-book-open"></i>   
                        <span className="stats-label">Genres:</span>
                        <span className="stats-number">{totalgenres}</span>
                        
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="stat-block">
                        <i class="fas fa-star"></i> 
                        <span className="stats-label">Jaarbeoordeling:</span>
                        <span className="stats-number">7</span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BookStats;