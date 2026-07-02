import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token está faltando.', 401);
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    throw new AppError('JWT Token inválido.', 401);
  }

  try {
    const decoded = verify(token, '338f727fd110271699986f4f236838b2' as string);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('JWT Token inválido.', 401);
  }
}