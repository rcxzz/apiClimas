// src/shared/controllers/SessionsController.ts
import { Request, Response, NextFunction } from 'express';
import { sign } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';

export default class SessionsController {
  public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password } = request.body;

      // Login de teste temporário sem banco de dados
      if (email === 'admin@clima.com' && password === '123456') {
        
        // Gera o token usando um ID fictício
        const token = sign({}, 'SUA_CHAVE_SECRETA', {
          subject: 'id-ficticio-do-admin',
          expiresIn: '1d',
        });

        return response.json({
          user: { name: 'Admin do Clima', email },
          token,
        });
      }

      throw new AppError('E-mail ou senha incorretos.', 401);

    } catch (err) {
      next(err);
    }
  }
}