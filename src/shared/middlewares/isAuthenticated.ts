import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token está faltando.', 401);
  }

  // Divide o cabeçalho "Bearer <token>" em um array
  const parts = authHeader.split(' ');

  // Verifica se o formato possui exatamente duas partes (Bearer e o Token)
  if (parts.length !== 2) {
    throw new AppError('JWT Token com formato inválido.', 401);
  }

  const [scheme, token] = parts;

  // Verifica se a primeira parte é a palavra "Bearer"
  if (!/^Bearer$/i.test(scheme)) {
    throw new AppError('JWT Token mal formatado.', 401);
  }

  try {
    // Com a validação acima, o TS garante que 'token' é uma string 100% válida
    verify(token, 'SUA_CHAVE_SECRETA');

    return next(); // Token válido, pode seguir para a Controller!
  } catch {
    throw new AppError('JWT Token inválido.', 401);
  }
}