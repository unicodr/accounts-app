import 'whatwg-fetch';

export function getAccounts() {
    return get('api/v1/accounts');
}

export function addAccount(email: string) {
    return createData(email, 'api/v1/accounts');
}

export function deleteAccount(id: string) {
    return deleteData(id, 'api/v1/accounts');
}

export function updateAccount(id: string, email: string) {
    return updateData(id, email, 'api/v1/accounts');
}


function get(url: string) {
    return fetch(url)
        .then(response => response.json());
}

function createData(email: string, url: string) {
    let headers: Headers = new Headers({
        "Content-Type": "application/json"
    });
    return fetch(url + '/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ "email": email })
    })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        });
}

function deleteData(id: string, url: string) {
    return fetch(url + '/' + id, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        });
}

function updateData(id: string, email: string, url: string) {
    let headers: Headers = new Headers({
        "Content-Type": "application/json"
    });
    return fetch(url + '/', {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({ "id": id, "email": email })
    })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        });
}