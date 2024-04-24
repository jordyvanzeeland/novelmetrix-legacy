/*! For license information please see src_views_dashboard_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_views_dashboard_js"],{"./src/components/Books.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nconst Books = props => {\n  const getData = async () => {\n    const [data, charts] = await Promise.all([Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_datatables_net-dt_js_dataTables_dataTables_mjs"), __webpack_require__.e("src_components_Data_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./Data.js */ "./src/components/Data.js")), __webpack_require__.e(/*! import() */ "src_components_Charts_js").then(__webpack_require__.bind(__webpack_require__, /*! ./Charts.js */ "./src/components/Charts.js"))]);\n    const yearbooks = await data.getBooksPerYearPerGenres(props.year);\n    if (yearbooks) {\n      charts.initChart(yearbooks, props.year);\n    }\n  };\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    getData();\n  }, [props.year]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "books-per-month"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n    className: "block_name"\n  }, "Boeken per maand per genre"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("canvas", {\n    id: "chart"\n  })));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Books);\n\n//# sourceURL=webpack://frontend/./src/components/Books.js?')},"./src/components/Genres.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nconst Genres = props => {\n  const [genresbooks, setGenresBooks] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const getData = async () => {\n    const [data, charts] = await Promise.all([await Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_datatables_net-dt_js_dataTables_dataTables_mjs"), __webpack_require__.e("src_components_Data_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./Data.js */ "./src/components/Data.js")), await __webpack_require__.e(/*! import() */ "src_components_Charts_js").then(__webpack_require__.bind(__webpack_require__, /*! ./Charts.js */ "./src/components/Charts.js"))]);\n    const yeargenres = await data.getGenresCount(props.year);\n    if (yeargenres) {\n      charts.initDoughnut(yeargenres, props.year);\n      setGenresBooks(yeargenres);\n    }\n  };\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    getData();\n  }, [props.year]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "genresPercent"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n    className: "block_name"\n  }, "Genres"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("table", {\n    className: "ratingstable responsive nowrap",\n    width: "100%"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null, "genre"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null, "count"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tbody", null, genresbooks.map(genre => {\n    var dotcolor = \'\';\n    if (genre.genre === "Thriller") {\n      dotcolor = \'#405181\';\n    } else if (genre.genre === "Roman") {\n      dotcolor = \'#01a9ac\';\n    } else if (genre.genre === \'Non-fictie\') {\n      dotcolor = \'#64c5b1\';\n    } else {\n      dotcolor = \'#1ABB9C\';\n    }\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "dotgenre",\n      style: {\n        background: dotcolor\n      }\n    }), " ", genre.genre), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {\n      style: {\n        textAlign: \'right\'\n      }\n    }, genre.count));\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("canvas", {\n    id: "chartGenres"\n  })));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Genres);\n\n//# sourceURL=webpack://frontend/./src/components/Genres.js?')},"./src/components/Languages.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nconst Languages = props => {\n  const [languageBooks, setLanguageBooks] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const getData = async () => {\n    const [data, charts] = await Promise.all([await Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_datatables_net-dt_js_dataTables_dataTables_mjs"), __webpack_require__.e("src_components_Data_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./Data.js */ "./src/components/Data.js")), await __webpack_require__.e(/*! import() */ "src_components_Charts_js").then(__webpack_require__.bind(__webpack_require__, /*! ./Charts.js */ "./src/components/Charts.js"))]);\n    const languagebooks = await data.getLanguagesBooks(props.year);\n    if (languagebooks) {\n      charts.initDoughnut2(languagebooks, props.year);\n      setLanguageBooks(languagebooks);\n    }\n  };\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    getData();\n  }, [props.year]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "ratings languages"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n    className: "block_name"\n  }, "Talen"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("table", {\n    className: "ratingstable responsive nowrap",\n    width: "100%"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null, "language"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null, "count"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tbody", null, languageBooks.map(language => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n      className: `flag-icon flag-icon-${language.lang == \'en\' ? \'gb\' : language.lang} mx3`\n    }), " ", language.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {\n      style: {\n        textAlign: \'right\'\n      }\n    }, language.count));\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("canvas", {\n    id: "chartLangs"\n  })));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Languages);\n\n//# sourceURL=webpack://frontend/./src/components/Languages.js?')},"./src/components/Ratings.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nconst Ratings = props => {\n  const [ratings, setRatings] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [totalRatings, setTotalRatings] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);\n  const getData = async () => {\n    const data = await Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_datatables_net-dt_js_dataTables_dataTables_mjs"), __webpack_require__.e("src_components_Data_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./Data.js */ "./src/components/Data.js"));\n    const yearratings = await data.getRatingsCount(props.year);\n    if (yearratings) {\n      var total = 0;\n      yearratings.forEach(rating => {\n        total += rating.count;\n      });\n      var ratingsArray = {\n        5: 0,\n        4: 0,\n        3: 0,\n        2: 0,\n        1: 0\n      };\n      for (var i = 5; i > 0; i--) {\n        yearratings.forEach(rating => {\n          if (rating.rating === i) {\n            ratingsArray[i] = rating.count;\n          }\n        });\n      }\n      setRatings(Object.entries(ratingsArray));\n      setTotalRatings(total);\n    }\n  };\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    getData();\n  }, [props.year]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "ratings"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n    className: "block_name"\n  }, "Ratings"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("table", {\n    className: "ratingstable responsive nowrap",\n    width: "100%"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null, "#"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null, "percentage"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null, "aantal"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tbody", null, ratings.map((rating, i) => {\n    var ratingstars = \'\';\n    var rating_percentage = rating[1] / totalRatings * 100;\n    if (rating[0]) {\n      for (var i = 0; i < rating[0]; i++) {\n        ratingstars += "<i class=\'fas fa-star\'></i>";\n      }\n    }\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", {\n      key: i\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {\n      style: {\n        width: \'200px\'\n      },\n      className: "book_rating",\n      dangerouslySetInnerHTML: {\n        __html: ratingstars\n      }\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {\n      style: {\n        width: \'257px\'\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "progress"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "progress-bar",\n      role: "progressbar",\n      style: {\n        width: rating_percentage ? rating_percentage : 0 + \'%\'\n      },\n      "aria-valuenow": rating_percentage ? rating_percentage : 0,\n      "aria-valuemin": "0",\n      "aria-valuemax": "100"\n    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, rating[1]));\n  })))));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ratings);\n\n//# sourceURL=webpack://frontend/./src/components/Ratings.js?')},"./src/components/Readed.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _DataTables_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataTables.css */ "./src/components/DataTables.css");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nmoment__WEBPACK_IMPORTED_MODULE_2__.locale(\'nl\');\nconst Readed = props => {\n  const [books, setBooks] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const getData = async () => {\n    const [data, functions] = await Promise.all([Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_datatables_net-dt_js_dataTables_dataTables_mjs"), __webpack_require__.e("src_components_Data_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ../components/Data.js */ "./src/components/Data.js")), Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_datatables_net-dt_js_dataTables_dataTables_mjs"), __webpack_require__.e("src_Functions_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ../Functions.js */ "./src/Functions.js"))]);\n    const yearbooks = await data.getBooksByYear(props.year);\n    var months = [];\n    for (var i = 1; i < 13; i++) {\n      months[i] = [];\n      yearbooks.forEach(book => {\n        console.log(moment__WEBPACK_IMPORTED_MODULE_2__(book.readed).format("M"), i);\n        if (moment__WEBPACK_IMPORTED_MODULE_2__(book.readed).format("M") == i) {\n          months[i].push(book);\n        }\n      });\n    }\n    setBooks(yearbooks);\n    functions.initDataTable();\n  };\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    getData();\n  }, [props.year]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    style: {\n      display: \'block\'\n    },\n    className: "modal modal-books",\n    tabIndex: "-1",\n    role: "dialog"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "modal-dialog",\n    role: "document"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "modal-content"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {\n    type: "button",\n    onClick: () => {\n      setShowModal(false);\n    },\n    className: "close",\n    "data-dismiss": "modal",\n    "aria-label": "Close"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("i", {\n    className: "fas fa-times-circle"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "DataTable_Container"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("table", {\n    id: "DataTable",\n    className: "showHead table responsive nowrap",\n    width: "100%"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null, "Gelezen boeken"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tbody", null, books.map((book, i) => {\n    var dotcolor = \'\';\n    if (book.genre === "Thriller") {\n      dotcolor = \'#404e67\';\n    } else if (book.genre === "Roman") {\n      dotcolor = \'#01a9ac\';\n    } else if (book.genre === \'Non-fictie\') {\n      dotcolor = \'#64c5b1\';\n    } else {\n      dotcolor = \'#1ABB9C\';\n    }\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", {\n      key: book.id\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "dotgenre",\n      style: {\n        display: \'inline-block\',\n        verticalAlign: \'top\',\n        marginTop: \'5px\',\n        marginRight: \'10px\',\n        width: \'10px\',\n        height: \'10px\',\n        borderRadius: \'100%\',\n        background: dotcolor\n      }\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      className: "book-info",\n      style: {\n        display: \'inline-block\',\n        verticalAlign: \'top\'\n      }\n    }, book.name, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n      style: {\n        color: \'#777\'\n      },\n      className: "book-author"\n    }, book.author))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("i", {\n      className: "fas fa-star"\n    }), " ", book.rating), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, moment__WEBPACK_IMPORTED_MODULE_2__(book.readed).format("MMMM")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {\n      style: {\n        textAlign: \'right\'\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {\n      onClick: () => delBook(book.id),\n      type: "button",\n      className: "btn btn-danger"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("i", {\n      className: "fa fa-trash"\n    }))));\n  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "legenda",\n    style: {\n      textAlign: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "dotgenre",\n    style: {\n      display: \'inline-block\',\n      verticalAlign: \'top\',\n      marginTop: \'3px\',\n      marginRight: \'5px\',\n      width: \'10px\',\n      height: \'10px\',\n      borderRadius: \'100%\',\n      background: "#404e67"\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n    style: {\n      marginRight: \'10px\'\n    }\n  }, "Thriller"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "dotgenre",\n    style: {\n      display: \'inline-block\',\n      verticalAlign: \'top\',\n      marginTop: \'3px\',\n      marginRight: \'5px\',\n      width: \'10px\',\n      height: \'10px\',\n      borderRadius: \'100%\',\n      background: "#01a9ac"\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n    style: {\n      marginRight: \'10px\'\n    }\n  }, "Roman"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "dotgenre",\n    style: {\n      display: \'inline-block\',\n      verticalAlign: \'top\',\n      marginTop: \'3px\',\n      marginRight: \'5px\',\n      width: \'10px\',\n      height: \'10px\',\n      borderRadius: \'100%\',\n      background: "#64c5b1"\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n    style: {\n      marginRight: \'10px\'\n    }\n  }, "Non-fictie"))))));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Readed);\n\n//# sourceURL=webpack://frontend/./src/components/Readed.js?')},"./src/components/Stats.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nconst BookStats = props => {\n  const [totalbooks, setTotalbooks] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);\n  const [totalgenres, setTotalgenres] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);\n  const [yearrating, setYearrating] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);\n  const getData = async () => {\n    const data = await Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_datatables_net-dt_js_dataTables_dataTables_mjs"), __webpack_require__.e("src_components_Data_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./Data.js */ "./src/components/Data.js"));\n    const stats = await data.getStats(props.year);\n    setTotalbooks(stats.totalbooks);\n    setTotalgenres(stats.totalgenres);\n    setYearrating(stats.avgyearrating);\n  };\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    getData();\n  }, [props.year]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "col-md-4 col-sm-4"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "stat-block"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("i", {\n    className: "fas fa-book-open"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n    className: "stats-label"\n  }, "Gelezen boeken:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n    className: "stats-number"\n  }, totalbooks ? totalbooks : 0))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "col-md-4 col-sm-4"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "stat-block"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("i", {\n    className: "fas fa-book-open"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n    className: "stats-label"\n  }, "Genres:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n    className: "stats-number"\n  }, totalgenres ? totalgenres : 0))));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BookStats);\n\n//# sourceURL=webpack://frontend/./src/components/Stats.js?')},"./src/views/dashboard.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_Genres__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Genres */ "./src/components/Genres.js");\n/* harmony import */ var _components_Books__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Books */ "./src/components/Books.js");\n/* harmony import */ var _components_Ratings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Ratings */ "./src/components/Ratings.js");\n/* harmony import */ var _components_Stats__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Stats */ "./src/components/Stats.js");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _components_DataTables_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/DataTables.css */ "./src/components/DataTables.css");\n/* harmony import */ var _components_Readed_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Readed.js */ "./src/components/Readed.js");\n/* harmony import */ var _components_Sidebar_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Sidebar.js */ "./src/components/Sidebar.js");\n/* harmony import */ var flag_icon_css_css_flag_icons_min_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! flag-icon-css/css/flag-icons.min.css */ "./node_modules/flag-icon-css/css/flag-icons.min.css");\n/* harmony import */ var _components_Languages_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/Languages.js */ "./src/components/Languages.js");\n\n\n\n\n\n\n\n\n\n\n\nmoment__WEBPACK_IMPORTED_MODULE_5__.locale(\'nl\');\nconst Dashboard = props => {\n  const currentyear = new Date().getFullYear();\n  const [year, setYear] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(currentyear);\n  const [showModal, setShowModal] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const [readingYears, setReadingYears] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const getData = async () => {\n    const [data, functions] = await Promise.all([Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_datatables_net-dt_js_dataTables_dataTables_mjs"), __webpack_require__.e("src_components_Data_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ../components/Data.js */ "./src/components/Data.js")), Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_datatables_net-dt_js_dataTables_dataTables_mjs"), __webpack_require__.e("src_Functions_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ../Functions.js */ "./src/Functions.js"))]);\n    const getYears = await data.getReadingYears();\n    setReadingYears(getYears);\n    functions.initDataTable();\n  };\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    getData();\n  }, [year]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Sidebar_js__WEBPACK_IMPORTED_MODULE_8__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "topbar"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {\n    className: "logo",\n    src: "/static/images/logo_white.png"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "topbar_right"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {\n    className: "currentUser"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("i", {\n    class: "fas fa-user-circle"\n  }), " ", localStorage.getItem(\'name\'))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "content"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "container-fluid"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "row"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "col-md-9"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "row"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "col-md-4 col-sm-4"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "stat-block"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("i", {\n    className: "fa fa-calendar"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n    className: "stats-label"\n  }, "Selecteer jaar:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {\n    className: "stats-number"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {\n    className: "yearselector",\n    value: year,\n    onChange: event => setYear(event.target.value)\n  }, readingYears.map((year, i) => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {\n      key: i,\n      value: year\n    }, year);\n  }), !readingYears.includes(currentyear) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {\n    key: currentyear,\n    value: currentyear\n  }, currentyear) : \'\')))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Stats__WEBPACK_IMPORTED_MODULE_4__["default"], {\n    year: year\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Books__WEBPACK_IMPORTED_MODULE_2__["default"], {\n    year: year\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {\n    className: "col-md-3"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Languages_js__WEBPACK_IMPORTED_MODULE_10__["default"], {\n    year: year\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Genres__WEBPACK_IMPORTED_MODULE_1__["default"], {\n    year: year\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Ratings__WEBPACK_IMPORTED_MODULE_3__["default"], {\n    year: year\n  })))), showModal && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Readed_js__WEBPACK_IMPORTED_MODULE_7__["default"], {\n    year: year\n  })));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dashboard);\n\n//# sourceURL=webpack://frontend/./src/views/dashboard.js?')}}]);