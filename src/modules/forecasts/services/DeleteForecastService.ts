import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";
import Forecast from "../typeorm/entities/Forecast";

interface IRequest {
  id: string;
}

export default class DeleteForecastService {
  public async execute({ id }: IRequest): Promise<void> {
    const forecastsRepository = AppDataSource.getRepository(Forecast);

    const forecast = await forecastsRepository.findOne({
      where: { id },
    });

    if (!forecast) {
      throw new AppError("Forecast not found.");
    }

    await forecastsRepository.remove(forecast);
  }
}