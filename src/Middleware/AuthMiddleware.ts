require('dotenv').config();
import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'src/Exeptions/HttpError';
import jwt from 'jsonwebtoken';

export class AuthMiddleware {
  async tokenVerify(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    try {
      if (!authorization) throw new HttpError(401, 'Login required!');

      const tokenSchema = authorization.split('');
      if (tokenSchema.length < 2)
        throw new HttpError(400, 'badly formatted token');

      const [prefix, token] = tokenSchema;
      const parts = token.split('.').filter((value) => !!value);
      if (!/^Bearer$/i.test(prefix)) throw new HttpError(400, 'Invalid prefix');

      if (parts.length < 3) throw new HttpError(400, 'badly formatted token');

      const validToken = jwt.verify(token, process.env.SECRET_KEY as string);
      if (!validToken) throw new HttpError(400, 'Invalid token');

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error });
    }
  }
}
