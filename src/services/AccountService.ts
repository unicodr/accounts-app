import * as admin from 'firebase-admin';
import Account from '../models/Account';

export default class AccountService {

    private db: admin.database.Database;

    constructor() {
        this.db = admin.database();
        admin.database.enableLogging(true);
    }

    getAll(): Promise<Account[]> {
        let accounts = new Array<Account>();
        return this.db.ref('/')
            .once('value')
            .then(snapshot => {
                snapshot.forEach(child => {
                    accounts.push(new Account(child.val().id, child.val().email));
                });
                return accounts;
            })
            .catch(error => {
                console.log(`Something went wrong: ${error}`);
                throw error;
            });
    }

    create(account: Account): Promise<void> {
        let accountsRef = this.db.ref().child('/');
        return accountsRef.child(account.id)
            .set(account)
            .catch(error => {
                console.log(`Something went wrong: ${error}`);
                throw error;
            });;
    }

    update(account: Account): Promise<void> {
        let accountsRef = this.db.ref().child('/');
        return accountsRef.child(account.id)
            .set(account)
            .catch(error => {
                console.log(`Something went wrong: ${error}`);
                throw error;
            });;
    }

    delete(id: string): Promise<void> {
        return this.db.ref(`/${id}`)
            .remove()
            .catch(error => {
                console.log(`Something went wrong: ${error}`);
                throw error;
            });
    }
}