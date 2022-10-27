import React, { Component } from "react";
import Challenge from "./components/Challenge";
import BookStats from "./components/Stats";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            readingYears: [],
            countries: [],
            pagesStats: [],
        }

        this.yearsArray = [];
    }

    getGenres() {
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
    }

    getCountries(init) {
        fetch('/api/books/countries', {
            "method": "GET",
            "headers": {
                "year": this.state.year
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    countries: data
                })

                if (init == true) {
                    $('#DataTable').DataTable({
                        paging: false,
                        ordering: false,
                        info: false,
                        searching: false
                    })
                }
            })
    }

    getShortestLongestBook(currentyear) {
        fetch('/api/books/pages/stats', {
            "method": "GET",
            "headers": {
                "year": currentyear
            }
        })
            .then(response => response.json())
            .then(bookstats => {
                this.setState({
                    pagesStats: bookstats
                })
            })
    }

    changeYear(event) {

        this.setState({
            year: event.target.value
        })

        fetch('/api/books/countries', {
            "method": "GET",
            "headers": {
                "year": event.target.value
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    countries: data
                })

                this.getCountries(false);
            })

        var $this = this;

        this.getShortestLongestBook(event.target.value);

        fetch('/api/books/genres/count', {
            "method": "GET",
            "headers": {
                "year": event.target.value
            }
        })
            .then(response => response.json())
            .then(data => {
                this.initDoughnut(data);
            })

        fetch('/api/books/genres', {
            "method": "GET",
            "headers": {
                "year": event.target.value
            }
        })
            .then(response => response.json())
            .then(books => {
                this.initChart(books, event.target.value);
            })
    }

    initHorBar(data) {

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
                        backgroundColor: '#696ffc',
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

        const legendMargin = {
            id: 'legendMargin',
            beforeInit(chart, legend, options) {
                const fitValue = chart.legend.fit;

                chart.legend.fit = function fit() {
                    fitValue.bind(chart.legend)();
                    return this.height += 30;
                }
            }
        };

        $("canvas#chartGenres").remove();
        $("div.genresPercent").append('<canvas id="chartGenres"></canvas>');

        var ctx = document.getElementById("chartGenres");
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Tomatoes',
                    data: counts,
                    backgroundColor: [
                        '#8066ee', '#58c8d6', '#fe4c62', '#49b8fd', '#ffbe0e'
                    ],
                    borderWidth: 0,
                    borderColor: '#1f2940',
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.label;
                                let value = context.formattedValue;

                                if (!label)
                                    label = 'Unknown'

                                let sum = 0;
                                let dataArr = context.chart.data.datasets[0].data;
                                dataArr.map(data => {
                                    sum += Number(data);
                                });

                                let percentage = (value * 100 / sum).toFixed(1) + '%';
                                return label + ": " + percentage;
                            }
                        }
                    }
                }]
            },
            options: {
                cutout: '80%',
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            // This more specific font property overrides the global property
                            color: "##101010",
                            font: {
                                size: 14,
                                family: 'Source Sans Pro'
                            }
                        }
                    }
                }
            },
            plugins: [{
                id: 'legendMargin',
                beforeInit(chart, legend, options) {
                    const fitValue = chart.legend.fit;

                    chart.legend.fit = function fit() {
                        fitValue.bind(chart.legend)();
                        return this.height += 30;
                    }
                }
            }, {
                afterDraw: chart => {
                    var ctx = chart.ctx;
                    ctx.save();
                    var image = new Image();
                    image.src = 'https://www.iconsdb.com/icons/preview/gray/book-xxl.png';
                    var imageSize = 80;
                    ctx.drawImage(image, chart.width / 2 - imageSize / 2, chart.height / 2 - imageSize / 6, imageSize, imageSize);
                    ctx.restore();
                }
            }],
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
            // '#696ffc', '#7596fa', '#92adfe', '#abc0ff'
            '#8066ee', '#58c8d6', '#fe4c62', '#49b8fd', '#ffbe0e'
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

        const legendMargin = {
            id: 'legendMargin',
            beforeInit(chart, legend, options) {
                const fitValue = chart.legend.fit;

                chart.legend.fit = function fit() {
                    fitValue.bind(chart.legend)();
                    return this.height += 30;
                }
            }
        };

        new Chart(document.getElementById('chart'), {
            type: 'bar',
            data: {
                labels: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
                datasets: dataSet
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                showTooltips: true,
                legend: {
                    display: true,
                    labels: {
                        usePointStyle: true,
                    }
                },
                interaction: {
                    mode: 'index'
                },
                scales: {
                    x: {
                        ticks: {
                            beginAtZero: true,
                            color: "#101010",
                            fontFamily: "Source Sans Pro",
                        },
                        stacked: true,
                    },
                    y: {
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1,
                            color: "#101010",
                            fontFamily: "Source Sans Pro",
                        },
                        stacked: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            color: "#101010",
                            padding: 20,
                            font: {
                                size: 14,
                                family: 'Source Sans Pro',
                            }
                        }
                    }
                },
                tooltips: {
                    bodyFont: 'Source Sans Pro'
                }
            },
            plugins: [legendMargin],
        });
    }

    componentDidMount() {

        var $this = this;

        var currentyear = this.state.year ? this.state.year : new Date().getFullYear();

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

        this.getShortestLongestBook(this.state.year);

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

        this.getCountries(true);

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
        var url = window.location.href.split("/");
        var ratingshort = '';
        var ratinglong = '';


        if (this.state.pagesStats.shortestbook) {
            for (var i = 0; i < this.state.pagesStats.shortestbook.rating; i++) {
                ratingshort += "<i class='fas fa-star'></i>";
            }
        }

        if (document.getElementById("shortest_rating") !== null) {
            document.getElementById('shortest_rating').innerHTML = ratingshort;
        }

        if (this.state.pagesStats.longestbook) {
            for (var i = 0; i < this.state.pagesStats.longestbook.rating; i++) {
                ratinglong += "<i class='fas fa-star'></i>";
            }
        }

        if (document.getElementById("longest_rating") !== null) {
            document.getElementById('longest_rating').innerHTML = ratinglong;
        }

        return (


            <React.Fragment>
                <div className="sidebar">
                    <div className={`menu-item ${url && url[3] == "" ? 'selected' : ''}`}>
                        <i className="fa fa-chart-bar"></i>
                    </div>
                    <div className={`menu-item ${url && url[3] == "books" ? 'selected' : ''}`}>
                        <i className="fa fa-book"></i>
                    </div>

                </div>
                <div className="content">

                    <h1>Dashboard</h1>
                    <h2>Leesanalyse van Jordy van Zeeland</h2>

                    <div className="books-stats">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-2">
                                    <div className="stat-block">
                                        <i className="fa fa-calendar"></i>
                                        <span className="stats-number">
                                            <select className="yearselector" defaultValue={this.state.year} onChange={(event) => this.changeYear(event)}>
                                                {this.state.readingYears.map((year, i) => {

                                                    if (year === this.state.year) {
                                                        var selected = 'selected'
                                                    } else {
                                                        selected = ''
                                                    }

                                                    return (<option key={i} selected={selected} value={year}>{year}</option>)
                                                })}
                                            </select>
                                        </span>
                                    </div>
                                </div>

                                <BookStats year={this.state.year} />
                            </div>
                        </div>
                    </div>

                    <Challenge year={this.state.year} />

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-9">
                                <div className="books-per-month"><span className="block_name">Boeken per maand per genre</span><canvas id="chart"></canvas></div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="book shortest">
                                            <span className="block_name">Kortste boek</span>
                                            <i className="fa fa-book book-icon"></i>
                                            <div className="book_pages">{this.state.pagesStats.shortestbook ? this.state.pagesStats.shortestbook.pages : ''} pagina's</div>
                                            <div className="book_title_author">{this.state.pagesStats.shortestbook ? this.state.pagesStats.shortestbook.name : ''} - {this.state.pagesStats.shortestbook ? this.state.pagesStats.shortestbook.author : ''}</div>
                                            <div id="shortest_rating" className="book_rating"></div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="book longest">
                                            <span className="block_name">Langste boek</span>
                                            <i className="fa fa-book book-icon"></i>
                                            <div className="book_pages">{this.state.pagesStats.longestbook ? this.state.pagesStats.longestbook.pages : ''} pagina's</div>
                                            <div className="book_title_author">{this.state.pagesStats.longestbook ? this.state.pagesStats.longestbook.name : ''} - {this.state.pagesStats.longestbook ? this.state.pagesStats.longestbook.author : ''}</div>
                                            <div id="longest_rating" className="book_rating"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="books-per-country">
                                    <span className="block_name">Landen</span>
                                    <table id="DataTable" className="showHead table responsive nowrap" width="100%">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Land</th>
                                                <th>Boeken</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.countries.map((country, i) => {

                                                var code = country.code.toLowerCase();
                                                return (
                                                    <React.Fragment>
                                                        <tr key="{i}">
                                                            <td>{i + 1}</td>
                                                            <td><img src={`https://flagcdn.com/32x24/${code}.png`} /> {country.country}</td>
                                                            <td>{country.count}</td>
                                                        </tr>
                                                    </React.Fragment>
                                                )

                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="genresPercent"><span className="block_name">Genres</span><canvas id="chartGenres"></canvas></div>
                            </div>

                        </div>
                    </div>


                </div>
            </React.Fragment>
        )
    }
}