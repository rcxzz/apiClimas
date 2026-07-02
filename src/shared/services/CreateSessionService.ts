import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import { AppDataSource } from '@shared/typeorm/data-source';
import User from '../typeorm/entities/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Omit<User, 'password'>;
  token: string;
}

export default class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = AppDataSource.getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password || '');

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, '338f727fd110271699986f4f236838b2', {
      subject: user.id,
      expiresIn: '1d',
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return {
      user: userWithoutPassword,
      token,
    };
  }
}