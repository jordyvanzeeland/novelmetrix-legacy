/*! For license information please see src_Functions_js.js.LICENSE.txt */
(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_Functions_js"],{"./src/Functions.js":()=>{eval("const filterDataTable = (column, value, exact) => {\n  if (value !== 0 && exact === true) {\n    $('#DataTable').DataTable().column(column).search(\"(^\" + value + \"$)\", true, false).draw();\n  } else {\n    $('#DataTable').DataTable().column(column).search(value).draw();\n  }\n};\n\nconst fillDataTableFilters = (filter, value, text) => {\n  console.log(value, text);\n\n  if (value && !filter.find(\"option:contains('\" + text + \"')\").length) {\n    var option = new Option(value, value);\n    option.innerHTML = text;\n    filter[0].appendChild(option);\n  }\n};\n\nconst getFlagEmoji = countryCode => {\n  const codePoints = countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt());\n  return String.fromCodePoint(...codePoints);\n};\n\n//# sourceURL=webpack://frontend/./src/Functions.js?")}}]);