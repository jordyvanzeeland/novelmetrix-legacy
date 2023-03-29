/*! For license information please see src_views_dashboard_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_views_dashboard_js"],{"./src/components/Books.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Books)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Data.js */ "./src/components/Data.js");\n/* harmony import */ var _Charts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Charts.js */ "./src/components/Charts.js");\n\n\n\nclass Books extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      books: []\n    };\n  }\n  getComponentData() {\n    (0,_Data_js__WEBPACK_IMPORTED_MODULE_1__.getBooksPerYearPerGenres)(this.props.year).then(books => {\n      this.setState({\n        books: books\n      });\n      (0,_Data_js__WEBPACK_IMPORTED_MODULE_1__.getAvgRatings)(this.props.year).then(ratings => {\n        (0,_Charts_js__WEBPACK_IMPORTED_MODULE_2__.initChart)(books, ratings, this.props.year);\n      });\n    });\n  }\n  componentDidMount() {\n    this.getComponentData();\n  }\n  componentDidUpdate(prevProps, prevState) {\n    if (prevProps.year !== this.props.year) {\n      this.getComponentData();\n    }\n  }\n  render() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "books-per-month"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "block_name"\n    }, "Boeken per maand per genre"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("canvas", {\n      id: "chart"\n    })));\n  }\n}\n\n//# sourceURL=webpack://frontend/./src/components/Books.js?')},"./src/components/Challenge.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Challenge)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Data.js */ "./src/components/Data.js");\n\n\nclass Challenge extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      readingYears: [],\n      challenge: 0\n    };\n  }\n  getComponentData() {\n    var $this = this;\n    (0,_Data_js__WEBPACK_IMPORTED_MODULE_1__.getStats)(this.props.year).then(data => {\n      $this.setState({\n        totalbooks: data.totalbooks\n      });\n    });\n    (0,_Data_js__WEBPACK_IMPORTED_MODULE_1__.getChallenge)(this.props.year).then(data => {\n      this.setState({\n        challenge: data && data.length > 0 ? data[0].nrofbooks : 0\n      });\n    });\n  }\n  componentDidMount() {\n    this.getComponentData();\n  }\n  componentDidUpdate(prevProps, prevState) {\n    if (prevProps.year !== this.props.year) {\n      this.getComponentData();\n    }\n  }\n  render() {\n    var challengePercentage = Math.round(this.state.totalbooks / this.state.challenge * 100, 0);\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, this.state.challenge && this.state.challenge !== 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "stat-block",\n      style: {\n        marginBottom: \'20px\'\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "block_name"\n    }, "Book Challenge"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "progress"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "progress-bar progress-bar-striped",\n      role: "progressbar",\n      style: {\n        width: challengePercentage + \'%\'\n      },\n      "aria-valuenow": challengePercentage,\n      "aria-valuemin": "0",\n      "aria-valuemax": "100"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "progress-bar-number"\n    }, challengePercentage, "%"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "stats-number"\n    }, this.state.totalbooks), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "stats-label"\n    }, "van de"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "stats-number"\n    }, this.state.challenge), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "stats-label"\n    }, "boeken gelezen")) : \'\');\n  }\n}\n\n//# sourceURL=webpack://frontend/./src/components/Challenge.js?')},"./src/components/Charts.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initChart\": () => (/* binding */ initChart),\n/* harmony export */   \"initDoughnut\": () => (/* binding */ initDoughnut),\n/* harmony export */   \"initHorBar\": () => (/* binding */ initHorBar)\n/* harmony export */ });\nconst initChart = (data, ratings, year) => {\n  /*\n  ----------------------------------\n       Books per month per genre\n  ----------------------------------\n  */\n\n  var genres = [];\n  var colors = [\n  // '#696ffc', '#7596fa', '#92adfe', '#abc0ff'\n  '#8066ee', '#58c8d6', '#fe4c62', '#49b8fd', '#ffbe0e'];\n  var dataSet = [];\n  data.forEach(book => {\n    if (!genres.includes(book.genre)) {\n      genres.push(book.genre);\n    }\n  });\n  if (genres && genres.length > 0) {\n    genres.forEach((genre, index) => {\n      var genreData = [];\n      for (var i = 0; i < 12; i++) {\n        genreData[i] = 0;\n        if (i + 1 < 10) {\n          var month = \"0\" + (i + 1);\n        } else {\n          month = i + 1;\n        }\n        for (var j = 0; j < data.length; j++) {\n          if (data && data[j] && data[j].readed == month + '-' + year) {\n            if (data[j].genre == genre) {\n              genreData[i] = data[j].count;\n            }\n          }\n        }\n      }\n      dataSet.push({\n        label: genre,\n        data: genreData,\n        backgroundColor: colors[index],\n        order: 2\n      });\n    });\n  }\n\n  /*\n      ----------------------------------\n           Avarage ratings per month\n      ----------------------------------\n      */\n\n  var avgRatings = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];\n  for (var j = 0; j < 12; j++) {\n    if (j < 9) {\n      var month = \"0\" + (j + 1);\n    } else {\n      month = j + 1;\n    }\n    for (var i = 0; i < ratings.length; i++) {\n      if (ratings[i].date == month + '-' + year) {\n        avgRatings[j] = ratings[i].rating;\n      }\n    }\n  }\n  dataSet.push({\n    label: 'Gemiddelde beoordeling',\n    data: avgRatings,\n    backgroundColor: '#ffa500',\n    borderColor: '#ffa500',\n    tension: 0.4,\n    type: 'line',\n    order: 1\n  });\n  console.log(dataSet);\n\n  /*\n  ----------------------------------\n       Stacked bar chart\n  ----------------------------------\n  */\n\n  $(\"canvas#chart\").remove();\n  $(\"div.books-per-month\").append('<canvas id=\"chart\"></canvas>');\n  const legendMargin = {\n    id: 'legendMargin',\n    beforeInit(chart, legend, options) {\n      const fitValue = chart.legend.fit;\n      chart.legend.fit = function fit() {\n        fitValue.bind(chart.legend)();\n        return this.height += 30;\n      };\n    }\n  };\n  new Chart(document.getElementById('chart'), {\n    type: 'bar',\n    data: {\n      labels: [\"Januari\", \"Februari\", \"Maart\", \"April\", \"Mei\", \"Juni\", \"Juli\", \"Augustus\", \"September\", \"Oktober\", \"November\", \"December\"],\n      datasets: dataSet\n    },\n    options: {\n      maintainAspectRatio: false,\n      responsive: true,\n      showTooltips: true,\n      legend: {\n        display: true,\n        labels: {\n          usePointStyle: true\n        }\n      },\n      interaction: {\n        mode: 'index'\n      },\n      scales: {\n        x: {\n          ticks: {\n            beginAtZero: true,\n            color: \"#101010\",\n            fontFamily: \"Source Sans Pro\"\n          },\n          stacked: true\n        },\n        y: {\n          ticks: {\n            beginAtZero: true,\n            stepSize: 1,\n            color: \"#101010\",\n            fontFamily: \"Source Sans Pro\"\n          },\n          stacked: true\n        }\n      },\n      plugins: {\n        legend: {\n          position: 'top',\n          labels: {\n            usePointStyle: true,\n            color: \"#101010\",\n            padding: 20,\n            font: {\n              size: 14,\n              family: 'Source Sans Pro'\n            }\n          }\n        }\n      },\n      tooltips: {\n        bodyFont: 'Source Sans Pro'\n      }\n    },\n    plugins: [legendMargin]\n  });\n};\nconst initDoughnut = data => {\n  console.log(data);\n  var labels = [];\n  var counts = [];\n  data.forEach(count => {\n    if (!labels.includes(count.genre)) {\n      labels.push(count.genre);\n    }\n    counts.push(count.count);\n  });\n  const legendMargin = {\n    id: 'legendMargin',\n    beforeInit(chart, legend, options) {\n      const fitValue = chart.legend.fit;\n      chart.legend.fit = function fit() {\n        fitValue.bind(chart.legend)();\n        return this.height += 30;\n      };\n    }\n  };\n  $(\"canvas#chartGenres\").remove();\n  $(\"div.genresPercent\").append('<canvas id=\"chartGenres\"></canvas>');\n  var ctx = document.getElementById(\"chartGenres\");\n  var myChart = new Chart(ctx, {\n    type: 'pie',\n    data: {\n      labels: labels,\n      datasets: [{\n        label: '# of Tomatoes',\n        data: counts,\n        backgroundColor: ['#8066ee', '#58c8d6', '#fe4c62', '#49b8fd', '#ffbe0e'],\n        borderWidth: 0,\n        borderColor: '#1f2940',\n        tooltip: {\n          callbacks: {\n            label: function (context) {\n              let label = context.label;\n              let value = context.formattedValue;\n              if (!label) label = 'Unknown';\n              let sum = 0;\n              let dataArr = context.chart.data.datasets[0].data;\n              dataArr.map(data => {\n                sum += Number(data);\n              });\n              let percentage = (value * 100 / sum).toFixed(1) + '%';\n              return label + \": \" + percentage;\n            }\n          }\n        }\n      }]\n    },\n    options: {\n      cutout: '80%',\n      responsive: true,\n      plugins: {\n        legend: {\n          position: 'top',\n          labels: {\n            padding: 20,\n            usePointStyle: true,\n            // This more specific font property overrides the global property\n            color: \"##101010\",\n            font: {\n              size: 14,\n              family: 'Source Sans Pro'\n            }\n          }\n        }\n      }\n    },\n    plugins: [{\n      id: 'legendMargin',\n      beforeInit(chart, legend, options) {\n        const fitValue = chart.legend.fit;\n        chart.legend.fit = function fit() {\n          fitValue.bind(chart.legend)();\n          return this.height += 30;\n        };\n      }\n    }]\n  });\n};\nconst initHorBar = data => {\n  var countries = [];\n  var counts = [];\n  data.forEach(count => {\n    if (!countries.includes(count.country)) {\n      countries.push(count.country);\n    }\n    counts.push(count.count);\n  });\n  $(\"canvas#countryChart\").remove();\n  $(\"div.books-per-country\").append('<canvas id=\"countryChart\"></canvas>');\n  var ctx = document.getElementById(\"countryChart\");\n  new Chart(ctx, {\n    type: 'bar',\n    options: {\n      indexAxis: 'y',\n      plugins: {\n        legend: {\n          display: false\n        }\n      },\n      scales: {\n        x: {\n          ticks: {\n            beginAtZero: true,\n            color: \"white\"\n          },\n          stacked: true\n        },\n        y: {\n          ticks: {\n            beginAtZero: true,\n            stepSize: 1,\n            color: \"white\"\n          },\n          stacked: true\n        }\n      }\n    },\n    data: {\n      labels: countries,\n      datasets: [{\n        label: \"Boeken\",\n        data: counts,\n        backgroundColor: '#696ffc'\n      }]\n    }\n  });\n};\n\n//# sourceURL=webpack://frontend/./src/components/Charts.js?")},"./src/components/Countries.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Countries)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Data.js */ "./src/components/Data.js");\n\n\nclass Countries extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      countries: []\n    };\n  }\n  getComponentData() {\n    (0,_Data_js__WEBPACK_IMPORTED_MODULE_1__.getCountries)(this.props.year).then(countries => {\n      this.setState({\n        countries: countries\n      });\n    });\n  }\n  componentDidMount() {\n    this.getComponentData();\n  }\n  componentDidUpdate(prevProps, prevState) {\n    if (prevProps.year !== this.props.year) {\n      this.getComponentData();\n    }\n  }\n  render() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "books-per-country"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "block_name"\n    }, "Landen"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("table", {\n      id: "DataTable",\n      className: "table responsive nowrap",\n      width: "100%"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null, "#"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null, "Land"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null, "Boeken"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tbody", null, this.state.countries.map((country, i) => {\n      var code = country.code.toLowerCase();\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", {\n        key: i\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, i + 1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {\n        src: `https://flagcdn.com/32x24/${code}.png`\n      }), " ", country.country), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, country.count));\n    })))));\n  }\n}\n\n//# sourceURL=webpack://frontend/./src/components/Countries.js?')},"./src/components/Data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "getAllBooks": () => (/* binding */ getAllBooks),\n/* harmony export */   "getAvgRatings": () => (/* binding */ getAvgRatings),\n/* harmony export */   "getBooksPerYearPerGenres": () => (/* binding */ getBooksPerYearPerGenres),\n/* harmony export */   "getChallenge": () => (/* binding */ getChallenge),\n/* harmony export */   "getCountries": () => (/* binding */ getCountries),\n/* harmony export */   "getGenresCount": () => (/* binding */ getGenresCount),\n/* harmony export */   "getRatingsCount": () => (/* binding */ getRatingsCount),\n/* harmony export */   "getReadingYears": () => (/* binding */ getReadingYears),\n/* harmony export */   "getShortestLongestBook": () => (/* binding */ getShortestLongestBook),\n/* harmony export */   "getStats": () => (/* binding */ getStats)\n/* harmony export */ });\nconst getAllBooks = () => {\n  return fetch(\'/api/books\', {\n    "method": "GET"\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getStats = year => {\n  return fetch(\'/api/books/stats\', {\n    "method": "GET",\n    "headers": {\n      "year": year\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getChallenge = year => {\n  return fetch(\'/api/books/challenge\', {\n    "method": "GET",\n    "headers": {\n      "year": year\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getReadingYears = () => {\n  return fetch(\'/api/books/years\', {\n    "method": "GET"\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getCountries = year => {\n  return fetch(\'/api/books/countries\', {\n    "method": "GET",\n    "headers": {\n      "year": year\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getShortestLongestBook = year => {\n  return fetch(\'/api/books/pages/stats\', {\n    "method": "GET",\n    "headers": {\n      "year": year\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getBooksPerYearPerGenres = year => {\n  return fetch(\'/api/books/genres\', {\n    "method": "GET",\n    "headers": {\n      "year": year\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getGenresCount = year => {\n  return fetch(\'/api/books/genres/count\', {\n    "method": "GET",\n    "headers": {\n      "year": year\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getAvgRatings = year => {\n  return fetch(\'/api/books/ratings\', {\n    "method": "GET",\n    "headers": {\n      "year": year\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getRatingsCount = year => {\n  return fetch(\'/api/books/ratings/count\', {\n    "method": "GET",\n    "headers": {\n      "year": year\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\n\n//# sourceURL=webpack://frontend/./src/components/Data.js?')},"./src/components/Genres.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Genres)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Data.js */ "./src/components/Data.js");\n/* harmony import */ var _Charts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Charts.js */ "./src/components/Charts.js");\n\n\n\nclass Genres extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      genres: []\n    };\n  }\n  getComponentData() {\n    (0,_Data_js__WEBPACK_IMPORTED_MODULE_1__.getGenresCount)(this.props.year).then(genres => {\n      this.setState({\n        genres: genres\n      });\n      (0,_Charts_js__WEBPACK_IMPORTED_MODULE_2__.initDoughnut)(genres, this.props.year);\n    });\n  }\n  componentDidMount() {\n    this.getComponentData();\n  }\n  componentDidUpdate(prevProps, prevState) {\n    if (prevProps.year !== this.props.year) {\n      this.getComponentData();\n    }\n  }\n  render() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "genresPercent"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "block_name"\n    }, "Genres"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("canvas", {\n      id: "chartGenres"\n    })));\n  }\n}\n\n//# sourceURL=webpack://frontend/./src/components/Genres.js?')},"./src/components/Ratings.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Ratings)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Data.js */ "./src/components/Data.js");\n/* harmony import */ var _Charts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Charts.js */ "./src/components/Charts.js");\n\n\n\nclass Ratings extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      ratings: [],\n      totalRatings: 0\n    };\n  }\n  getComponentData() {\n    (0,_Data_js__WEBPACK_IMPORTED_MODULE_1__.getRatingsCount)(this.props.year).then(ratings => {\n      var total = 0;\n      ratings.forEach(rating => {\n        total += rating.count;\n      });\n      var ratingsArray = {\n        5: 0,\n        4: 0,\n        3: 0,\n        2: 0,\n        1: 0\n      };\n      for (var i = 5; i > 0; i--) {\n        ratings.forEach(rating => {\n          if (rating.rating === i) {\n            ratingsArray[i] = rating.count;\n          }\n        });\n      }\n      console.log(Object.entries(ratingsArray));\n      this.setState({\n        ratings: Object.entries(ratingsArray),\n        totalRatings: total\n      });\n    });\n  }\n  componentDidMount() {\n    this.getComponentData();\n  }\n  componentDidUpdate(prevProps, prevState) {\n    if (prevProps.year !== this.props.year) {\n      this.getComponentData();\n    }\n  }\n  render() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "ratings"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "block_name"\n    }, "Waarderingen (", this.state.totalRatings, ")"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("table", {\n      id: "DataTable",\n      className: "table responsive nowrap",\n      width: "100%"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null, "#"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null, "percentage"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null, "aantal"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tbody", null, this.state.ratings.map(rating => {\n      var ratingstars = \'\';\n      var rating_percentage = rating[1] / this.state.totalRatings * 100;\n      console.log(rating[1], this.state.totalRatings);\n      if (rating[0]) {\n        for (var i = 0; i < rating[0]; i++) {\n          ratingstars += "<i class=\'fas fa-star\'></i>";\n        }\n      }\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {\n        style: {\n          width: \'150px\'\n        },\n        className: "book_rating",\n        dangerouslySetInnerHTML: {\n          __html: ratingstars\n        }\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {\n        style: {\n          width: \'257px\'\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n        className: "progress"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n        className: "progress-bar progress-bar-striped",\n        role: "progressbar",\n        style: {\n          width: rating_percentage + \'%\'\n        },\n        "aria-valuenow": rating_percentage,\n        "aria-valuemin": "0",\n        "aria-valuemax": "100"\n      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, rating[1]));\n    })))));\n  }\n}\n\n//# sourceURL=webpack://frontend/./src/components/Ratings.js?')},"./src/components/Sidebar.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");\n\n\nfunction Sidebar() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "sidebar"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.NavLink, {\n    to: "/"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("i", {\n    className: "fa fa-chart-bar"\n  }), " Dashboard")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.NavLink, {\n    to: "/booklist"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("i", {\n    className: "fas fa-book"\n  }), " Boekenlijst")))));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sidebar);\n\n//# sourceURL=webpack://frontend/./src/components/Sidebar.js?')},"./src/views/dashboard.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Dashboard)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_Challenge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Challenge */ "./src/components/Challenge.js");\n/* harmony import */ var _components_Countries__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Countries */ "./src/components/Countries.js");\n/* harmony import */ var _components_Genres__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Genres */ "./src/components/Genres.js");\n/* harmony import */ var _components_Books__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Books */ "./src/components/Books.js");\n/* harmony import */ var _components_Data_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Data.js */ "./src/components/Data.js");\n/* harmony import */ var _components_Sidebar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Sidebar */ "./src/components/Sidebar.js");\n/* harmony import */ var _components_Ratings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Ratings */ "./src/components/Ratings.js");\n\n\n\n\n\n\n\n\nclass Dashboard extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      year: new Date().getFullYear(),\n      readingYears: []\n    };\n  }\n  changeYear(event) {\n    this.setState({\n      year: event.target.value\n    });\n  }\n  componentDidMount() {\n    (0,_components_Data_js__WEBPACK_IMPORTED_MODULE_5__.getReadingYears)().then(data => {\n      this.setState({\n        readingYears: data\n      });\n    });\n    (0,_components_Data_js__WEBPACK_IMPORTED_MODULE_5__.getRatingsCount)(this.state.year).then(data => {\n      console.log(data);\n    });\n  }\n  render() {\n    var url = window.location.href.split("/");\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "chooseYear"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("i", {\n      className: "fa fa-calendar"\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "stats-number"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {\n      className: "yearselector",\n      value: this.state.year,\n      onChange: event => this.changeYear(event)\n    }, this.state.readingYears.map((year, i) => {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {\n        key: i,\n        value: year\n      }, year);\n    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Sidebar__WEBPACK_IMPORTED_MODULE_6__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "content"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "container-fluid"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "row"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "col-md-8"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Challenge__WEBPACK_IMPORTED_MODULE_1__["default"], {\n      year: this.state.year\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Books__WEBPACK_IMPORTED_MODULE_4__["default"], {\n      year: this.state.year\n    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "col-md-4"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Genres__WEBPACK_IMPORTED_MODULE_3__["default"], {\n      year: this.state.year\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Countries__WEBPACK_IMPORTED_MODULE_2__["default"], {\n      year: this.state.year\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Ratings__WEBPACK_IMPORTED_MODULE_7__["default"], {\n      year: this.state.year\n    }))))));\n  }\n}\n\n//# sourceURL=webpack://frontend/./src/views/dashboard.js?')}}]);