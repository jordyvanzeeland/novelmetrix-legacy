const filterDataTable = (column, value, exact) => {
    if (value !== 0 && exact === true) {
        $('#DataTable').DataTable().column(column).search("(^" + value + "$)", true, false).draw();
    } else {
        $('#DataTable').DataTable().column(column).search(value).draw();
    }
}

const fillDataTableFilters = (filter, value, text) => {
    console.log(value, text);
    if (value && !filter.find("option:contains('" + text + "')").length) {
        var option = new Option(value, value);
        option.innerHTML = text;
        filter[0].appendChild(option);
    }
}

const getFlagEmoji = (countryCode) => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

export const readCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}