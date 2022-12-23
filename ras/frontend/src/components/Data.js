export const getAllBooks = () => {
    return fetch('/api/books', {
        "method": "GET",
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

export const getStats = (year) => {
    return fetch('/api/books/stats', {
        "method": "GET",
        "headers": {
            "year": year
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

export const getChallenge = (year) => {
    return fetch('/api/books/challenge', {
        "method": "GET",
        "headers": {
            "year": year
        }
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

export const getReadingYears = () => {
    return fetch('/api/books/years', {
        "method": "GET",
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

export const getCountries = (year) => {
    return fetch('/api/books/countries', {
        "method": "GET",
        "headers": {
            "year": year
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

export const getShortestLongestBook = (year) => {
    return fetch('/api/books/pages/stats', {
        "method": "GET",
        "headers": {
            "year": year
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

export const getBooksPerYearPerGenres = (year) => {
    return fetch('/api/books/genres', {
        "method": "GET",
        "headers": {
            "year": year
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

export const getGenresCount = (year) => {
    return fetch('/api/books/genres/count', {
        "method": "GET",
        "headers": {
            "year": year
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
}