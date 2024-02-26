/*! For license information please see src_components_Data_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_components_Data_js"],{"./src/Functions.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "initDataTable": () => (/* binding */ initDataTable),\n/* harmony export */   "readCookie": () => (/* binding */ readCookie)\n/* harmony export */ });\n/* harmony import */ var datatables_net_dt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! datatables.net-dt */ "./node_modules/datatables.net-dt/js/dataTables.dataTables.mjs");\n\nconst readCookie = name => {\n  var nameEQ = name + "=";\n  var ca = document.cookie.split(\';\');\n  for (var i = 0; i < ca.length; i++) {\n    var c = ca[i];\n    while (c.charAt(0) == \' \') c = c.substring(1, c.length);\n    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);\n  }\n  return null;\n};\nconst initDataTable = () => {\n  let table = new datatables_net_dt__WEBPACK_IMPORTED_MODULE_0__["default"](\'#DataTable\');\n  table.destroy();\n  setTimeout(() => {\n    table = new datatables_net_dt__WEBPACK_IMPORTED_MODULE_0__["default"](\'#DataTable\', {\n      autoWidth: true,\n      language: {\n        url: \'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Dutch.json\',\n        search: "",\n        searchPlaceholder: "Zoeken"\n      },\n      dom: \'rt<"bottom"p><"clear">\',\n      order: []\n    });\n  }, 300);\n};\n\n//# sourceURL=webpack://frontend/./src/Functions.js?')},"./src/components/Data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "deleteBook": () => (/* binding */ deleteBook),\n/* harmony export */   "deleteChallenge": () => (/* binding */ deleteChallenge),\n/* harmony export */   "getAllBooks": () => (/* binding */ getAllBooks),\n/* harmony export */   "getAllChallenges": () => (/* binding */ getAllChallenges),\n/* harmony export */   "getAvgRatings": () => (/* binding */ getAvgRatings),\n/* harmony export */   "getBooksByYear": () => (/* binding */ getBooksByYear),\n/* harmony export */   "getBooksPerYearPerGenres": () => (/* binding */ getBooksPerYearPerGenres),\n/* harmony export */   "getChallenge": () => (/* binding */ getChallenge),\n/* harmony export */   "getGenresCount": () => (/* binding */ getGenresCount),\n/* harmony export */   "getRatingsCount": () => (/* binding */ getRatingsCount),\n/* harmony export */   "getReadingYears": () => (/* binding */ getReadingYears),\n/* harmony export */   "getStats": () => (/* binding */ getStats),\n/* harmony export */   "insertBook": () => (/* binding */ insertBook),\n/* harmony export */   "insertChallenge": () => (/* binding */ insertChallenge),\n/* harmony export */   "loginUser": () => (/* binding */ loginUser),\n/* harmony export */   "registerUser": () => (/* binding */ registerUser)\n/* harmony export */ });\n/* harmony import */ var _Functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Functions */ "./src/Functions.js");\n\nconst registerUser = formData => {\n  return fetch(`/api/auth/register`, {\n    method: \'POST\',\n    body: formData\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst loginUser = (username, password, formData) => {\n  return fetch(`/api/auth/login?username=${username}&password=${password}`, {\n    method: \'POST\',\n    body: formData\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getBooksByYear = year => {\n  return fetch(\'/api/books\', {\n    "method": "GET",\n    "headers": {\n      "Authorization": "Bearer " + localStorage.getItem("token"),\n      "userid": localStorage.getItem(\'id\'),\n      "year": year\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getAllBooks = () => {\n  return fetch(\'/api/books/all\', {\n    "method": "GET",\n    "headers": {\n      "Authorization": "Bearer " + localStorage.getItem("token"),\n      "userid": localStorage.getItem(\'id\')\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getAllChallenges = () => {\n  return fetch(\'/api/books/challenges\', {\n    "method": "GET",\n    "headers": {\n      "Authorization": "Bearer " + localStorage.getItem("token"),\n      "userid": localStorage.getItem(\'id\')\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst insertChallenge = data => {\n  return fetch(\'/api/books/challenges/insert\', {\n    "method": "POST",\n    "headers": {\n      "Authorization": "Bearer " + localStorage.getItem("token"),\n      \'Content-Type\': \'application/x-www-form-urlencoded\',\n      "X-CSRFToken": (0,_Functions__WEBPACK_IMPORTED_MODULE_0__.readCookie)(\'csrftoken\'),\n      "userid": localStorage.getItem(\'id\')\n    },\n    "body": data\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst deleteChallenge = id => {\n  return fetch(\'/api/books/challenges/\' + id + \'/delete\', {\n    "method": "DELETE",\n    "headers": {\n      "Authorization": "Bearer " + localStorage.getItem("token"),\n      \'Content-Type\': \'application/x-www-form-urlencoded\',\n      "X-CSRFToken": (0,_Functions__WEBPACK_IMPORTED_MODULE_0__.readCookie)(\'csrftoken\'),\n      "challengeid": id\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getStats = year => {\n  return fetch(\'/api/books/stats\', {\n    "method": "GET",\n    "headers": {\n      "year": year,\n      "Authorization": "Bearer " + localStorage.getItem("token"),\n      "userid": localStorage.getItem(\'id\')\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getChallenge = year => {\n  return fetch(\'/api/books/challenge\', {\n    "method": "GET",\n    "headers": {\n      "Authorization": "Bearer " + localStorage.getItem("token"),\n      "year": year,\n      "userid": localStorage.getItem(\'id\')\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getReadingYears = () => {\n  return fetch(\'/api/books/years\', {\n    "method": "GET",\n    "headers": {\n      "Authorization": "Bearer " + localStorage.getItem("token"),\n      "userid": localStorage.getItem(\'id\')\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getBooksPerYearPerGenres = year => {\n  return fetch(\'/api/books/genres\', {\n    "method": "GET",\n    "headers": {\n      "year": year,\n      "Authorization": "Bearer " + localStorage.getItem("token"),\n      "userid": localStorage.getItem(\'id\')\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getGenresCount = year => {\n  return fetch(\'/api/books/genres/count\', {\n    "method": "GET",\n    "headers": {\n      "year": year,\n      "Authorization": "Bearer " + localStorage.getItem("token"),\n      "userid": localStorage.getItem(\'id\')\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getAvgRatings = year => {\n  return fetch(\'/api/books/ratings\', {\n    "method": "GET",\n    "headers": {\n      "year": year,\n      "Authorization": "Bearer " + localStorage.getItem("token"),\n      "userid": localStorage.getItem(\'id\')\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getRatingsCount = year => {\n  return fetch(\'/api/books/ratings/count\', {\n    "method": "GET",\n    "headers": {\n      "year": year,\n      "Authorization": "Bearer " + localStorage.getItem("token"),\n      "userid": localStorage.getItem(\'id\')\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst insertBook = book => {\n  return fetch(\'/api/books/insert\', {\n    "method": "POST",\n    "headers": {\n      "Authorization": "Bearer " + localStorage.getItem("token"),\n      \'Accept\': \'application/json\',\n      \'Content-Type\': \'application/json\',\n      "userid": localStorage.getItem(\'id\')\n    },\n    "body": JSON.stringify(book)\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst deleteBook = bookid => {\n  return fetch(\'/api/books/delete\', {\n    "method": "DELETE",\n    "headers": {\n      "Authorization": "Bearer " + localStorage.getItem("token"),\n      "userid": localStorage.getItem(\'id\'),\n      "bookid": bookid\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\n\n//# sourceURL=webpack://frontend/./src/components/Data.js?')}}]);