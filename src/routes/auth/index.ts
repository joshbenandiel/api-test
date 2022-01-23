import express, { Request, Response } from 'express'
import AuthController from './resolver';

const router = express.Router();
const resolver = new AuthController();

router.post('/login', resolver.login);

export default router;