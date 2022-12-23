import React, { useState, useEffect } from "react";
import '../components/DataTables.css';
import * as moment from 'moment';
import Sidebar from "../components/Sidebar";
import Filters from "../components/Filters";
const $ = require('jquery');
$.DataTable = require('datatables.net');
moment.locale('nl');

function Booklist(){
    var [books, setBooks] = useState([]);

    const fillDataTableFilters = (filter, value, text) => {
        console.log(value, text);
        if (value && !filter.find("option:contains('" + text + "')").length) {
            var option = new Option(value, value);
            option.innerHTML = text;
            filter[0].appendChild(option);
        }
    }

    const getFlagEmoji = (countryCode) => {
        const codePoints = countryCode
          .toUpperCase()
          .split('')
          .map(char =>  127397 + char.charCodeAt());
        return String.fromCodePoint(...codePoints);
      }

    useEffect(() => {
        document.title = "Boekenlijst - Reading Analytics System";

        import("../components/Data.js").then(module => {
            return module.getAllBooks().then(data => {
                setBooks(data);
    
                setTimeout(() => {
                    $('#DataTable').DataTable({
                        language: {
                            url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Dutch.json'
                        },
                        dom: 'rt<"bottom"pl><"clear">',
                        order: []
                    });
                }, 1000)
            });
        });
    }, [])

    return (
        <React.Fragment>
            <Sidebar />
            <div className="content">
                <h1>Boekenlijst</h1>

                <Filters />

                <div className="DataTable_Container">
                    <table id="DataTable" className="showHead table responsive nowrap" width="100%">
                        <thead>
                            <tr>
                                <th>Boek</th>
                                <th>Schrijver</th>
                                <th>Genre</th>
                                <th>Land</th>
                                <th>Aantal pagina's</th>
                                <th>Gelezen op</th>
                                <th>Beoordeling</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book, i) => {
                                var code = book.country_code.toLowerCase();

                                var flag = getFlagEmoji(book.country_code);
                                var optionValue= book.country
                                var optionText = flag + ' ' + book.country;

                                fillDataTableFilters($('.genre'), book.genre, book.genre);
                                fillDataTableFilters($('.country'), optionValue, optionText);
                                fillDataTableFilters($('.author'), book.author, book.author);

                                return (
                                    <tr key={book.id}>
                                        <td>{book.name}</td>
                                        <td>{book.author}</td>
                                        <td>{book.genre}</td>
                                        <td><img src={`https://flagcdn.com/20x15/${code}.png`} /> {book.country}</td>
                                        <td>{book.pages}</td>
                                        <td>{moment(book.readed).format('MMMM YYYY')}</td>
                                        <td><i class='fas fa-star'></i>{book.rating}</td>
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

export default Booklist;