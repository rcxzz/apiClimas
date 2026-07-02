import { AppDataSource } from "@shared/typeorm/data-source";
import Forecast from "../typeorm/entities/Forecast";

export default class ListForecastService {
  public async execute(): Promise<Forecast[]> {
    const forecastsRepository = AppDataSource.getRepository(Forecast);

    // Lista todas as previsões trazendo os dados básicos da cidade pai junto
    const forecasts = await forecastsRepository.find({
      relations: {
        city: true,
      },
    });

    return forecasts;
  }
}