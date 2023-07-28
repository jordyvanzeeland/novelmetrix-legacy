import React, { Component } from 'react';
import { getCountries } from "./Data.js";

export default class Countries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: []
        }
    }

    getComponentData() {
        getCountries(this.props.year).then(countries => {
            this.setState({
                countries: countries
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
                <div className="books-per-country">
                    <span className="block_name">Landen</span>
                    <table id="DataTable" className="table responsive nowrap" width="100%">
                        <thead>
                            <tr>
                                <th>Land</th>
                                <th>Boeken</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.countries.map((country, i) => {
                                var code = country.code.toLowerCase();
                                return (
                                    <tr key={i}>
                                        <td><img src={`https://flagcdn.com/32x24/${code}.png`} /> {country.country}</td>
                                        <td>{country.count}</td>
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