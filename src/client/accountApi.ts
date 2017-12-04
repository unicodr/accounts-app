import 'whatwg-fetch';

export function getAccounts() {
    return get('api/v1/accounts');
}

export function addAccount(email) {
    return createData(email, 'api/v1/accounts');
}

export function deleteAccount(id) {
    return deleteData(id, 'api/v1/accounts');
}

export function updateAccount(id, email) {
    return updateData(id, email, 'api/v1/accounts');
}


function get(url) {
    return fetch(url).then(onSuccess, onError);
}

function createData(email, url) {
    let headers = new Headers({
        "Content-Type": "application/json"
      });
    return fetch(url + '/', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({"email": email})
    })
    .then(response => {
        return response.ok;
    });
  }

function deleteData(id, url) {
    return fetch(url + '/' + id, {
      method: 'DELETE'
    })
    .then(response => {
        return response.ok;
    });
  }

  function updateData(id, email, url) {
    let headers = new Headers({
        "Content-Type": "application/json"
      });
    return fetch(url + '/', {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({"id": id, "email": email})
    })
    .then(response => {
        return response.ok;
    });
  }

function onSuccess(response) {
    return response.json();
}

function onError(error) {
    (<any>alert).msg(`Something went wrong: ${error}`);
}