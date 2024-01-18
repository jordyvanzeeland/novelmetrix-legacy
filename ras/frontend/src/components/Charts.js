export const initChart = (data, ratings, year) => {

    /*
    ----------------------------------
         Books per month per genre
    ----------------------------------
    */

    var genres = [];

    var colors = [
        // '#696ffc', '#7596fa', '#92adfe', '#abc0ff'
        '#404e67', '#01a9ac', '#64c5b1', '#1ABB9C'
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
    data && data.length > 0 ? $(".no-data-msg").remove() : $("canvas#chartGenres").remove();
    data && data.length > 0 ? $("div.books-per-month").append('<canvas id="chart"></canvas>') : $("div.books-per-month").append('<div class="no-data-msg">Geen data beschikbaar</div>');

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
                    grid:{
                        display: false,
                    },
                    ticks: {
                        beginAtZero: true,
                        color: "#333",
                        size: 11,
                    },
                    stacked: true,
                },
                y: {
                    grid:{
                        display: false,
                    },
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                        color: "#333",
                        size: 11,
                    },
                    stacked: true
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        color: "#333",
                        padding: 20,
                        font: {
                            size: 11,
                        }
                    }
                }
            }
        },
        plugins: [legendMargin],
    });
}

export const initDoughnut = (data) => {
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
    data && data.length > 0 ? $(".no-data-msg").remove() : $("canvas#chartGenres").remove();
    data && data.length > 0 ? $("div.genresPercent").append('<canvas id="chartGenres"></canvas>') : $("div.genresPercent").append('<div class="no-data-msg">Geen data beschikbaar</div>');
    
    var ctx = document.getElementById("chartGenres");
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: '# of Tomatoes',
                data: counts,
                backgroundColor: [
                    '#404e67', '#01a9ac', '#64c5b1', '#1ABB9C'
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
            showAllTooltips: true,
            cutout: '80%',
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        // This more specific font property overrides the global property
                        color: "#333",
                        font: {
                            size: 11,
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
        }],
    });
}

export const initHorBar = (data) => {

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