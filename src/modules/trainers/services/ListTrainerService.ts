import { AppDataSource } from "@shared/typeorm/data-source";

import Trainer from "../typeorm/entities/Trainer";

export default class ListTrainerService {
  public async execute(): Promise<Trainer[]> {

    const trainersRepository =
      AppDataSource.getRepository(Trainer);

    return trainersRepository.find({
        relations: {
            pokemons: true,
        },
    });
  }
}