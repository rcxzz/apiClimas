import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";

import Trainer from "../typeorm/entities/Trainer";

interface IRequest {
  name: string;
  city_origin: string;
  age: number;
  badges: number;
  trainer_level: number;
}

export default class CreateTrainerService {
  public async execute({
    name,
    city_origin,
    age,
    badges,
    trainer_level,
  }: IRequest): Promise<Trainer> {

    const trainersRepository =
      AppDataSource.getRepository(Trainer);

    const trainerExists =
      await trainersRepository.findOne({
        where: { name },
      });

    if (trainerExists) {
      throw new AppError(
        "There is already one trainer with this name."
      );
    }

    const trainer =
      trainersRepository.create({
        name,
        city_origin,
        age,
        badges,
        trainer_level,
      });

    await trainersRepository.save(trainer);

    return trainer;
  }
}