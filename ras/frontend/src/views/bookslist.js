import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.js";
import * as moment from 'moment';
import "../components/DataTables.css";
moment.locale('nl');

const BooksList = (props) => {
    var [books, setBooks] = useState([]);

    const delBook = async (bookid) => {
        var result = confirm("Weet je zeker dat je dit wilt verwijderen?");

        if (result) {
            const data = await import("../components/Data.js");
            await data.deleteBook(bookid);
            await getData();
        }   
    }

    const getData = async() => {
        const [data, functions] = await Promise.all([
            import("../components/Data.js"),
            import("../Functions.js")
        ])

        const getbooks = await data.getAllBooks();
        setBooks(getbooks);
        functions.initDataTable();
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <React.Fragment>
            <Sidebar />

            <div className="topbar">
                <img className="logo" src="/static/images/logo_white.png" />

                <div className="topbar_right">
                    <ul>
                        <li className="currentUser"><i class="fas fa-user-circle"></i> {localStorage.getItem('name')}</li>
                    </ul>
                </div>
            </div>

            <div className="content">

                <div className="DataTable_Container">
                    <table id="DataTable" className="table responsive nowrap" width="100%">
                        <thead>
                            <tr>
                                <th>Boek</th>
                                <th>Schrijver</th>
                                <th>Rating</th>
                                <th>Acties</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book, i) => {
                                var dotcolor = '';

                                if(book.genre === "Thriller"){
                                    dotcolor = '#405181';
                                }else if (book.genre === "Roman"){
                                    dotcolor = '#01a9ac';
                                }else if(book.genre === 'Non-fictie'){
                                    dotcolor = '#64c5b1';
                                }else{
                                    dotcolor = '#1ABB9C';
                                }

                                return (
                                    <tr key={book.id}>
                                        <td><div className="dotgenre" style={{background: dotcolor }}></div> {book.name}</td>
                                        <td>{book.author}</td>
                                        <td><i class='fas fa-star'></i> {book.rating}</td>
                                        <td>
                                            <button onClick={() => delBook(book.id)} type="button" className="btn btn-danger"><i className="fa fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BooksList;