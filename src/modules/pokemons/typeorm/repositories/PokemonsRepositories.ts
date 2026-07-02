import { AppDataSource } from "@shared/typeorm/data-source";
import { Repository } from "typeorm";

import Pokemon from "../entities/Pokemon";

export default class PokemonsRepository {
  private ormRepository: Repository<Pokemon>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Pokemon);
  }

  public async findByName(
    name: string,
  ): Promise<Pokemon | null> {
    const pokemon = await this.ormRepository.findOne({
      where: { name },
    });

    return pokemon;
  }
}