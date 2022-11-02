export const initChart = (data, year) => {

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