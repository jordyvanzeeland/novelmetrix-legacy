import React, { useEffect, useState } from 'react';

const Genres = (props) => {
    const [genresbooks, setGenresBooks] = useState([])

    const getData = async () => {
        const [data, charts] = await Promise.all([
            await import("./Data.js"),
            await import("./Charts.js")
        ]);
        
        const yeargenres = await data.getGenresCount(props.year);

        if(yeargenres){
            charts.initDoughnut(yeargenres, props.year);
            setGenresBooks(yeargenres);
        }
    }

    useEffect(() => {
        getData();
    }, [props.year]);

    return (
        <React.Fragment>
            <div className="genresPercent">
                <span className="block_name">Genres</span>

                <table className="ratingstable responsive nowrap" width="100%">
                    <thead>
                        <tr>
                            <th>genre</th>
                            <th>count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {genresbooks.map(genre => {

                            var dotcolor = '';

                            if(genre.genre === "Thriller"){
                                dotcolor = '#405181';
                            }else if (genre.genre === "Roman"){
                                dotcolor = '#01a9ac';
                            }else if(genre.genre === 'Non-fictie'){
                                dotcolor = '#64c5b1';
                            }else{
                                dotcolor = '#1ABB9C';
                            }

                            return (
                            <tr>
                                <td><div className="dotgenre" style={{background: dotcolor }}></div> {genre.genre}</td>
                                <td style={{textAlign: 'right'}}>{genre.count}</td>
                            </tr>)
                        })}
                    </tbody>
                </table>

                <canvas id="chartGenres"></canvas>
            </div>
        </React.Fragment>
    )
}

export default Genres;