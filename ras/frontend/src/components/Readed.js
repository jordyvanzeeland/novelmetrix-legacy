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
    }

    useEffect(() => {
        getData();
    }, [props.year])

    return (
        <React.Fragment>
            <div className="DataTable_Container">
                <table id="DataTable" className="table responsive nowrap" width="100%">
                    <thead>
                        <tr>
                            <th></th>
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
                                    <td><div className="dotgenre" style={{background: dotcolor }}></div> {book.name}</td>
                                    <td>{book.author}</td>
                                    <td><i className='fas fa-star'></i> {book.rating}</td>
                                    <td>{moment(book.readed).format("MMMM")}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

export default Readed;