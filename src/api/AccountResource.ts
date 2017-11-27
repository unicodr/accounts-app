import { Router, Request, Response } from 'express';
import { Account } from "../models/account";
import AccountService from "../services/AccountService";

export class AccountResource {
  router: Router;
  accountService: AccountService;

  constructor() {
    this.router = Router();
    this.router.get('/', this.getAll);
    this.router.get('/:accountId', this.getAccount);
    this.router.post('/', this.addAccount);
    this.router.put('/', this.updateAccount);
    this.router.delete('/:accountId', this.deleteAccount);

  }

  /**
   * GET all accounts.
   */
  getAll(req: Request, res: Response) {
    let accountService = new AccountService();
    let accounts = accountService.getAll();
    if (accounts == null) {
      res.sendStatus(400);
    } else {
      res.json(accounts);
    }
  }

  /**
   * GET an account by id.
   */
  getAccount(req: Request, res: Response) {
    let idParam = req.params.accountId;
    let accountService = new AccountService();
    let account = accountService.get(idParam);
    if (account == null) {
      res.sendStatus(400);
    } else {
      res.json(account);
    }
  }

  /**
  * POST an account.
  */
  addAccount(req: Request, res: Response) {
    let accountToAdd = req.body;
    let accountService = new AccountService();
    let account = accountService.create(accountToAdd);
    if (account == null) {
      res.sendStatus(400);
    } else {
      res.json(account);
    }
  }

  /**
   * PUT an account.
   */
  updateAccount(req: Request, res: Response) {
    let accountToUpdate = req.body;
    let accountService = new AccountService();
    let account = accountService.update(accountToUpdate);
    if (account == null) {
      res.sendStatus(400);
    } else {
      res.json(account);
    }
  }

  /**
   * DELETE an account.
   */
  deleteAccount(req: Request, res: Response) {
    let id_param = req.params.accountId;
    let accountService = new AccountService();
    let account = accountService.delete(id_param);
    if (account == null) {
      res.sendStatus(400);
    } else {
      res.json(account);
    }
  }
}

const accountResource = new AccountResource();
export default accountResource.router;