import React, { useEffect } from 'react';

const Books = (props) => {
    const getData = async () => {
        const [data, charts] = await Promise.all([
            import("./Data.js"),
            import("./Charts.js")
        ]);

        const yearbooks = await data.getBooksPerYearPerGenres(props.year);

        if(yearbooks){
            const ratings = await data.getAvgRatings(props.year);
            charts.initChart(yearbooks, ratings, props.year);
        }
    }

    useEffect(() => {
        getData();
    }, [props.year]);

    return (
        <React.Fragment>
            <div className="books-per-month">
                <span className="block_name">Boeken per maand per genre</span>
                <canvas id="chart"></canvas>
            </div>
        </React.Fragment>
    )
}

export default Books;