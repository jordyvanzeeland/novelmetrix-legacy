import React, { Component } from 'react';
import '../components/DataTables.css';
import * as moment from 'moment';
import { getBooksByYear } from "./Data.js";
const $ = require('jquery');
$.DataTable = require('datatables.net');

export default class Readed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }

    getComponentData(init) {
        getBooksByYear(this.props.year).then(readed => {
            console.log(readed);
            this.setState({
                books: readed
            })

            if(init === true){
                setTimeout(() => {
                    $('#DataTable').DataTable({
                        language: {
                            url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Dutch.json'
                        },
                        dom: 'rt<"bottom"p><"clear">',
                        order: []
                    });
                }, 1000)
            }
            
        })
    }

    componentDidMount() {
        this.getComponentData(true);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.year !== this.props.year) {
            this.getComponentData(false);
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="readed">
                    <span className="block_name">Gelezen boeken</span>
                    <table id="DataTable" className="table responsive nowrap" width="100%">
                        <thead>
                            <tr>
                                <th>Book</th>
                                <th>Author</th>
                                <th>Genre</th>
                                <th>Ratings</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.books.map((book, i) => {
                                var code = book.country_code.toLowerCase();
                                return (
                                    <tr key={i}>
                                        <td>{book.name}</td>
                                        <td>{book.author} <img style={{ width: '20px' }} src={`https://flagcdn.com/32x24/${code}.png`} /></td>
                                        <td>{book.genre}</td>
                                        <td><i class='fas fa-star'></i>{book.rating}</td>
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