import { Request, Response, NextFunction } from 'express';
import JWT from '../utils/jwtFunctions';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const decode = new JWT();
  const tokenDecoded = decode.decodeToken(token);

  if (!tokenDecoded) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  return next();
};

export default validateToken;
