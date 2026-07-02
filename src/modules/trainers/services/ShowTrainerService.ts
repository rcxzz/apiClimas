import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";

import Trainer from "../typeorm/entities/Trainer";

interface IRequest {
  id: string;
}

export default class ShowTrainerService {
  public async execute({
    id,
  }: IRequest): Promise<Trainer> {

    const trainersRepository =
      AppDataSource.getRepository(Trainer);

    const trainer = await trainersRepository.findOne({
        where: { id },
        relations: {
            pokemons: true,
        },
    });

    if (!trainer) {
      throw new AppError(
        "Trainer not found."
      );
    }

    return trainer;
  }
}