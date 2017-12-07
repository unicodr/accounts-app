import { Router, Request, Response } from 'express';
import AccountService from '../services/AccountService';
import { v4 as uuid } from 'uuid';
import Account from '../models/Account';
import * as validator from '../validation/AccountValidation';

export class AccountResource {
  router: Router;
  accountService: AccountService;

  constructor() {
    this.router = Router();
    this.router.get('/', this.getAll);
    this.router.post('/', validator.validateSchema(), this.addAccount);
    this.router.put('/', validator.validateSchema(), this.updateAccount);
    this.router.delete('/:accountId', this.deleteAccount);
  }

  /**
   * GET all accounts.
   */
  getAll(req: Request, res: Response) {
    let accountService: AccountService = new AccountService();
    let accounts: Account[];
    accountService.getAll()
      .then(accounts => {
        if (accounts === undefined || accounts.length < 1) {
          res.sendStatus(404);
        } else {
          res.json(accounts);
        }
      }).catch(error => {
        res.status(500).send({ error: error.toString() });
      });
  }

  /**
  * POST an account.
  */
  addAccount(req: Request, res: Response) {
    let email: string = req.body.email;
    let accountToAdd: Account = new Account(uuid(), email);
    let accountService: AccountService = new AccountService();
    return accountService.create(accountToAdd)
      .then(() =>
        res.sendStatus(200))
      .catch(error => {
        res.status(500).send({ error: error.toString() });
      });
  }

  /**
   * PUT an account.
   */
  updateAccount(req: Request, res: Response) {
    let accountToUpdate: Account = req.body;
    let accountService: AccountService = new AccountService();
    accountService.update(accountToUpdate)
      .then(() => res.sendStatus(200))
      .catch(error => {
        res.status(500).send({ error: error.toString() });
      });
  }

  /**
   * DELETE an account.
   */
  deleteAccount(req: Request, res: Response) {
    let id_param: string = req.params.accountId;
    let accountService: AccountService = new AccountService();
    accountService.delete(id_param)
      .then(() =>
        res.sendStatus(200))
      .catch(error => {
        res.status(500).send({ error: error.toString() });
      });
  }
}

export default new AccountResource().router;