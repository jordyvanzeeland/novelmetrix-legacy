import React, { Component } from 'react';
import { getGenresCount, getRatingsCount } from "./Data.js";
import { initDoughnut } from "./Charts.js";

export default class Ratings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ratings: [],
            totalRatings: 0
        }
    }

    getComponentData() {
        getRatingsCount(this.props.year).then(ratings => {

            var total = 0;

            ratings.forEach(rating => {
                total += rating.count;
            })

            var ratingsArray = {
                5: 0,
                4: 0,
                3: 0,
                2: 0,
                1: 0
            }

            for(var i = 5; i > 0; i--){
                ratings.forEach(rating => {
                    if(rating.rating === i){
                        ratingsArray[i] = rating.count
                    }
                });
            }

            console.log(Object.entries(ratingsArray));

            this.setState({
                ratings: Object.entries(ratingsArray),
                totalRatings: total
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
        return (
            <React.Fragment>
                <div className="ratings">
                    <span className="block_name">Waarderingen ({this.state.totalRatings})</span>
                    <table id="DataTable" className="table responsive nowrap" width="100%">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>percentage</th>
                                <th>aantal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.ratings.map((rating) => {
                                var ratingstars = '';
                                var rating_percentage = rating[1] / this.state.totalRatings * 100;

                                console.log(rating[1], this.state.totalRatings);

                                if (rating[0]) {
                                    for (var i = 0; i < rating[0]; i++) {
                                        ratingstars += "<i class='fas fa-star'></i>";
                                    }
                                }

                                return(
                                    <tr>
                                        <td style={{width: '150px'}} className='book_rating' dangerouslySetInnerHTML={{__html: ratingstars}}></td>
                                        <td style={{width: '257px'}}>
                                            <div className="progress">
                                                <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: rating_percentage + '%' }} aria-valuenow={rating_percentage} aria-valuemin="0" aria-valuemax="100">
                                                    {/* <div className="progress-bar-number">{rating_percentage}%</div> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td>{rating[1]}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}