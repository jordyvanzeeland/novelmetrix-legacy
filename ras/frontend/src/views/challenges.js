import React, { useEffect, useState } from "react";
import '../components/DataTables.css';
import * as moment from 'moment';
import Sidebar from "../components/Sidebar.js";
moment.locale('nl');

const Challenges = (props) => {
    const [challenges, setChallenges] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const getData = async (init) => {
        const [data, functions] = await Promise.all([
            import("../components/Data.js"),
            import("../Functions.js")
        ])

        const getchallenges = await data.getAllChallenges();
        setChallenges(getchallenges);
        functions.initDataTable();
    }

    const addChallenge = async (event) => {
        event.preventDefault();

        var details = {
            'year': event.target.year.value,
            'challenge': event.target.challenge.value
        };

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const data = await import("../components/Data.js");
        await data.insertChallenge(formBody);
        setShowModal(false);
        await getData();
    }

    const deleteChallenge = async (challengeid) => {
        var result = confirm("Weet je zeker dat je dit wilt verwijderen?");

        if (result) {
            const data = await import("../components/Data.js");
            await data.deleteChallenge(challengeid);
            await getData();
        }   
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <React.Fragment>
            <Sidebar />
            <div className="content-manage">
                <h1>Challenges beheren <button type="button" onClick={() => setShowModal(true)} className="btn btn-success btn-add">Toevoegen</button></h1>

                <div className="DataTable_Container">
                    <table id="DataTable" className="showHead table responsive nowrap" width="100%">
                        <thead>
                            <tr>
                                <th>Jaar</th>
                                <th>Challenge</th>
                                <th>Gelezen</th>
                                <th>Voortgang</th>
                                <th>Acties</th>
                            </tr>
                        </thead>
                        <tbody>
                            {challenges.map((challenge, i) => {

                                var challengePercentage = Math.round((challenge.booksread / challenge.nrofbooks) * 100, 0);

                                return (
                                    <tr key={challenge.id}>
                                        <td>{challenge.year}</td>
                                        <td>{challenge.nrofbooks}</td>
                                        <td>{challenge.booksread}</td>
                                        <td>
                                            <div className="progress">
                                                <div className="progress-bar progress-bar" role="progressbar" style={{ width: challengePercentage + '%' }} aria-valuenow={challengePercentage} aria-valuemin="0" aria-valuemax="100">
                                                    <div className="progress-bar-number">{challengePercentage}%</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {/* <button type="button" className="btn btn-warning"><i className="fa fa-pen"></i></button> */}
                                            <button type="button" onClick={() => deleteChallenge(challenge.id)} className="btn btn-danger"><i className="fa fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {showModal && (<div style={{ display: 'block' }} className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Challenge toevoegen</h5>
                                <button type="button" onClick={() => setShowModal(false)} className="close" data-dismiss="modal" aria-label="Close">
                                    <i class="fas fa-times-circle"></i>
                                </button>
                            </div>
                            <form method="POST" onSubmit={(event) => addChallenge(event)}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="year">Jaar</label>
                                    <input type="text" className="form-control" id="year"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="challenge">Aantal boeken</label>
                                    <input type="text" className="form-control" id="challenge" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success">Toevoegen</button>
                                <button type="button" onClick={() => setShowModal(false)} className="btn btn-danger cancel" data-dismiss="modal">Annuleren</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>)}
            </div>
        </React.Fragment>
    )
}

export default Challenges;