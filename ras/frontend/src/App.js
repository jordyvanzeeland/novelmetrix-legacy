import React, { Component } from "react";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear(),
        }

        this.yearsArray = [];
    }

    changeYear(event) {
        this.setState({
            year: event.target.value
        })
    }

    initDoughnut(data) {

        var labels = [];
        var counts = [];

        data.forEach((count) => {
            if (!labels.includes(count.genre)) {
                labels.push(count.genre)
            }

            counts.push(count.count)
        })

        $("canvas#chartGenres").remove();
        $("div.genresPercent").append('<canvas id="chartGenres"></canvas>');

        var ctx = document.getElementById("chartGenres");
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Tomatoes',
                    data: counts,
                    backgroundColor: [
                        '#696ffc', '#7596fa', '#92adfe', '#abc0ff'
                    ],
                    borderWidth: 3,
                    borderColor: '#1f2940'
                }]
            },
            options: {
                //cutoutPercentage: 40,
                responsive: true,

            }
        });
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

        $("canvas#chart").remove();
        $("div.books-per-month").append('<canvas id="chart"></canvas>');

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

    componentDidUpdate() {
        fetch('/api/books/genres', {
            "method": "GET",
            "headers": {
                "year": this.state.year
            }
        })
            .then(response => response.json())
            .then(books => {
                fetch('/api/ratings', {
                    "method": "GET",
                    "headers": {
                        "year": this.state.year
                    }
                })
                    .then(response => response.json())
                    .then(ratings => {
                        this.initChart(books, ratings, this.state.year);
                    })

            })

        fetch('/api/books/genres/count', {
            "method": "GET",
            "headers": {
                "year": this.state.year
            }
        })
            .then(response => response.json())
            .then(data => {
                this.initDoughnut(data);
            })
    }

    componentDidMount() {

        var currentyear = this.state.year ? this.state.year : new Date().getFullYear()

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
                        this.initChart(books, ratings, currentyear);
                    })

            })

        fetch('/api/books/genres/count', {
            "method": "GET",
            "headers": {
                "year": this.state.year
            }
        })
            .then(response => response.json())
            .then(data => {
                this.initDoughnut(data);
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="sidebar">
                    <ul className="sidebar_menu">
                        <li className="menu-item">
                            <div className="menu-item-label">
                                <div className="menu-item-label-name"><i className="fa fa-chart-bar"></i> Dashboard</div>
                            </div>
                        </li>
                        <li>
                            <div className="menu-item-label">
                                <div className="menu-item-label-name"><i class="fa fa-book-open"></i> Boeken</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="content">
                    <div className="filter">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-4">
                                    <span style={{ color: '#ffffff', display: 'inline-block', width: 'auto' }}>Jaar: </span>
                                    <select style={{ display: 'inline-block', width: 'auto' }} defaultValue={this.state.year} onChange={(event) => this.changeYear(event)}>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                    </select>
                                </div>

                                <div className="col-md-4"></div>

                                <div className="col-md-4"></div>
                            </div>
                        </div>
                    </div>

                    <div className="books-stats">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="stat-block">
                                        <span>Boeken</span>
                                        <span>17</span>
                                        <span>-20%</span>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="stat-block">
                                        <span>Bladzijdes</span>
                                        <span>512</span>
                                        <span>+5%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="books-per-month"><canvas id="chart"></canvas></div>
                            </div>
                            <div className="col-md-4">
                                <div className="genresPercent"><canvas id="chartGenres"></canvas></div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}