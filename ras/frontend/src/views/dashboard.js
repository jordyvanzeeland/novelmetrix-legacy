import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Challenge from "../components/Challenge";
import BookStats from "../components/Stats";
import Countries from "../components/Countries";
import Pages from "../components/Pages";
import Genres from "../components/Genres";
import Books from "../components/Books";
import { getRatingsCount, getReadingYears } from "../components/Data.js";
import Sidebar from "../components/Sidebar";
import Ratings from "../components/Ratings";

export default class Dashboard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            readingYears: [],
        }
    }

    changeYear(event) {
        this.setState({
            year: event.target.value
        })
    }

    componentDidMount() {
        getReadingYears().then(data => {
            this.setState({
                readingYears: data
            })
        })

        getRatingsCount(this.state.year).then(data => {
            console.log(data);
        })
    }

    render() {
        var url = window.location.href.split("/");

        return (
            <React.Fragment>
                <Sidebar />
                <div className="content">
                    <div className="books-stats">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-2">
                                    <div className="stat-block">
                                        <i className="fa fa-calendar"></i>
                                        <span className="stats-number">
                                            <select className="yearselector" value={this.state.year} onChange={(event) => this.changeYear(event)}>
                                                {this.state.readingYears.map((year, i) => {
                                                    return (<option key={i} value={year}>{year}</option>)
                                                })}
                                            </select>
                                        </span>
                                    </div>
                                </div>

                                <BookStats year={this.state.year} />
                            </div>
                        </div>
                    </div>

                    <Challenge year={this.state.year} />

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8">
                                <Books year={this.state.year} />
                                <Pages year={this.state.year} />
                            </div>

                            <div className="col-md-4">
                                <Countries year={this.state.year} />
                                <Genres year={this.state.year} />
                                <Ratings year={this.state.year} />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}