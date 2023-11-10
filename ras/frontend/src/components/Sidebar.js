import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return(
        <div className="sidebar">
                <img className="logo_text" src="/static/images/logo_white.png" style={{ width: '100%', padding: '10px 25px' }}/>
                <ul>
                    <NavLink to={'/'} exact="true">
                        <li><i class="fas fa-chart-line"></i> Dashboard</li>
                    </NavLink>
                    <NavLink to={'/books'} exact="true">
                        <li><i class="fas fa-book"></i> Boeken</li>
                    </NavLink>
                    <NavLink to={'/settings'} exact="true">
                        <li><i class="fas fa-cog"></i> Instellingen</li>
                    </NavLink>
                    <li><i class="fas fa-power-off"></i> Uitloggen</li>
                </ul>
        </div>
    )
}

export default Sidebar;