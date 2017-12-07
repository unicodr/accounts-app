import * as admin from 'firebase-admin';
import Account from '../models/Account';

export default class AccountService {

    private db: admin.database.Database;

    constructor() {
        this.db = admin.database();
        admin.database.enableLogging(true);
    }

    getAll(): Promise<Account[]> {
        let accounts: Account[] = new Array<Account>();
        return this.db.ref('/')
            .once('value')
            .then((snapshot: FirebaseDataSnapshot) => {
                snapshot.forEach((child: FirebaseDataSnapshot) => {
                    accounts.push(new Account(child.val().id, child.val().email));
                });
                return accounts;
            });
    }

    create(account: Account): Promise<void> {
        let accountsRef: admin.database.Reference = this.db.ref().child('/');
        return this.getAll()
            .then(accounts => {
                return accounts.forEach(accountFromDb => {
                    if (accountFromDb.email === account.email) {
                        throw new Error(`Account with email ${account.email} already exists.`);
                    } else if (accountFromDb.id === account.id) {
                        throw new Error(`Account with id ${account.id} already exists.`);
                    }
                });
            }).then(() => accountsRef.child(account.id).set(account));
    }

    update(account: Account): Promise<void> {
        let accountsRef: admin.database.Reference = this.db.ref().child('/');
        return this.getAll()
            .then(accounts => {
                let accountsFromDb: Account[] = new Array<Account>();
                accounts.forEach(accountFromDb => {
                    if (accountFromDb.email === account.email) {
                        throw new Error(`Account with email ${account.email} already exists.`);
                    } else if (accountFromDb.id === account.id) {
                        accountsFromDb.push(accountFromDb);
                    }
                });
                if (accountsFromDb.length < 1) {
                    throw new Error(`Account with id ${account.id} does not exist.`);
                }
            }).then(() => accountsRef.child(account.id).set(account));
    }

    delete(id: string): Promise<void> {
        return this.db.ref(`/${id}`).remove();
    }
}