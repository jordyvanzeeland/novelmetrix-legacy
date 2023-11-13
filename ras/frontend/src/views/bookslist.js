import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.js";
import * as moment from 'moment';
import "../components/DataTables.css";
moment.locale('nl');

const BooksList = (props) => {
    var [books, setBooks] = useState([]);

    const getData = async() => {
        const data = await import("../components/Data.js");
        const getbooks = await data.getAllBooks();
        console.log(getbooks)
        setBooks(getbooks);

        setTimeout(() => {
            $('#DataTable').DataTable({
                language: {
                    url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Dutch.json',
                    search: "",
                    searchPlaceholder: "Zoeken"
                },
                dom: 'frt<"bottom"pl><"clear">',
                order: []
            });
        }, 300)
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <React.Fragment>
            <Sidebar />
            <div className="content-manage">
            {/* <button type="button" class="btn btn-success">Toevoegen</button> */}
                <h1>Boeken beheren</h1>


                <div className="DataTable_Container">
                    <table id="DataTable" className="showHead table responsive nowrap" width="100%">
                        <thead>
                            <tr>
                                <th>Boek</th>
                                <th>Schrijver</th>
                                <th>Gelezen op</th>
                                <th>Rating</th>
                                <th>Acties</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book, i) => {
                                return (
                                    <tr key={book.id}>
                                        <td>{book.name}</td>
                                        <td>{book.author}</td>
                                        <td>{moment(book.readed).format('MMMM YYYY')}</td>
                                        <td><i class='fas fa-star'></i> {book.rating}</td>
                                        <td>
                                            <button type="button" class="btn btn-danger"><i className="fa fa-trash"></i></button>
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