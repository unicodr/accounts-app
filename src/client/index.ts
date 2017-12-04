import { getAccounts, deleteAccount, updateAccount, addAccount } from './accountApi';

getAccounts().then(result => {
   fetchAll();
});

function fetchAll () {
    getAccounts().then(result => {
        let accountsBody = "";

        result.forEach(account => {
            accountsBody += `<tr id="${account.id}">
                <td><input id="id-${account.id}" type="text" value=${account.id} disabled></td>
                <td><input id="email-${account.id}" type="text" value=${account.email}></td>
                <td><button id="${account.id}" onClick="updateAccount(this.id)">Edit</button></td>
                <td><button id="${account.id}" onClick="deleteAccount(this.id)">Delete</button></td>
                </tr>`
        });
        document.getElementById('accounts').innerHTML = accountsBody;
    });
};

(<any>window).createAccount = function () {
    let email = (<HTMLInputElement>document.getElementById('newAccount')).value;
    addAccount(email).then(result => {
        fetchAll();
    });
};

(<any>window).deleteAccount = function (id) {
    deleteAccount(id).then(result => {
        fetchAll();
    });
};

(<any>window).updateAccount = function (id) {
    let email = (<HTMLInputElement>document.getElementById("email-" + id)).value;
    updateAccount(id, email).then(result => {
        fetchAll();
    });
};