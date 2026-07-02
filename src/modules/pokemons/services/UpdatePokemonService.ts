import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";

import Pokemon from "../typeorm/entities/Pokemon";

interface IRequest {
  id: string;
  name: string;
  type: string;
  level: number;
  hp: number;
  rarity: string;
}

export default class UpdatePokemonService {
  public async execute({
    id,
    name,
    type,
    level,
    hp,
    rarity,
  }: IRequest): Promise<Pokemon> {

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

    const pokemonExists =
      await pokemonsRepository.findOneBy({
        name,
      });

    if (
      pokemonExists &&
      pokemonExists.id !== pokemon.id
    ) {
      throw new AppError(
        "There is already one pokemon with this name.",
      );
    }

    pokemon.name = name;
    pokemon.type = type;
    pokemon.level = level;
    pokemon.hp = hp;
    pokemon.rarity = rarity;

    await pokemonsRepository.save(pokemon);

    return pokemon;
  }
}