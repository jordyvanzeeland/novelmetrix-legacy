import React, { Component } from "react";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            readingYears: [],
            totalbooks: 0,
            totalpages: 0,
            totalauthors: 0,
            totalcountries: 0,
            totalgenres: 0
        }

        this.yearsArray = [];
    }

    changeYear(event) {

        this.setState({
            year: event.target.value
        })

        fetch('/api/books/stats', {
            "method": "GET",
            "headers": {
                "year": event.target.value
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    totalbooks: data.totalbooks,
                    totalpages: data.totalpages,
                    totalauthors: data.totalauthors,
                    totalcountries: data.totalcountries,
                    totalgenres: data.totalgenres
                })
            })
    }

    initHorBar(data){

        var countries = [];
        var counts = [];

        data.forEach((count) => {
            if (!countries.includes(count.country)) {
                countries.push(count.country)
            }

            counts.push(count.count)
        })

        $("canvas#countryChart").remove();
        $("div.books-per-country").append('<canvas id="countryChart"></canvas>');

        var ctx = document.getElementById("countryChart");
        new Chart(ctx, {
            type: 'bar',
            options: {
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    },
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
            },
            data: {
                labels: countries,
                datasets: [
                    {
                        label: "Boeken",
                        data: counts,
                        backgroundColor: '#696ffc'
                    }]
            }
        });
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

    initChart(data, year) {

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
        var $this = this;

        fetch('/api/books/genres', {
            "method": "GET",
            "headers": {
                "year": this.state.year
            }
        })
            .then(response => response.json())
            .then(books => {
                this.initChart(books, this.state.year);
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

        fetch('/api/books/countries', {
            "method": "GET",
            "headers": {
                "year": this.state.year
            }
        })
            .then(response => response.json())
            .then(data => {
                this.initHorBar(data);
            })


        
    }

    componentDidMount() {

        var $this = this;

        var currentyear = this.state.year ? this.state.year : new Date().getFullYear()

        fetch('/api/books/genres', {
            "method": "GET",
            "headers": {
                "year": currentyear
            }
        })
            .then(response => response.json())
            .then(books => {
                this.initChart(books, currentyear);
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

        fetch('/api/books/countries', {
            "method": "GET",
            "headers": {
                "year": this.state.year
            }
        })
            .then(response => response.json())
            .then(data => {
                this.initHorBar(data);
            })

        fetch('/api/books/stats', {
            "method": "GET",
            "headers": {
                "year": this.state.year
            }
        })
            .then(response => response.json())
            .then(data => {
                $this.setState({
                    totalbooks: data.totalbooks,
                    totalpages: data.totalpages,
                    totalauthors: data.totalauthors,
                    totalcountries: data.totalcountries,
                    totalgenres: data.totalgenres
                })
            })

            fetch('/api/books/years', {
                "method": "GET",
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        readingYears: data
                    })
                })
    }

    render() {
        return (
            <React.Fragment>
                <div className="content">
                    <div className="books-stats">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-2">
                                    <div className="stat-block">
                                        <i class="fa fa-calendar"></i>
                                        <span className="stats-number">
                                            <select className="yearselector" defaultValue={this.state.year} onChange={(event) => this.changeYear(event)}>
                                                {this.state.readingYears.map((year) => {

                                                    if(year === this.state.year){
                                                        var selected = 'selected'
                                                    }else{
                                                        selected = ''
                                                    }

                                                    return(<option selected={selected} value={year}>{year}</option>)
                                                })}
                                            </select>
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="col-md-2">
                                    <div className="stat-block">
                                        <i class="fa fa-book"></i>
                                        <span className="stats-number">{this.state.totalbooks}</span>
                                        <span className="stats-label">Boeken</span>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="stat-block">
                                        <i class="fa fa-book-open"></i>
                                        <span className="stats-number">{this.state.totalpages}</span>
                                        <span className="stats-label">Bladzijdes</span>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="stat-block">
                                        <i class="fa fa-pen"></i>
                                        <span className="stats-number">{this.state.totalauthors}</span>
                                        <span className="stats-label">Schrijvers</span>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="stat-block">
                                        <i class="fa fa-book"></i>
                                        <span className="stats-number">{this.state.totalgenres}</span>
                                        <span className="stats-label">Genres</span>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="stat-block">
                                        <i class="fa fa-globe"></i>
                                        <span className="stats-number">{this.state.totalcountries}</span>
                                        <span className="stats-label">Landen</span>
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

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="books-per-country"><canvas id="countryChart"></canvas></div>
                            </div>
                            <div className="col-md-6">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}