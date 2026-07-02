import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";
import Forecast from "../typeorm/entities/Forecast";

interface IRequest {
  id: string;
}

export default class ShowForecastService {
  public async execute({ id }: IRequest): Promise<Forecast> {
    const forecastsRepository = AppDataSource.getRepository(Forecast);

    const forecast = await forecastsRepository.findOne({
      where: { id },
      relations: {
        city: true,
      },
    });

    if (!forecast) {
      throw new AppError("Forecast not found.");
    }

    return forecast;
  }
}