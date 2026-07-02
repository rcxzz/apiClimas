import { Request, Response, NextFunction } from 'express';
import CreateUserService from '../services/CreateUserService';
import CreateSessionService from '../services/CreateSessionService';

export default class AuthController {
  // Rota de Cadastro
  public async register(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { name, email, password } = request.body;

      const createUser = new CreateUserService();
      const user = await createUser.execute({ name, email, password });

      const userResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };

      return response.status(201).json(userResponse);
    } catch (err) {
      next(err);
    }
  }

  // Rota de Login
  public async login(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password } = request.body;

      const createSession = new CreateSessionService();
      const { user, token } = await createSession.execute({ email, password });

      return response.json({ user, token });
    } catch (err) {
      next(err);
    }
  }
}