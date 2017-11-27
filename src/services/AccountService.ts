import { Account } from "../models/account";

export default class AccountService {

    private accounts: Account[];

    constructor() {
        // Array of accounts for test data
        if (process.env.NODE_ENV == 'test') {
            this.accounts = [
                new Account("id1", "julia@gmail.com"),
                new Account("id2", "jonas@gmail.com"),
                new Account("id3", "amanda@gmail.com"),
                new Account("id4", "karl@gmail.com")
            ];
        } else {
        this.accounts = null;
        }
    }

    getAll(): Account[] {
        return this.accounts;
    }

    get(id: string): Account | null {
        return this.getAccount(id);
    }


    create(account: Account): Account | null {
        if (this.getAccount(account.id) !== null) {
            return null;
        }
        this.accounts.push(account);
        return account;
    }

    update(account: Account): Account | null {
        let accountToUpdate = this.getAccount(account.id);
        if (accountToUpdate === null) {
            return null;
        } else {
            let index = this.accounts.indexOf(accountToUpdate);
            this.accounts[index] = account;
        }
        return account;
    }

    delete(id: string): Account | null {
        let accountToDelete = this.getAccount(id);
        if (accountToDelete === null) {
            return null;
        } else {
            let index = this.accounts.indexOf(accountToDelete);
            return this.accounts.splice(index, 1)[0];
            
        }
    }

    private getAccount(id: string): Account | null {
        for (let account of this.accounts) {
            if (account.id === id) {
                return account;
            }
        }
        return null;
    }
}