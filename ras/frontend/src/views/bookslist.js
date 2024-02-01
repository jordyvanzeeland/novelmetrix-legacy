import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.js";
import * as moment from 'moment';
import "../components/DataTables.css";
moment.locale('nl');

const BooksList = (props) => {
    var [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [months, setMonths] = useState([]);

    const addBook = async (event) => {
        event.preventDefault();

        const book = {
            name: event.target.name.value,
            author: event.target.author.value,
            genre: event.target.genre.value,
            readed: event.target.readed.value,
            rating: event.target.rating.value,
        }

        const data = await import("../components/Data.js");
        const insertbook = await data.insertBook(book);

        setShowModal(false);
        await getData();
        
    }

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
            <div className="content-manage">
                <h1>Boeken beheren <button type="button" onClick={() => setShowModal(true)} className="btn btn-success btn-add">Toevoegen</button></h1>

                <div className="DataTable_Container">
                    <table id="DataTable" className="showHead table responsive nowrap" width="100%">
                        <thead>
                            <tr>
                                <th>Boek</th>
                                <th>Schrijver</th>
                                <th>Genre</th>
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
                                        <td>{book.genre}</td>
                                        <td>{moment(book.readed).format('MMMM YYYY')}</td>
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

                {showModal && (<div style={{ display: 'block' }} className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Boek toevoegen</h5>
                                <button type="button" onClick={() => setShowModal(false)} className="close" data-dismiss="modal" aria-label="Close">
                                    <i class="fas fa-times-circle"></i>
                                </button>
                            </div>
                            <form method="POST" onSubmit={(event) => addBook(event)}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="name">Naam</label>
                                    <input type="text" className="form-control" id="name" name="name"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="author">Schrijver</label>
                                    <input type="text" className="form-control" id="author" name="author" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="genre">Genre</label>
                                    <input type="text" className="form-control" id="genre" name="genre" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="readed">Gelezen op</label>
                                    <input type="date" className="form-control" id="readed" name="readed"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="rating">Aantal sterren</label>
                                    <input type="text" className="form-control" id="rating" name="rating"/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success">Toevoegen</button>
                                <button type="button" onClick={() => setShowModal(false)} className="btn btn-danger cancel" data-dismiss="modal">Annuleren</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>)}
            </div>
        </React.Fragment>
    )
}

export default BooksList;