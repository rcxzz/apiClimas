import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";

import Pokemon from "../typeorm/entities/Pokemon";
import Trainer from "@modules/trainers/typeorm/entities/Trainer";

interface IRequest {
  name: string;
  type: string;
  level: number;
  hp: number;
  rarity: string;
  trainer_id: string;
}

export default class CreatePokemonService {
  public async execute({
    name,
    type,
    level,
    hp,
    rarity,
    trainer_id,
  }: IRequest): Promise<Pokemon> {

    const pokemonsRepository =
      AppDataSource.getRepository(Pokemon);

    const trainersRepository =
      AppDataSource.getRepository(Trainer);

    const pokemonExists =
      await pokemonsRepository.findOne({
        where: { name },
      });

    if (pokemonExists) {
      throw new AppError(
        "There is already one pokemon with this name.",
      );
    }

    const trainer =
      await trainersRepository.findOne({
        where: { id: trainer_id },
      });

    if (!trainer) {
      throw new AppError(
        "Trainer not found.",
      );
    }

    const pokemon =
      pokemonsRepository.create({
        name,
        type,
        level,
        hp,
        rarity,
        trainer_id,
      });

    await pokemonsRepository.save(pokemon);

    return pokemon;
  }
}