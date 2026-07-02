import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";

import Pokemon from "../typeorm/entities/Pokemon";

interface IRequest {
  id: string;
}

export default class ShowPokemonService {
  public async execute({
    id,
  }: IRequest): Promise<Pokemon> {

    const pokemonsRepository =
      AppDataSource.getRepository(Pokemon);

    const pokemon = await pokemonsRepository.findOne({
        where: { id },
        relations: {
            trainer: true,
        },
    });

    if (!pokemon) {
      throw new AppError(
        "Pokemon not found.",
      );
    }

    return pokemon;
  }
}