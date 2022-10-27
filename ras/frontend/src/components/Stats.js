import React, { Component } from 'react';
import { getStats, getReadingYears } from "./Data.js";

export default class BookStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            readingYears: [],
            totalbooks: 0,
            totalpages: 0,
            totalauthors: 0,
            totalcountries: 0,
            totalgenres: 0,
        }
    }

    getComponentData(){
        var $this = this;

        getStats(this.props.year).then(data => {
            $this.setState({
                totalbooks: data.totalbooks,
                totalpages: data.totalpages,
                totalauthors: data.totalauthors,
                totalcountries: data.totalcountries,
                totalgenres: data.totalgenres
            })
        });

        getReadingYears().then(data => {
            this.setState({
                readingYears: data
            })
        });
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
                <div className="col-md-2">
                    <div className="stat-block">
                        <i className="fa fa-book"></i>
                        <span className="stats-number">{this.state.totalbooks}</span>
                        <span className="stats-label">Boeken</span>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="stat-block">
                        <i className="fa fa-book-open"></i>
                        <span className="stats-number">{this.state.totalpages}</span>
                        <span className="stats-label">Bladzijdes</span>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="stat-block">
                        <i className="fa fa-pen"></i>
                        <span className="stats-number">{this.state.totalauthors}</span>
                        <span className="stats-label">Schrijvers</span>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="stat-block">
                        <i className="fa fa-book"></i>
                        <span className="stats-number">{this.state.totalgenres}</span>
                        <span className="stats-label">Genres</span>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="stat-block">
                        <i className="fa fa-globe"></i>
                        <span className="stats-number">{this.state.totalcountries}</span>
                        <span className="stats-label">Landen</span>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}