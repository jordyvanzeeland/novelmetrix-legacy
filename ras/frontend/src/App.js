import React, { Component } from "react";
import Challenge from "./components/Challenge";
import BookStats from "./components/Stats";
import { ColorRing } from 'react-loader-spinner'
import Countries from "./components/Countries";
import Pages from "./components/Pages";
import Genres from "./components/Genres";
import Books from "./components/Books";
import { getReadingYears } from "./components/Data.js";

export default class App extends Component {
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

        setTimeout(() =>{
            document.getElementById("loading-overlay").style.display = "none";
        }, 1000);

        getReadingYears().then(data => {
            this.setState({
                readingYears: data
            })
        })

    }

    render() {
        var url = window.location.href.split("/");

        return (
            <React.Fragment>
                <div className="sidebar">
                    <div className={`menu-item ${url && url[3] == "" ? 'selected' : ''}`}>
                        <i className="fa fa-chart-bar"></i>
                    </div>
                    <div className={`menu-item ${url && url[3] == "books" ? 'selected' : ''}`}>
                        <i className="fa fa-book"></i>
                    </div>

                </div>
                <div className="content">

                    <div className="loading-screen-overlay" id="loading-overlay">
                        <div className="loading-screen">
                            <ColorRing
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
                                colors={['#8066ee', '#58c8d6', '#fe4c62', '#49b8fd', '#ffbe0e']}
                            />
                            <span>Data wordt geladen...</span>
                        </div>
                    </div>

                    <h1>Dashboard</h1>
                    <h2>Leesanalyse van Jordy van Zeeland</h2>

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
                            <div className="col-md-9">
                                <Books year={this.state.year} />
                                <Pages year={this.state.year} />
                            </div>

                            <div className="col-md-3">
                                <Countries year={this.state.year} />
                                <Genres year={this.state.year} />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}