/*! For license information please see src_components_Data_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_components_Data_js"],{"./src/components/Data.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "getAllBooks": () => (/* binding */ getAllBooks),\n/* harmony export */   "getBooksPerYearPerGenres": () => (/* binding */ getBooksPerYearPerGenres),\n/* harmony export */   "getChallenge": () => (/* binding */ getChallenge),\n/* harmony export */   "getCountries": () => (/* binding */ getCountries),\n/* harmony export */   "getGenresCount": () => (/* binding */ getGenresCount),\n/* harmony export */   "getReadingYears": () => (/* binding */ getReadingYears),\n/* harmony export */   "getShortestLongestBook": () => (/* binding */ getShortestLongestBook),\n/* harmony export */   "getStats": () => (/* binding */ getStats)\n/* harmony export */ });\nconst getAllBooks = () => {\n  return fetch(\'/api/books\', {\n    "method": "GET"\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getStats = year => {\n  return fetch(\'/api/books/stats\', {\n    "method": "GET",\n    "headers": {\n      "year": year\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getChallenge = year => {\n  return fetch(\'/api/books/challenge\', {\n    "method": "GET",\n    "headers": {\n      "year": year\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getReadingYears = () => {\n  return fetch(\'/api/books/years\', {\n    "method": "GET"\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getCountries = year => {\n  return fetch(\'/api/books/countries\', {\n    "method": "GET",\n    "headers": {\n      "year": year\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getShortestLongestBook = year => {\n  return fetch(\'/api/books/pages/stats\', {\n    "method": "GET",\n    "headers": {\n      "year": year\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getBooksPerYearPerGenres = year => {\n  return fetch(\'/api/books/genres\', {\n    "method": "GET",\n    "headers": {\n      "year": year\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\nconst getGenresCount = year => {\n  return fetch(\'/api/books/genres/count\', {\n    "method": "GET",\n    "headers": {\n      "year": year\n    }\n  }).then(response => response.json()).then(data => {\n    return data;\n  });\n};\n\n//# sourceURL=webpack://frontend/./src/components/Data.js?')}}]);