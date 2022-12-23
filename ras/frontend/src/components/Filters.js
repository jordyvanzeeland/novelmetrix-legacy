import React from "react";
import '../components/DataTables.css';
import * as moment from 'moment';
const $ = require('jquery');
$.DataTable = require('datatables.net');
moment.locale('nl');

function Filters() {

    const filterDataTable = (column, value, exact) => {
        if (value !== 0 && exact === true) {
            $('#DataTable').DataTable().column(column).search("(^" + value + "$)", true, false).draw();
        } else {
            $('#DataTable').DataTable().column(column).search(value).draw();
        }
    }

    $('.author').on('change', function () {
        filterDataTable(1, this.value, false);
    });

    $('.genre').on('change', function () {
        filterDataTable(2, this.value, false);
    });

    $('.country').on('change', function () {
        filterDataTable(3, this.value, false);
    });

    return (
        <React.Fragment>
            <div className='search-bar'>
                <input type="text" onChange={(e) => filterDataTable(0, e.target.value, false)} name="search" id="search" placeholder='Zoeken...' />
            </div>

            <div className="filters">
                <select className='author'>
                    <option value="">Filter op Schrijver</option>
                </select>
                <select className='genre'>
                    <option value="">Filter op Genre</option>
                </select>
                <select className='country'>
                    <option value="">Filter op Land</option>
                </select>
            </div>
        </React.Fragment>
    )

}

export default Filters;