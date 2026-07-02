import { AppDataSource } from "@shared/typeorm/data-source";
import { Repository } from "typeorm";

import Trainer from "../entities/Trainer";

export default class TrainersRepository {
  private ormRepository: Repository<Trainer>;

  constructor() {
    this.ormRepository =
      AppDataSource.getRepository(Trainer);
  }

  public async findByName(
    name: string,
  ): Promise<Trainer | null> {

    const trainer =
      await this.ormRepository.findOne({
        where: { name },
      });

    return trainer;
  }
}