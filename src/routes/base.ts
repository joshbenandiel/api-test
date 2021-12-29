
import * as express from 'express';
import { Request, Response } from 'express'
import * as mongoose from 'mongoose';

class BaseController {

  protected router = express.Router();

  constructor() {
  }

  protected ObjectId = (id: string) => {
    return new mongoose.Types.ObjectId(id);
  } 

  protected ok(res: Response, result: any) {
    return res.status(200).json({
      status: 'success',
      result
    })
  }

  protected failed(res: Response, error: any) {
    console.log({ error })
    return res.status(400).json({
      status: 'failed',
      result: error
    })
  }

}

export default BaseController;