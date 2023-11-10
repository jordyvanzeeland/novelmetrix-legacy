import React, { useEffect } from 'react';

const Genres = (props) => {
    const getData = async () => {
        const [data, charts] = await Promise.all([
            await import("./Data.js"),
            await import("./Charts.js")
        ]);
        
        const yeargenres = await data.getGenresCount(props.year);

        if(yeargenres){
            charts.initDoughnut(yeargenres, props.year);
        }
    }

    useEffect(() => {
        getData();
    }, [props.year]);

    return (
        <React.Fragment>
            <div className="genresPercent">
                <span className="block_name">Genres</span>
                <canvas id="chartGenres"></canvas>
            </div>
        </React.Fragment>
    )
}

export default Genres;