import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";

import Forecast from "../typeorm/entities/Forecast";
import City from "@modules/cities/typeorm/entities/City";

interface IRequest {
  data_previsao: Date;
  temperatura_maxima: number;
  temperatura_minima: number;
  condicao_climatica: string;
  umidade_ar: number;
  city_id: string;
}

export default class CreateForecastService {
  public async execute({
    data_previsao,
    temperatura_maxima,
    temperatura_minima,
    condicao_climatica,
    umidade_ar,
    city_id,
  }: IRequest): Promise<Forecast> {

    const forecastsRepository =
      AppDataSource.getRepository(Forecast);

    const citiesRepository =
      AppDataSource.getRepository(City);

    const forecastExists =
      await forecastsRepository.findOne({
        where: { 
          data_previsao,
          city_id 
        },
      });

    if (forecastExists) {
      throw new AppError(
        "There is already a forecast for this city on this date.",
      );
    }

    const city =
      await citiesRepository.findOne({
        where: { id: city_id },
      });

    if (!city) {
      throw new AppError(
        "City not found.",
      );
    }

    const forecast =
      forecastsRepository.create({
        data_previsao,
        temperatura_maxima,
        temperatura_minima,
        condicao_climatica,
        umidade_ar,
        city_id,
      });

    await forecastsRepository.save(forecast);

    return forecast;
  }
}