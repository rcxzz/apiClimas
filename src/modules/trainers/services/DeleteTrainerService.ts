import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";

import Trainer from "../typeorm/entities/Trainer";

interface IRequest {
  id: string;
}

export default class DeleteTrainerService {
  public async execute({
    id,
  }: IRequest): Promise<void> {

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

    await trainersRepository.remove(
      trainer,
    );
  }
}