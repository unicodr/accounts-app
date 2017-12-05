import { Router, Request, Response } from 'express';
import AccountService from '../services/AccountService';
import { v4 as uuid } from 'uuid';
var Account = require("../models/Account");

export class AccountResource {
  router: Router;
  accountService: AccountService;

  constructor() {
    this.router = Router();
    this.router.get('/', this.getAll);
    this.router.post('/', this.addAccount);
    this.router.put('/', this.updateAccount);
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
        if (accounts === null) {
          res.sendStatus(400);
        } else {
          res.json(accounts);
        }
      });
  }

  /**
  * POST an account.
  */
  addAccount(req: Request, res: Response) {
    let email = req.body.email;
    let accountToAdd = new Account(uuid(), email);
    let accountService: AccountService = new AccountService();
    accountService.create(accountToAdd)
      .then(() => res.sendStatus(200));
  }

  /**
   * PUT an account.
   */
  updateAccount(req: Request, res: Response) {
    let accountToUpdate: Account = req.body;
    let accountService: AccountService = new AccountService();
    accountService.update(accountToUpdate)
      .then(() => res.sendStatus(200));
  }

  /**
   * DELETE an account.
   */
  deleteAccount(req: Request, res: Response) {
    let id_param: string = req.params.accountId;
    let accountService: AccountService = new AccountService();
    accountService.delete(id_param)
      .then(() => res.sendStatus(200))
      .catch(error => {
        res.sendStatus(400);
      });
  }
}

export default new AccountResource().router;