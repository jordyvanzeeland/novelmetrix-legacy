import React, { Component } from "react";
import Challenge from "../components/Challenge";
import Countries from "../components/Countries";
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
                <div className="chooseYear">
                    <i className="fa fa-calendar"></i>
                    <span className="stats-number">
                        <select className="yearselector" value={this.state.year} onChange={(event) => this.changeYear(event)}>
                            {this.state.readingYears.map((year, i) => {
                                return (<option key={i} value={year}>{year}</option>)
                            })}
                        </select>
                    </span>
                </div>

                <Sidebar />
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8">
                                <Challenge year={this.state.year} />
                                <Books year={this.state.year} />
                                {/* <Pages year={this.state.year} /> */}
                            </div>

                            <div className="col-md-4">
                                
                                <Genres year={this.state.year} />
                                <Countries year={this.state.year} />
                                <Ratings year={this.state.year} />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}