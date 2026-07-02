import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import { AppDataSource } from '@shared/typeorm/data-source';
import User from '../typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = AppDataSource.getRepository(User);

    const emailExists = await usersRepository.findOne({
      where: { email },
    });

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}