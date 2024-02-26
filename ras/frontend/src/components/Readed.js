import React, { useEffect, useState } from 'react';
import './DataTables.css';
import * as moment from 'moment';
moment.locale('nl');

const Readed = (props) => {
    const [books, setBooks] = useState([]);

    const getData = async () => {
        const [data, functions] = await Promise.all([
            import("../components/Data.js"),
            import("../Functions.js")
        ])

        const yearbooks = await data.getBooksByYear(props.year);

        var months = [];

        for(var i = 1; i < 13; i++){
            months[i] = [];

            yearbooks.forEach(book => {
                console.log(moment(book.readed).format("M"), i);
                if(moment(book.readed).format("M") == i){
                    months[i].push(book);
                }
            });
        }

        setBooks(yearbooks);

        functions.initDataTable();
    }

    useEffect(() => {
        getData();
    }, [props.year])

    return (
        <React.Fragment>
            <div style={{ display: 'block' }} className="modal modal-books" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <button type="button" onClick={() => { setShowModal(false) }} className="close" data-dismiss="modal" aria-label="Close">
                                <i className="fas fa-times-circle"></i>
                            </button>
                            <div className="DataTable_Container">
                                <table id="DataTable" className="showHead table responsive nowrap" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Gelezen boeken</th>
                                            <th></th>
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
                                                    <td><i className='fas fa-star'></i> {book.rating}</td>
                                                    <td>{moment(book.readed).format("MMMM")}</td>
                                                    <td style={{ textAlign: 'right' }}>
                                                        <button onClick={() => delBook(book.id)} type="button" className="btn btn-danger"><i className="fa fa-trash"></i></button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="legenda" style={{ textAlign: 'center' }}>
                            <div className="dotgenre" style={{ display: 'inline-block', verticalAlign: 'top', marginTop: '3px', marginRight: '5px', width: '10px', height: '10px', borderRadius: '100%', background: "#404e67" }}></div><span style={{ marginRight: '10px' }}>Thriller</span>
                            <div className="dotgenre" style={{ display: 'inline-block', verticalAlign: 'top', marginTop: '3px', marginRight: '5px', width: '10px', height: '10px', borderRadius: '100%', background: "#01a9ac" }}></div><span style={{ marginRight: '10px' }}>Roman</span>
                            <div className="dotgenre" style={{ display: 'inline-block', verticalAlign: 'top', marginTop: '3px', marginRight: '5px', width: '10px', height: '10px', borderRadius: '100%', background: "#64c5b1" }}></div><span style={{ marginRight: '10px' }}>Non-fictie</span>
                            </div>
                        </div>
                    </div>
                </div>
        </React.Fragment>
    )
}

export default Readed;