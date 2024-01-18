import { readCookie } from "../Functions";

export const registerUser = (formData) => {
    return fetch(`/api/auth/register`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
}

export const loginUser = (username, password, formData) => {
    return fetch(`/api/auth/login?username=${username}&password=${password}`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
}

export const getAllBooks = () => {
    return fetch('/api/books/all', {
        "method": "GET",
        "headers": {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "userid": localStorage.getItem('id')
        },
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

export const getAllChallenges = () => {
    return fetch('/api/books/challenges', {
        "method": "GET",
        "headers": {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "userid": localStorage.getItem('id')
        },
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
            "X-CSRFToken": readCookie('csrftoken'),
            "userid": localStorage.getItem('id')
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
            "year": year,
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "userid": localStorage.getItem('id')
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
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "year": year,
            "userid": localStorage.getItem('id')
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
        "headers": {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "userid": localStorage.getItem('id')
        }
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

export const getBooksPerYearPerGenres = (year) => {
    return fetch('/api/books/genres', {
        "method": "GET",
        "headers": {
            "year": year,
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "userid": localStorage.getItem('id')
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
            "year": year,
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "userid": localStorage.getItem('id')
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
            "year": year,
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "userid": localStorage.getItem('id')
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
            "year": year,
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "userid": localStorage.getItem('id')
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

export const insertBook = (book) => {
    return fetch('/api/books/insert', {
        "method": "POST",
        "headers": {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "userid": localStorage.getItem('id')
        },
        "body": JSON.stringify(book)
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

export const deleteBook = (bookid) => {
    return fetch('/api/books/delete', {
        "method": "DELETE",
        "headers": {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "userid": localStorage.getItem('id'),
            "bookid": bookid
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
}