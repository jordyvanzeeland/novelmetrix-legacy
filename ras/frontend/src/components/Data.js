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