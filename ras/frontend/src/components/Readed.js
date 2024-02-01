import React, { useEffect, useState } from 'react';
import '../components/DataTables.css';
import 'flag-icon-css/css/flag-icons.min.css';
import DataTable from 'datatables.net-dt';

const Readed = (props) => {
    const [books, setBooks] = useState([]);

    const getData = async () => {
        const data = await import("./Data.js");
        const yearbooks = await data.getBooksByYear(props.year);

        if(yearbooks){
            setBooks(yearbooks);
        }
        setTimeout(() => {
            let table = new DataTable('#DataTable');
            table.destroy();

            table = new DataTable('#DataTable', {
                language: {
                    url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Dutch.json'
                },
                dom: 'rt<"bottom"p><"clear">',
                order: []
            });
        }, 1000)
    }

    useEffect(() => {
        getData();
    }, [props.year])

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
                        {books.map((book, i) => {
                            var code = book.country_code.toLowerCase();
                            return (
                                <tr key={i}>
                                    <td>{book.name}</td>
                                    <td>{book.author} <span className={`flag-icon flag-icon-${code} mx2`}></span></td>
                                    <td>{book.genre}</td>
                                    <td><i className='fas fa-star'></i>{book.rating}</td>
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