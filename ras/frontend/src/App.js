import React, { Component } from "react";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    initChart(data, ratings, year) {

        /*
        ----------------------------------
             Books per month per genre
        ----------------------------------
        */

        var genres = [];

        var colors = [
            '#696ffc', '#7596fa', '#92adfe', '#abc0ff'
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
                    backgroundColor: colors[index],
                    order: 2
                })
            })
        }

        /*
        ----------------------------------
             Avarage ratings per month
        ----------------------------------
        */

        var avgRatings = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (var j = 0; j < 12; j++) {

            if (j < 9) {
                var month = "0" + (j + 1)
            } else {
                month = (j + 1)
            }

            for (var i = 0; i < ratings.length; i++) {
                if (ratings[i].date == month + '-' + year) {
                    avgRatings[j] = ratings[i].rating;
                }
            }
        }

        dataSet.push({
            label: 'Gemiddelde beoordeling',
            data: avgRatings,
            backgroundColor: '#ffa500',
            borderColor: '#ffa500',
            tension: 0.4,
            type: 'line',
            order: 1
        })

        /*
        ----------------------------------
             Stacked bar chart
        ----------------------------------
        */

        new Chart(document.getElementById('chart'), {
            type: 'bar',
            data: {
                labels: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
                datasets: dataSet
            },
            options: {
                responsive: true,
                showTooltips: true,
                legend: {
                    display: true,
                },
                interaction: {
                    mode: 'index'
                },
                scales: {
                    x: {
                        ticks: {
                            beginAtZero: true,
                            color: "white",
                        },
                        stacked: true,
                    },
                    y: {
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1,
                            color: "white",
                        },
                        stacked: true
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: "white"
                        }
                    }
                }
            }
        });
    }

    componentDidMount() {

        var currentyear = new Date("2021-09-29").getFullYear()

        fetch('/api/books/genres', {
            "method": "GET",
            "headers": {
                "year": currentyear
            }
        })
            .then(response => response.json())
            .then(books => {
                fetch('/api/ratings', {
                    "method": "GET",
                    "headers": {
                        "year": currentyear
                    }
                })
                    .then(response => response.json())
                    .then(ratings => {
                        console.log(ratings);
                        this.initChart(books, ratings, currentyear);
                    })

            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="books-per-month"><canvas id="chart"></canvas></div>
            </React.Fragment>

        )
    }
}