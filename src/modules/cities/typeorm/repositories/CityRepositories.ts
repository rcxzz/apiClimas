import { AppDataSource } from "@shared/typeorm/data-source";
import { Repository } from "typeorm";

import City from "../entities/City";

export default class CitiesRepository {
  private ormRepository: Repository<City>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(City);
  }

  public async findByNome(
    nome: string,
  ): Promise<City | null> {
    const city = await this.ormRepository.findOne({
      where: { nome },
    });

    return city;
  }
}