import React, { Component, useEffect, useState } from 'react';
import 'flag-icon-css/css/flag-icons.min.css';
import { getCountries } from "./Data.js";

const Countries = (props) => {
    const [countries, setCountries] = useState([]);

    const getData = async () => {
        const data = await import("./Data.js");
        const yearcountries = await data.getCountries(props.year);

        if(yearcountries){
            setCountries(yearcountries);
        }
    }

    useEffect(() => {
        getData();
    }, [props.year]);

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
                        {countries.map((country, i) => {
                            var code = country.code.toLowerCase();
                            return (
                                <tr key={i}>
                                    <td><span className={`flag-icon flag-icon-${code} mx2`}></span> {country.country}</td>
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

export default Countries;