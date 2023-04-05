import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../components/DataTables.css';
import * as moment from 'moment';
import SidebarManage from "../../components/manage/sidebar";
const $ = require('jquery');
$.DataTable = require('datatables.net');
moment.locale('nl');

function ManageChallenges() {

    var [challenges, setChallenges] = useState([]);

    var navigate = useNavigate();

    const addChallenge = (event) => {
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

        import("../../components/Data.js").then(module => {
            return module.insertChallenge(formBody).then(data => {

                module.getAllChallenges().then(challenges => {
                    setChallenges(challenges);
                    $('.modal').hide();
                })
            });
        });

    }

    const deleteChallenge = (challengeid) => {
        var result = confirm("Weet je zeker dat je dit wilt verwijderen?");

        if (result) {
            import("../../components/Data.js").then(module => {
                return module.deleteChallenge(challengeid).then(data => {

                    module.getAllChallenges().then(challenges => {
                        setChallenges(challenges);
                    })
                });
            });
        }

        
    }

    useEffect(() => {
        if (!localStorage.getItem("token") || localStorage.getItem("token") && localStorage.getItem("token") === '') {
            // window.location.href = "/login";
            navigate("/login")
        }

        document.title = "Challenges - Beheer - Reading Analytics System";

        import("../../components/Data.js").then(module => {
            return module.getAllChallenges().then(data => {
                setChallenges(data);

                setTimeout(() => {
                    $('#DataTable').DataTable({
                        language: {
                            url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Dutch.json',
                            search: "",
                            searchPlaceholder: "Zoeken"
                        },
                        dom: 'rt<"bottom"pl><"clear">',
                        order: []
                    });
                }, 1000)
            });
        });
    }, [])

    $('.btn-add').on('click', function () {
        $('.modal').show();
    });

    $('.modal .close, .modal .cancel').on('click', function () {
        $('.modal').hide();
    });


    return (
        <React.Fragment>
            <SidebarManage />
            <div className="content-manage">
                <h1>Challenges beheren <button type="button" className="btn btn-success btn-add">Toevoegen</button></h1>

                <div className="DataTable_Container">
                    <table id="DataTable" className="showHead table responsive nowrap" width="100%">
                        <thead>
                            <tr>
                                <th>Jaar</th>
                                <th>Challenge</th>
                                <th>Voortgang</th>
                                <th>Acties</th>
                            </tr>
                        </thead>
                        <tbody>
                            {challenges.map((challenge, i) => {

                                var challengePercentage = Math.round((challenge.booksread / challenge.nrofbooks) * 100, 0);

                                return (
                                    <tr key={challenge.id}>
                                        <td width="150px">{challenge.year}</td>
                                        <td width="150px">{challenge.nrofbooks}</td>
                                        <td>
                                            <div className="progress">
                                                <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: challengePercentage + '%' }} aria-valuenow={challengePercentage} aria-valuemin="0" aria-valuemax="100">
                                                    <div className="progress-bar-number">{challengePercentage}%</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td width="150px">
                                            <button type="button" className="btn btn-warning"><i className="fa fa-pen"></i></button>
                                            <button type="button" onClick={() => deleteChallenge(challenge.id)} className="btn btn-danger"><i className="fa fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Challenge toevoegen</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
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
                                <button type="button" className="btn btn-danger cancel" data-dismiss="modal">Annuleren</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ManageChallenges;