import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";

import Trainer from "../typeorm/entities/Trainer";

interface IRequest {
  id: string;
  name: string;
  city_origin: string;
  age: number;
  badges: number;
  trainer_level: number;
}

export default class UpdateTrainerService {
  public async execute({
    id,
    name,
    city_origin,
    age,
    badges,
    trainer_level,
  }: IRequest): Promise<Trainer> {

    const trainersRepository =
      AppDataSource.getRepository(Trainer);

    const trainer =
      await trainersRepository.findOneBy({
        id,
      });

    if (!trainer) {
      throw new AppError(
        "Trainer not found."
      );
    }

    const trainerExists =
      await trainersRepository.findOneBy({
        name,
      });

    if (
      trainerExists &&
      trainerExists.id !== trainer.id
    ) {
      throw new AppError(
        "There is already one trainer with this name."
      );
    }

    trainer.name = name;
    trainer.city_origin = city_origin;
    trainer.age = age;
    trainer.badges = badges;
    trainer.trainer_level = trainer_level;

    await trainersRepository.save(trainer);

    return trainer;
  }
}