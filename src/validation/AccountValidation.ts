import * as Ajv from 'ajv';
import { NextFunction, Request, Response } from 'express';
import { ErrorObject, Thenable } from 'ajv';

let ajv: Ajv.Ajv = Ajv({ allErrors: true });

export function validateSchema() {
  return (req: Request, res: Response, next: NextFunction) => {
    let accountschema: Object = {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "format": "email"
        }
      },
      "required": ["email"]
    };
    let valid: boolean | Thenable<any> = ajv.validate(accountschema, req.body)
    if (!valid) {
      return res.status(400).send({ error: ajv.errors });
    }
    next();
  }
}


function errorResponse(validationErrors: Ajv.ErrorObject[] | undefined) {
  if (validationErrors !== undefined) {
    let errors: {}[] = validationErrors.map((error: Ajv.ErrorObject) => {
      return {
        path: error.dataPath,
        message: error.message
      }
    });
    return {
      status: 'failed',
      errors: errors
    }
  }
}
