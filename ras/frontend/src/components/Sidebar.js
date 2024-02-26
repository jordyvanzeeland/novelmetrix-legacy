import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    }

    return(
        <div className="sidebar">
                <ul>
                    <NavLink to={'/'} exact="true">
                        <li><i className="fas fa-chart-line"></i></li>
                    </NavLink>

                    <NavLink to={'/books'} exact="true">
                        <li><i className="fas fa-book"></i></li>
                    </NavLink>
                    <li className="bottom-menu"><button onClick={() => logout()}><i className="fas fa-power-off"></i></button></li>
                </ul>
        </div>
    )
}

export default Sidebar;