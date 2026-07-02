import { AppDataSource } from "@shared/typeorm/data-source";
import { Repository } from "typeorm";

import Forecast from "../entities/Forecast";

export default class ForecastsRepository {
  private ormRepository: Repository<Forecast>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Forecast);
  }

  public async findByDateAndCity(
    data_previsao: Date,
    city_id: string,
  ): Promise<Forecast | null> {
    const forecast = await this.ormRepository.findOne({
      where: { 
        data_previsao,
        city_id,
      },
    });

    return forecast;
  }
}