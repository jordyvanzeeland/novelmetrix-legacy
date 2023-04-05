import { readCookie } from "../Functions";

export const getAllBooks = () => {
    return fetch('/api/books', {
        "method": "GET",
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

export const getAllChallenges = () => {
    return fetch('/api/books/challenges', {
        "method": "GET",
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

export const insertChallenge = (data) => {
    return fetch('/api/books/challenges/insert', {
        "method": "POST",
        "headers": {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            'Content-Type': 'application/x-www-form-urlencoded',
            "X-CSRFToken": readCookie('csrftoken')
        },
        "body": data
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

export const deleteChallenge = (id) => {
    return fetch('/api/books/challenges/' + id + '/delete', {
        "method": "DELETE",
        "headers": {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            'Content-Type': 'application/x-www-form-urlencoded',
            "X-CSRFToken": readCookie('csrftoken'),
            "challengeid": id
        }
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

export const getAvgRatings = (year) => {
    return fetch('/api/books/ratings', {
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

export const getRatingsCount = (year) => {
    return fetch('/api/books/ratings/count', {
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