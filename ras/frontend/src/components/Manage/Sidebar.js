import React from "react";
import { NavLink } from "react-router-dom";

function SidebarManage(){
    return (
        <React.Fragment>
            <div className='sidebar-manage'>
                <ul>
                    <li><NavLink exact="true" to="/manage" end><i className="fa fa-book"></i> Boeken</NavLink></li>
                    <li><NavLink exact="true" to="/manage/challenges" end><i className="fa fa-list"></i> Challenges</NavLink></li>
                </ul>
                
            </div>
        </React.Fragment>
    )

}

export default SidebarManage;