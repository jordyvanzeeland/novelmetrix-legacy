import React, { Component } from 'react';
import { getShortestLongestBook } from "./Data.js";

export default class Pages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pagesStats: []
        }
    }

    getComponentData() {
        getShortestLongestBook(this.props.year).then(bookstats => {
            this.setState({
                pagesStats: bookstats
            })
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

        var ratingshort = '';
        var ratinglong = '';


        if (this.state.pagesStats.shortestbook) {
            for (var i = 0; i < this.state.pagesStats.shortestbook.rating; i++) {
                ratingshort += "<i class='fas fa-star'></i>";
            }
        }

        if (document.getElementById("shortest_rating") !== null) {
            document.getElementById('shortest_rating').innerHTML = ratingshort;
        }

        if (this.state.pagesStats.longestbook) {
            for (var i = 0; i < this.state.pagesStats.longestbook.rating; i++) {
                ratinglong += "<i class='fas fa-star'></i>";
            }
        }

        if (document.getElementById("longest_rating") !== null) {
            document.getElementById('longest_rating').innerHTML = ratinglong;
        }

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-6">
                        <div className="book shortest">
                            <span className="block_name">Kortste boek</span>
                            <i className="fa fa-book book-icon"></i>
                            <div className="book_pages">{this.state.pagesStats.shortestbook ? this.state.pagesStats.shortestbook.pages : ''} pagina's</div>
                            <div className="book_title_author">{this.state.pagesStats.shortestbook ? this.state.pagesStats.shortestbook.name : ''} - {this.state.pagesStats.shortestbook ? this.state.pagesStats.shortestbook.author : ''}</div>
                            <div id="shortest_rating" className="book_rating"></div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="book longest">
                            <span className="block_name">Langste boek</span>
                            <i className="fa fa-book book-icon"></i>
                            <div className="book_pages">{this.state.pagesStats.longestbook ? this.state.pagesStats.longestbook.pages : ''} pagina's</div>
                            <div className="book_title_author">{this.state.pagesStats.longestbook ? this.state.pagesStats.longestbook.name : ''} - {this.state.pagesStats.longestbook ? this.state.pagesStats.longestbook.author : ''}</div>
                            <div id="longest_rating" className="book_rating"></div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}