import { DecodedUser } from '../../middlewares/authMiddleware'; // or define again here
import { Request } from 'express';
export interface DecodedUser {
  userid: string;
  email: string;
  iat: number;
  exp: number;
}
declare global {
  namespace Express {
    interface Request {
      user?: DecodedUser;
    }
  }
}
