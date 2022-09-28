import React, { Component } from "react";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    initChart(data, year) {

        var genres = [];

        var colors = [
            '#d0b2cf', '#b66f2b', '#003C72', '#ecdb0e'
        ]

        var dataSet = []; 

        data.forEach(book => {
            if (!genres.includes(book.genre)) {
                genres.push(book.genre)
            }
        });

        if (genres && genres.length > 0) {
            genres.forEach((genre, index) => {
                var genreData = [];

                for (var i = 0; i < 12; i++) {

                    genreData[i] = 0;

                    if ((i + 1) < 10) {
                        var month = "0" + (i + 1);
                    } else {
                        month = (i + 1);
                    }

                    for (var j = 0; j < data.length; j++) {
                        if (data && data[j] && data[j].readed == month + '-' + year) {
                            if (data[j].genre == genre) {
                                genreData[i] = data[j].count;
                            }

                        }
                    }
                }

                dataSet.push({
                    label: genre,
                    data: genreData,
                    backgroundColor: colors[index]
                })
            })
        }

        new Chart(document.getElementById('chart'), {
            type: 'bar',
            data: {
                labels: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
                datasets: dataSet
            },
            options: {
                legend: {
                    display: true,
                },
                tooltips: {
                    mode: 'index',
                    intersect: true,
                    axis: 'y'
                },
                scales: {
                    x: {
                        ticks: {
                            beginAtZero: true,

                        },
                        stacked: true,
                    },
                    y: {
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1
                        },
                        stacked: true
                    }
                }
            }
        });
    }

    componentDidMount() {

        var currentyear = new Date().getFullYear()

        console.log(currentyear);

        fetch('/api/books/genres', {
            "method": "GET",
            "headers": {
                "year": currentyear
            }
        })
            .then(response => response.json())
            .then(data => {
                this.initChart(data, currentyear);
                console.log(data);
            })
    }

    render() {
        return (
            <React.Fragment>
                <canvas id="chart"></canvas>
                <p>Soon here comes the Reading Analytics System! test</p>
            </React.Fragment>

        )
    }
}