import { Request } from 'express';

export interface JwtPayload {
  id: number;
  username: string;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}
