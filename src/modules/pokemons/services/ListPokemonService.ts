import { AppDataSource } from "@shared/typeorm/data-source";

import Pokemon from "../typeorm/entities/Pokemon";

export default class ListPokemonService {
  public async execute(): Promise<Pokemon[]> {

    const pokemonsRepository =
      AppDataSource.getRepository(Pokemon);

    return pokemonsRepository.find({
        relations: {
            trainer: true,
        },
    });
  }
}