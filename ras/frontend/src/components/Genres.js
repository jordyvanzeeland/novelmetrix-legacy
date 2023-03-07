import React, { Component } from 'react';
import { getGenresCount } from "./Data.js";
import { initDoughnut } from "./Charts.js";

export default class Genres extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: []
        }
    }

    getComponentData() {
        getGenresCount(this.props.year).then(genres => {
            this.setState({
                genres: genres
            })

            initDoughnut(genres, this.props.year);
        })
    }

    componentDidMount() {
        this.getComponentData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.year !== this.props.year) {
            this.getComponentData();
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="genresPercent">
                    <span className="block_name">Genres</span>
                    <canvas id="chartGenres"></canvas>
                </div>
            </React.Fragment>
        )
    }
}