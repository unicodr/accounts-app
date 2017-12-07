import { getAccounts, deleteAccount, updateAccount, addAccount } from './accountApi';
import Account from '../models/Account';

getAccounts().then(() => {
    fetchAll();
});

(<any>window).createAccount = function () {
    let email = (<HTMLInputElement>document.getElementById('newAccount')).value;
    addAccount(email).then(result => {
        fetchAll();
    }).catch(error => {
        alert("Error caught: " + error);
    });
};

(<any>window).deleteAccount = function (id: string) {
    deleteAccount(id).then(result => {
        fetchAll();
    }).catch(error => {
        alert("Error caught: " + error);
    });
};

(<any>window).updateAccount = function (id: string) {
    let email = (<HTMLInputElement>document.getElementById("email-" + id)).value;
    updateAccount(id, email).then(result => {
        fetchAll();
    }).catch(error => {
        alert("Error caught: " + error);
    });
};

function fetchAll() {
    getAccounts().then(result => {
        let accountsBody: string = "";

        result.forEach((account: Account) => {
            accountsBody += `<tr id="${account.id}">
                <td><input id="id-${account.id}" type="text" value=${account.id} disabled></td>
                <td><input id="email-${account.id}" type="text" value=${account.email}></td>
                <td><button id="${account.id}" onClick="updateAccount(this.id)">Edit</button></td>
                <td><button id="${account.id}" onClick="deleteAccount(this.id)">Delete</button></td>
                </tr>`
        });
        const accountsElement: HTMLElement = document.getElementById('accounts')!;
        accountsElement.innerHTML = accountsBody;
    }).catch(error => {
        alert("Error caught: " + error);
    });
}