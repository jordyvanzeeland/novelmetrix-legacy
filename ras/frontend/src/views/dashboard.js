import React, { useEffect, useState } from "react";
import Genres from "../components/Genres";
import Books from "../components/Books";
import Ratings from "../components/Ratings";
import Stats from "../components/Stats";
import Challenge from "../components/Challenge";
import * as moment from 'moment';
import "../components/DataTables.css";
moment.locale('nl');

const Dashboard = (props) => {
    const currentyear = new Date().getFullYear();
    const [year, setYear] = useState(currentyear);
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [readingYears, setReadingYears] = useState([]);

    const getData = async () => {
        const [data, functions] = await Promise.all([
            import("../components/Data.js"),
            import("../Functions.js")
        ])
        const getYears = await data.getReadingYears();
        setReadingYears(getYears);

        const getbooks = await data.getBooksByYear(year);
        setBooks(getbooks);

        functions.initDataTable();
    }

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    }

    useEffect(() => {
        getData();
    }, [year]);

    return (
        <React.Fragment>
            <div className="topbar">
                <img className="logo" src="/static/images/logo_white.png" />
                <div className="chooseYear">
                    <i className="fa fa-calendar"></i>
                    <span className="stats-number" style={{ marginRight: '0px' }}>
                        <select className="yearselector" value={year} onChange={(event) => setYear(event.target.value)}>
                            {readingYears.map((year, i) => {
                                return (<option key={i} value={year}>{year}</option>)
                            })}
                            {!readingYears.includes(currentyear) ? <option key={currentyear} value={currentyear}>{currentyear}</option> : ''}
                        </select>
                    </span>
                </div>

                <div className="topbar_right">
                    <ul>
                        <li><i className="fas fa-book" onClick={() => {setShowModal(true)}}></i></li>
                        {/* <li style={{ borderRight: "solid 1px rgba(255,255,255,0.5)", paddingRight: '20px' }}><i className="fas fa-tasks"></i></li> */}
                        <li onClick={() => logout()}><i className="fas fa-power-off"></i></li>
                    </ul>
                </div>
            </div>
            
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <Stats year={year} />
                            {/* <Challenge year={year} /> */}
                            <Books year={year} />
                        </div>

                        <div className="col-md-4">
                            
                            <Genres year={year} />
                            <Ratings year={year} />
                        </div>
                    </div>
                </div>

                <div style={{ display: showModal === true ? 'block' : 'none' }} className="modal modal-books" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <button type="button" onClick={() => { setShowModal(false) }} className="close" data-dismiss="modal" aria-label="Close">
                                <i class="fas fa-times-circle"></i>
                            </button>
                            <div className="DataTable_Container">
                                <table id="DataTable" className="showHead table responsive nowrap" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Gelezen boeken</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {books.map((book, i) => {
                                            var dotcolor = '';

                                            if(book.genre === "Thriller"){
                                                dotcolor = '#404e67';
                                            }else if (book.genre === "Roman"){
                                                dotcolor = '#01a9ac';
                                            }else if(book.genre === 'Non-fictie'){
                                                dotcolor = '#64c5b1';
                                            }else{
                                                dotcolor = '#1ABB9C';
                                            }

                                            return (
                                                <tr key={book.id}>
                                                    <td>
                                                        <div className="dotgenre" style={{ display: 'inline-block', verticalAlign: 'top', marginTop: '5px', marginRight: '10px', width: '10px', height: '10px', borderRadius: '100%', background: dotcolor }}></div> 
                                                        <div className="book-info" style={{ display: 'inline-block', verticalAlign: 'top' }}>
                                                            {book.name}
                                                            <div style={{ color: '#777' }} className="book-author">{book.author}</div>
                                                        </div>
                                                    </td>
                                                    <td><i class='fas fa-star'></i> {book.rating}</td>
                                                    <td style={{ textAlign: 'right' }}>
                                                        <button onClick={() => delBook(book.id)} type="button" class="btn btn-danger"><i className="fa fa-trash"></i></button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Dashboard;