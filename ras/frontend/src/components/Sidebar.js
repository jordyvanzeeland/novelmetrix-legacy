import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar(){
    return (
        <React.Fragment>
            <div className='sidebar'>
                <ul>
                    <li><NavLink to="/"><i className="fa fa-chart-bar"></i> Dashboard</NavLink></li>
                    <li><NavLink to="/booklist"><i className="fas fa-book"></i> Boekenlijst</NavLink></li>
                </ul>
            </div>
        </React.Fragment>
    )

}

export default Sidebar;