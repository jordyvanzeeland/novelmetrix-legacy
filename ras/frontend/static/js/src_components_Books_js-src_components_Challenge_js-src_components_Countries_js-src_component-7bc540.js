/*! For license information please see src_components_Books_js-src_components_Challenge_js-src_components_Countries_js-src_component-7bc540.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_components_Books_js-src_components_Challenge_js-src_components_Countries_js-src_component-7bc540"],{"./src/components/Books.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Books)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Data.js */ "./src/components/Data.js");\n/* harmony import */ var _Charts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Charts.js */ "./src/components/Charts.js");\n\n\n\nclass Books extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      books: []\n    };\n  }\n\n  getComponentData() {\n    (0,_Data_js__WEBPACK_IMPORTED_MODULE_1__.getBooksPerYearPerGenres)(this.props.year).then(books => {\n      this.setState({\n        books: books\n      });\n      (0,_Charts_js__WEBPACK_IMPORTED_MODULE_2__.initChart)(books, this.props.year);\n    });\n  }\n\n  componentDidMount() {\n    this.getComponentData();\n  }\n\n  componentDidUpdate(prevProps, prevState) {\n    if (prevProps.year !== this.props.year) {\n      this.getComponentData();\n    }\n  }\n\n  render() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "books-per-month"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "block_name"\n    }, "Boeken per maand per genre"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("canvas", {\n      id: "chart"\n    })));\n  }\n\n}\n\n//# sourceURL=webpack://frontend/./src/components/Books.js?')},"./src/components/Challenge.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Challenge)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Data.js */ "./src/components/Data.js");\n\n\nclass Challenge extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      readingYears: [],\n      challenge: 0\n    };\n  }\n\n  getComponentData() {\n    var $this = this;\n    (0,_Data_js__WEBPACK_IMPORTED_MODULE_1__.getStats)(this.props.year).then(data => {\n      $this.setState({\n        totalbooks: data.totalbooks\n      });\n    });\n    (0,_Data_js__WEBPACK_IMPORTED_MODULE_1__.getChallenge)(this.props.year).then(data => {\n      this.setState({\n        challenge: data && data.length > 0 ? data[0].nrofbooks : 0\n      });\n    });\n  }\n\n  componentDidMount() {\n    this.getComponentData();\n  }\n\n  componentDidUpdate(prevProps, prevState) {\n    if (prevProps.year !== this.props.year) {\n      this.getComponentData();\n    }\n  }\n\n  render() {\n    var challengePercentage = this.state.totalbooks / this.state.challenge * 100;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, this.state.challenge && this.state.challenge !== 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "container-fluid"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "row"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "col-md-12"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "stat-block"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "block_name"\n    }, "Book Challenge"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "progress"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "progress-bar progress-bar-striped",\n      role: "progressbar",\n      style: {\n        width: challengePercentage + \'%\'\n      },\n      "aria-valuenow": challengePercentage,\n      "aria-valuemin": "0",\n      "aria-valuemax": "100"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "progress-bar-number"\n    }, challengePercentage, "%"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "stats-number"\n    }, this.state.totalbooks), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "stats-label"\n    }, "van de"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "stats-number"\n    }, this.state.challenge), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "stats-label"\n    }, "boeken gelezen"))))) : \'\');\n  }\n\n}\n\n//# sourceURL=webpack://frontend/./src/components/Challenge.js?')},"./src/components/Charts.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initChart\": () => (/* binding */ initChart),\n/* harmony export */   \"initDoughnut\": () => (/* binding */ initDoughnut),\n/* harmony export */   \"initHorBar\": () => (/* binding */ initHorBar)\n/* harmony export */ });\nconst initChart = (data, year) => {\n  /*\r\n  ----------------------------------\r\n       Books per month per genre\r\n  ----------------------------------\r\n  */\n  var genres = [];\n  var colors = [// '#696ffc', '#7596fa', '#92adfe', '#abc0ff'\n  '#8066ee', '#58c8d6', '#fe4c62', '#49b8fd', '#ffbe0e'];\n  var dataSet = [];\n  data.forEach(book => {\n    if (!genres.includes(book.genre)) {\n      genres.push(book.genre);\n    }\n  });\n\n  if (genres && genres.length > 0) {\n    genres.forEach((genre, index) => {\n      var genreData = [];\n\n      for (var i = 0; i < 12; i++) {\n        genreData[i] = 0;\n\n        if (i + 1 < 10) {\n          var month = \"0\" + (i + 1);\n        } else {\n          month = i + 1;\n        }\n\n        for (var j = 0; j < data.length; j++) {\n          if (data && data[j] && data[j].readed == month + '-' + year) {\n            if (data[j].genre == genre) {\n              genreData[i] = data[j].count;\n            }\n          }\n        }\n      }\n\n      dataSet.push({\n        label: genre,\n        data: genreData,\n        backgroundColor: colors[index],\n        order: 2\n      });\n    });\n  }\n  /*\r\n  ----------------------------------\r\n       Stacked bar chart\r\n  ----------------------------------\r\n  */\n\n\n  $(\"canvas#chart\").remove();\n  $(\"div.books-per-month\").append('<canvas id=\"chart\"></canvas>');\n  const legendMargin = {\n    id: 'legendMargin',\n\n    beforeInit(chart, legend, options) {\n      const fitValue = chart.legend.fit;\n\n      chart.legend.fit = function fit() {\n        fitValue.bind(chart.legend)();\n        return this.height += 30;\n      };\n    }\n\n  };\n  new Chart(document.getElementById('chart'), {\n    type: 'bar',\n    data: {\n      labels: [\"Januari\", \"Februari\", \"Maart\", \"April\", \"Mei\", \"Juni\", \"Juli\", \"Augustus\", \"September\", \"Oktober\", \"November\", \"December\"],\n      datasets: dataSet\n    },\n    options: {\n      maintainAspectRatio: false,\n      responsive: true,\n      showTooltips: true,\n      legend: {\n        display: true,\n        labels: {\n          usePointStyle: true\n        }\n      },\n      interaction: {\n        mode: 'index'\n      },\n      scales: {\n        x: {\n          ticks: {\n            beginAtZero: true,\n            color: \"#101010\",\n            fontFamily: \"Source Sans Pro\"\n          },\n          stacked: true\n        },\n        y: {\n          ticks: {\n            beginAtZero: true,\n            stepSize: 1,\n            color: \"#101010\",\n            fontFamily: \"Source Sans Pro\"\n          },\n          stacked: true\n        }\n      },\n      plugins: {\n        legend: {\n          position: 'top',\n          labels: {\n            usePointStyle: true,\n            color: \"#101010\",\n            padding: 20,\n            font: {\n              size: 14,\n              family: 'Source Sans Pro'\n            }\n          }\n        }\n      },\n      tooltips: {\n        bodyFont: 'Source Sans Pro'\n      }\n    },\n    plugins: [legendMargin]\n  });\n};\nconst initDoughnut = data => {\n  var labels = [];\n  var counts = [];\n  data.forEach(count => {\n    if (!labels.includes(count.genre)) {\n      labels.push(count.genre);\n    }\n\n    counts.push(count.count);\n  });\n  const legendMargin = {\n    id: 'legendMargin',\n\n    beforeInit(chart, legend, options) {\n      const fitValue = chart.legend.fit;\n\n      chart.legend.fit = function fit() {\n        fitValue.bind(chart.legend)();\n        return this.height += 30;\n      };\n    }\n\n  };\n  $(\"canvas#chartGenres\").remove();\n  $(\"div.genresPercent\").append('<canvas id=\"chartGenres\"></canvas>');\n  var ctx = document.getElementById(\"chartGenres\");\n  var myChart = new Chart(ctx, {\n    type: 'pie',\n    data: {\n      labels: labels,\n      datasets: [{\n        label: '# of Tomatoes',\n        data: counts,\n        backgroundColor: ['#8066ee', '#58c8d6', '#fe4c62', '#49b8fd', '#ffbe0e'],\n        borderWidth: 0,\n        borderColor: '#1f2940',\n        tooltip: {\n          callbacks: {\n            label: function (context) {\n              let label = context.label;\n              let value = context.formattedValue;\n              if (!label) label = 'Unknown';\n              let sum = 0;\n              let dataArr = context.chart.data.datasets[0].data;\n              dataArr.map(data => {\n                sum += Number(data);\n              });\n              let percentage = (value * 100 / sum).toFixed(1) + '%';\n              return label + \": \" + percentage;\n            }\n          }\n        }\n      }]\n    },\n    options: {\n      cutout: '80%',\n      responsive: true,\n      plugins: {\n        legend: {\n          position: 'top',\n          labels: {\n            padding: 20,\n            usePointStyle: true,\n            // This more specific font property overrides the global property\n            color: \"##101010\",\n            font: {\n              size: 14,\n              family: 'Source Sans Pro'\n            }\n          }\n        }\n      }\n    },\n    plugins: [{\n      id: 'legendMargin',\n\n      beforeInit(chart, legend, options) {\n        const fitValue = chart.legend.fit;\n\n        chart.legend.fit = function fit() {\n          fitValue.bind(chart.legend)();\n          return this.height += 30;\n        };\n      }\n\n    }, {\n      afterDraw: chart => {\n        var ctx = chart.ctx;\n        ctx.save();\n        var image = new Image();\n        image.src = 'https://www.iconsdb.com/icons/preview/gray/book-xxl.png';\n        var imageSize = 80;\n        ctx.drawImage(image, chart.width / 2 - imageSize / 2, chart.height / 2 - imageSize / 6, imageSize, imageSize);\n        ctx.restore();\n      }\n    }]\n  });\n};\nconst initHorBar = data => {\n  var countries = [];\n  var counts = [];\n  data.forEach(count => {\n    if (!countries.includes(count.country)) {\n      countries.push(count.country);\n    }\n\n    counts.push(count.count);\n  });\n  $(\"canvas#countryChart\").remove();\n  $(\"div.books-per-country\").append('<canvas id=\"countryChart\"></canvas>');\n  var ctx = document.getElementById(\"countryChart\");\n  new Chart(ctx, {\n    type: 'bar',\n    options: {\n      indexAxis: 'y',\n      plugins: {\n        legend: {\n          display: false\n        }\n      },\n      scales: {\n        x: {\n          ticks: {\n            beginAtZero: true,\n            color: \"white\"\n          },\n          stacked: true\n        },\n        y: {\n          ticks: {\n            beginAtZero: true,\n            stepSize: 1,\n            color: \"white\"\n          },\n          stacked: true\n        }\n      }\n    },\n    data: {\n      labels: countries,\n      datasets: [{\n        label: \"Boeken\",\n        data: counts,\n        backgroundColor: '#696ffc'\n      }]\n    }\n  });\n};\n\n//# sourceURL=webpack://frontend/./src/components/Charts.js?")},"./src/components/Countries.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Countries)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Data.js */ "./src/components/Data.js");\n\n\nclass Countries extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      countries: []\n    };\n  }\n\n  getComponentData() {\n    (0,_Data_js__WEBPACK_IMPORTED_MODULE_1__.getCountries)(this.props.year).then(countries => {\n      this.setState({\n        countries: countries\n      });\n    });\n  }\n\n  componentDidMount() {\n    this.getComponentData();\n  }\n\n  componentDidUpdate(prevProps, prevState) {\n    if (prevProps.year !== this.props.year) {\n      this.getComponentData();\n    }\n  }\n\n  render() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "books-per-country"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "block_name"\n    }, "Landen"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("table", {\n      id: "DataTable",\n      className: "showHead table responsive nowrap",\n      width: "100%"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null, "#"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null, "Land"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null, "Boeken"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tbody", null, this.state.countries.map((country, i) => {\n      var code = country.code.toLowerCase();\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", {\n        key: i\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, i + 1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {\n        src: `https://flagcdn.com/32x24/${code}.png`\n      }), " ", country.country), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, country.count));\n    })))));\n  }\n\n}\n\n//# sourceURL=webpack://frontend/./src/components/Countries.js?')},"./src/components/Data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "getAllBooks": () => (/* binding */ getAllBooks),\n/* harmony export */   "getBooksPerYearPerGenres": () => (/* binding */ getBooksPerYearPerGenres),\n/* harmony export */   "getChallenge": () => (/* binding */ getChallenge),\n/* harmony export */   "getCountries": () => (/* binding */ getCountries),\n/* harmony export */   "getGenresCount": () => (/* binding */ getGenresCount),\n/* harmony export */   "getReadingYears": () => (/* binding */ getReadingYears),\n/* harmony export */   "getShortestLongestBook": () => (/* binding */ getShortestLongestBook),\n/* harmony export */   "getStats": () => (/* binding */ getStats)\n/* harmony export */ });\nconst getAllBooks = () => {\n  return fetch(\'/api/books\', {\n    "method": "GET"\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getStats = year => {\n  return fetch(\'/api/books/stats\', {\n    "method": "GET",\n    "headers": {\n      "year": year\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getChallenge = year => {\n  return fetch(\'/api/books/challenge\', {\n    "method": "GET",\n    "headers": {\n      "year": year\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getReadingYears = () => {\n  return fetch(\'/api/books/years\', {\n    "method": "GET"\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getCountries = year => {\n  return fetch(\'/api/books/countries\', {\n    "method": "GET",\n    "headers": {\n      "year": year\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getShortestLongestBook = year => {\n  return fetch(\'/api/books/pages/stats\', {\n    "method": "GET",\n    "headers": {\n      "year": year\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getBooksPerYearPerGenres = year => {\n  return fetch(\'/api/books/genres\', {\n    "method": "GET",\n    "headers": {\n      "year": year\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getGenresCount = year => {\n  return fetch(\'/api/books/genres/count\', {\n    "method": "GET",\n    "headers": {\n      "year": year\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\n\n//# sourceURL=webpack://frontend/./src/components/Data.js?')},"./src/components/Genres.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Genres)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Data.js */ "./src/components/Data.js");\n/* harmony import */ var _Charts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Charts.js */ "./src/components/Charts.js");\n\n\n\nclass Genres extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      genres: []\n    };\n  }\n\n  getComponentData() {\n    (0,_Data_js__WEBPACK_IMPORTED_MODULE_1__.getGenresCount)(this.props.year).then(genres => {\n      this.setState({\n        genres: genres\n      });\n      (0,_Charts_js__WEBPACK_IMPORTED_MODULE_2__.initDoughnut)(this.state.genres, this.props.year);\n    });\n  }\n\n  componentDidMount() {\n    this.getComponentData();\n  }\n\n  componentDidUpdate(prevProps, prevState) {\n    if (prevProps.year !== this.props.year) {\n      this.getComponentData();\n    }\n  }\n\n  render() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "genresPercent"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "block_name"\n    }, "Genres"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("canvas", {\n      id: "chartGenres"\n    })));\n  }\n\n}\n\n//# sourceURL=webpack://frontend/./src/components/Genres.js?')},"./src/components/Pages.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Pages)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Data.js */ "./src/components/Data.js");\n\n\nclass Pages extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      pagesStats: []\n    };\n  }\n\n  getComponentData() {\n    (0,_Data_js__WEBPACK_IMPORTED_MODULE_1__.getShortestLongestBook)(this.props.year).then(bookstats => {\n      this.setState({\n        pagesStats: bookstats\n      });\n    });\n  }\n\n  componentDidMount() {\n    this.getComponentData();\n  }\n\n  componentDidUpdate(prevProps, prevState) {\n    if (prevProps.year !== this.props.year) {\n      this.getComponentData();\n    }\n  }\n\n  render() {\n    var ratingshort = \'\';\n    var ratinglong = \'\';\n\n    if (this.state.pagesStats.shortestbook) {\n      for (var i = 0; i < this.state.pagesStats.shortestbook.rating; i++) {\n        ratingshort += "<i class=\'fas fa-star\'></i>";\n      }\n    }\n\n    if (document.getElementById("shortest_rating") !== null) {\n      document.getElementById(\'shortest_rating\').innerHTML = ratingshort;\n    }\n\n    if (this.state.pagesStats.longestbook) {\n      for (var i = 0; i < this.state.pagesStats.longestbook.rating; i++) {\n        ratinglong += "<i class=\'fas fa-star\'></i>";\n      }\n    }\n\n    if (document.getElementById("longest_rating") !== null) {\n      document.getElementById(\'longest_rating\').innerHTML = ratinglong;\n    }\n\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "row"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "col-md-6"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "book shortest"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "block_name"\n    }, "Kortste boek"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("i", {\n      className: "fa fa-book book-icon"\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "book_pages"\n    }, this.state.pagesStats.shortestbook ? this.state.pagesStats.shortestbook.pages : \'\', " pagina\'s"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "book_title_author"\n    }, this.state.pagesStats.shortestbook ? this.state.pagesStats.shortestbook.name : \'\', " - ", this.state.pagesStats.shortestbook ? this.state.pagesStats.shortestbook.author : \'\'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      id: "shortest_rating",\n      className: "book_rating"\n    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "col-md-6"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "book longest"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "block_name"\n    }, "Langste boek"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("i", {\n      className: "fa fa-book book-icon"\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "book_pages"\n    }, this.state.pagesStats.longestbook ? this.state.pagesStats.longestbook.pages : \'\', " pagina\'s"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "book_title_author"\n    }, this.state.pagesStats.longestbook ? this.state.pagesStats.longestbook.name : \'\', " - ", this.state.pagesStats.longestbook ? this.state.pagesStats.longestbook.author : \'\'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      id: "longest_rating",\n      className: "book_rating"\n    })))));\n  }\n\n}\n\n//# sourceURL=webpack://frontend/./src/components/Pages.js?')},"./src/components/Stats.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ BookStats)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Data.js */ "./src/components/Data.js");\n\n\nclass BookStats extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      readingYears: [],\n      totalbooks: 0,\n      totalpages: 0,\n      totalauthors: 0,\n      totalcountries: 0,\n      totalgenres: 0\n    };\n  }\n\n  getComponentData() {\n    var $this = this;\n    (0,_Data_js__WEBPACK_IMPORTED_MODULE_1__.getStats)(this.props.year).then(data => {\n      $this.setState({\n        totalbooks: data.totalbooks,\n        totalpages: data.totalpages,\n        totalauthors: data.totalauthors,\n        totalcountries: data.totalcountries,\n        totalgenres: data.totalgenres\n      });\n    });\n    (0,_Data_js__WEBPACK_IMPORTED_MODULE_1__.getReadingYears)().then(data => {\n      this.setState({\n        readingYears: data\n      });\n    });\n  }\n\n  componentDidMount() {\n    this.getComponentData();\n  }\n\n  componentDidUpdate(prevProps, prevState) {\n    if (prevProps.year !== this.props.year) {\n      this.getComponentData();\n    }\n  }\n\n  render() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "col-md-2"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "stat-block"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("i", {\n      className: "fa fa-book"\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "stats-number"\n    }, this.state.totalbooks), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "stats-label"\n    }, "Boeken"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "col-md-2"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "stat-block"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("i", {\n      className: "fa fa-book-open"\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "stats-number"\n    }, this.state.totalpages), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "stats-label"\n    }, "Bladzijdes"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "col-md-2"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "stat-block"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("i", {\n      className: "fa fa-pen"\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "stats-number"\n    }, this.state.totalauthors), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "stats-label"\n    }, "Schrijvers"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "col-md-2"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "stat-block"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("i", {\n      className: "fa fa-book"\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "stats-number"\n    }, this.state.totalgenres), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "stats-label"\n    }, "Genres"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "col-md-2"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "stat-block"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("i", {\n      className: "fa fa-globe"\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "stats-number"\n    }, this.state.totalcountries), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: "stats-label"\n    }, "Landen"))));\n  }\n\n}\n\n//# sourceURL=webpack://frontend/./src/components/Stats.js?')}}]);