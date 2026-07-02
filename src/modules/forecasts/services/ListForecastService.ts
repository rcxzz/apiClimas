import { AppDataSource } from "@shared/typeorm/data-source";
import Forecast from "../typeorm/entities/Forecast";

export default class ListForecastService {
  public async execute(): Promise<Forecast[]> {
    const forecastsRepository = AppDataSource.getRepository(Forecast);

    const forecasts = await forecastsRepository.find({
      relations: {
        city: true,
      },
    });

    return forecasts;
  }
}