import React, { Component } from 'react';
import { getBooksPerYearPerGenres } from "./Data.js";
import { initChart } from "./Charts.js";

export default class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }

    getComponentData() {
        getBooksPerYearPerGenres(this.props.year).then(books => {
            this.setState({
                books: books
            })

            initChart(books, this.props.year);
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
                <div className="books-per-month">
                    <span className="block_name">Boeken per maand per genre</span>
                    <canvas id="chart"></canvas>
                </div>
            </React.Fragment>
        )
    }
}