import {NextFunction, Request, Response} from 'express';
import {JwtService} from '../services/JwtService';

const jwtService = new JwtService();

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;
    const [_, bearerToken] = authorization.split('Bearer ');
    const tokenPayload = jwtService.verifyToken(bearerToken);
    if (!tokenPayload) {
      return res.status(401).json({ errors: 'not authorized' });
    }
    req.userId = tokenPayload.id;
    next();
  } catch (error) {
    return res.status(401).json({ errors: 'not authorized' });
  }
}
