export const server = {
    get: getMethod,
    getById: getByIdMethod,
    post: postMethod,
    put: putMethod,
    delete: deleteMethod,
}

function getMethod(endpoint, params = null) {
    const queryString = params ? new URLSearchParams(params).toString() : null
    const urlWithParams = queryString ? `${endpoint}?${queryString}` : endpoint

    const obj = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
    }

    return fetch(urlWithParams, obj).then((res) => {
        return parseResult(res)
    })
}

function getByIdMethod(endpoint, id) {
    const url = id ? `${endpoint}/${id}` : endpoint

    const obj = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
        })
    }

    return fetch(url, obj).then((res) => {
        return parseResult(res)
    })
}

function postMethod(endpoint, body) {
    const obj = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(body),
    }

    return fetch(endpoint, obj).then((res) => {
        return parseResult(res)
    })
}

function putMethod(endpoint, body) {
    const obj = {
        method: 'PUT',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(body),
    }

    return fetch(endpoint, obj).then((res) => {
        return parseResult(res)
    })
}

function deleteMethod(endpoint, id) {
    const obj = {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json',
        })
    }

    return fetch(`${endpoint}${id ? id : ''}`, obj).then((res) => {
        return parseResult(res)
    })
}

function parseResult(res) {
    if (res.ok && res.status !== 204) {
        return res.json()
    }
}