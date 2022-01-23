import { Request, Response } from "express";
import BaseController from "../base";
import Contact from '../../models/contact';

class AuthController extends BaseController {
  /**
   *
   */
  constructor() {
    super();
  }

  public login = async (req: Request, res: Response) => {
    try {
      const email: string = req.body.email;
      const password: string = req.body.password;

      const user = await Contact.findOne({ email });

      if (!user) {
        return this.ok(res, { 
          status: 'failed',
          msg: 'Cannot find user' 
        })
      };

      if (password !== user.password) {
        return this.ok(res, { 
          status: 'failed',
          msg: 'Invalid email or password' 
        })
      }

      return this.ok(res, {
        msg: 'login success',
        code: 200,
        status: 'success',
        user
      });
      
    } catch (error) {
      this.failed(res, error)
    }
  }
}

export default AuthController;