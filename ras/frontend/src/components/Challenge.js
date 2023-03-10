import React, { Component } from 'react';
import { getChallenge, getStats } from "./Data.js";

export default class Challenge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            readingYears: [],
            challenge: 0
        }
    }

    getComponentData() {
        var $this = this;

        getStats(this.props.year).then(data => {
            $this.setState({
                totalbooks: data.totalbooks
            })
        });

        getChallenge(this.props.year).then(data => {
            this.setState({
                challenge: data && data.length > 0 ? data[0].nrofbooks : 0
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
        var challengePercentage = Math.round((this.state.totalbooks / this.state.challenge) * 100, 0)

        return (
            <React.Fragment>
                {this.state.challenge && this.state.challenge !== 0 ?
                    <div className="stat-block" style={{ marginBottom: '20px' }}>
                        <span className="block_name">Book Challenge</span>
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: challengePercentage + '%' }} aria-valuenow={challengePercentage} aria-valuemin="0" aria-valuemax="100">
                                <div className="progress-bar-number">{challengePercentage}%</div>
                            </div>
                        </div>

                        <span className="stats-number">{this.state.totalbooks}</span><span className="stats-label">van de</span><span className="stats-number">{this.state.challenge}</span><span className="stats-label">boeken gelezen</span>
                    </div>
                    : ''}
            </React.Fragment>
        )
    }
}