import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";

import Pokemon from "../typeorm/entities/Pokemon";

interface IRequest {
  id: string;
}

export default class DeletePokemonService {
  public async execute({
    id,
  }: IRequest): Promise<void> {

    const pokemonsRepository =
      AppDataSource.getRepository(Pokemon);

    const pokemon =
      await pokemonsRepository.findOneBy({
        id,
      });

    if (!pokemon) {
      throw new AppError(
        "Pokemon not found.",
      );
    }

    await pokemonsRepository.remove(
      pokemon,
    );
  }
}