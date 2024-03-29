import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {

    const [showModal, setShowModal] = useState(false);

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    }

    const addBook = async (event) => {
        event.preventDefault();

        const book = {
            name: event.target.name.value,
            author: event.target.author.value,
            genre: event.target.genre.value,
            readed: event.target.readed.value,
            rating: event.target.rating.value,
        }

        const data = await import("../components/Data.js");
        const insertbook = await data.insertBook(book);

        setShowModal(false);
        await getData();
        
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

                <li onClick={() => setShowModal(true)}><i class="fas fa-plus-circle"></i></li>
                <li className="bottom-menu"><button onClick={() => logout()}><i className="fas fa-power-off"></i></button></li>
            </ul>

            {showModal && (<div style={{ display: 'block' }} className="modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Boek toevoegen</h5>
                            <button type="button" onClick={() => setShowModal(false)} className="close" data-dismiss="modal" aria-label="Close">
                                <i class="fas fa-times-circle"></i>
                            </button>
                        </div>
                        <form method="POST" onSubmit={(event) => addBook(event)}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="name">Naam</label>
                                <input type="text" className="form-control" id="name" name="name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="author">Schrijver</label>
                                <input type="text" className="form-control" id="author" name="author" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="genre">Genre</label>
                                <input type="text" className="form-control" id="genre" name="genre" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="readed">Gelezen op</label>
                                <input type="date" className="form-control" id="readed" name="readed"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="rating">Aantal sterren</label>
                                <input type="text" className="form-control" id="rating" name="rating"/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-add">Toevoegen</button>
                            <button type="button" onClick={() => setShowModal(false)} className="btn btn-cancel" data-dismiss="modal">Annuleren</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>)}
        </div>

        
    )
}

export default Sidebar;