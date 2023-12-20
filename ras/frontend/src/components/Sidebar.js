import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    }

    return(
        <div className="sidebar">
                <img className="logo_text" src="/static/images/logo_white.png" style={{ width: '100%', padding: '10px 25px' }}/>
                <ul>
                    <NavLink to={'/'} exact="true">
                        <li><i className="fas fa-chart-line"></i> <label>Dashboard</label></li>
                    </NavLink>

                    <span>Beheer</span>
                    <NavLink to={'/books'} exact="true">
                        <li><i className="fas fa-book"></i> <label>Boeken</label></li>
                    </NavLink>
                    <NavLink to={'/challenges'} exact="true">
                        <li><i className="fas fa-tasks"></i> <label>Challenges</label></li>
                    </NavLink>
                    <li className="bottom-menu"><button onClick={() => logout()}><i className="fas fa-power-off"></i> <label>Uitloggen</label></button></li>
                </ul>

                {/* <ul className="bottom-menu">
                    <li><button onClick={() => logout()}><i className="fas fa-power-off"></i> Uitloggen</button></li>
                </ul> */}
        </div>
    )
}

export default Sidebar;