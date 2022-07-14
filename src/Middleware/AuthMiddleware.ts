require('dotenv').config();
import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'src/Exeptions/HttpError';
import jwt from 'jsonwebtoken';

export class AuthMiddleware {
  async tokenVerify(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    try {
      if (!authorization) throw new HttpError(400, 'You need to login before');

      const tokenSchema = authorization.split(' ');
      if (tokenSchema.length < 2) throw new HttpError(400, 'Invalid token');

      const [prefix, token] = tokenSchema;
      const tokenParts = token.split('.').filter((values) => !!values);

      if (!/^Bearer$/i.test(prefix)) throw new HttpError(400, 'Invalid prefix');

      if (tokenParts.length < 3)
        throw new HttpError(400, 'badly formatted token');

      const isValidToken = jwt.verify(token, process.env.SECRET_KEY as string);
      if (!isValidToken) throw new HttpError(400, 'Invalid token');

      next();
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  getUserLogged(authorization: string | undefined) {
    if (!authorization) throw new HttpError(401, 'You need to login before');
    const [prefix, token] = authorization.split(' ');

    return jwt.verify(token, process.env.SECRET_KEY as string);
  }
}
