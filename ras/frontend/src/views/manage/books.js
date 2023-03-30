import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../components/DataTables.css';
import * as moment from 'moment';
import SidebarManage from "../../components/manage/sidebar";
import Filters from "../../components/Filters";
const $ = require('jquery');
$.DataTable = require('datatables.net');
moment.locale('nl');

function ManageBooks() {

    var [books, setBooks] = useState([]);

    var navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("token") || localStorage.getItem("token") && localStorage.getItem("token") === ''){
            // window.location.href = "/login";
            navigate("/login")
        }

        document.title = "Boekenlijst - Reading Analytics System";

        import("../../components/Data.js").then(module => {
            return module.getAllBooks().then(data => {
                setBooks(data);

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
                }, 1000)
            });
        });
    }, [])

    return (
        <React.Fragment>
            <SidebarManage />
            <div className="content-manage">
                <h1>Boeken beheren <button type="button" class="btn btn-success">Toevoegen</button></h1>
                

                <div className="DataTable_Container">
                    <table id="DataTable" className="showHead table responsive nowrap" width="100%">
                        <thead>
                            <tr>
                                <th>Boek</th>
                                <th>Schrijver</th>
                                <th>Acties</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book, i) => {
                                return (
                                    <tr key={book.id}>
                                        <td>{book.name}</td>
                                        <td>{book.author}</td>
                                        <td>
                                            <button type="button" class="btn btn-warning"><i class="fa fa-pen"></i></button>
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

export default ManageBooks;