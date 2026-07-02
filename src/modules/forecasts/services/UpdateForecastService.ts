import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";
import Forecast from "../typeorm/entities/Forecast";

interface IRequest {
  id: string;
  data_previsao: Date;
  temperatura_maxima: number;
  temperatura_minima: number;
  condicao_climatica: string;
  umidade_ar: number;
}

export default class UpdateForecastService {
  public async execute({
    id,
    data_previsao,
    temperatura_maxima,
    temperatura_minima,
    condicao_climatica,
    umidade_ar,
  }: IRequest): Promise<Forecast> {
    const forecastsRepository = AppDataSource.getRepository(Forecast);

    const forecast = await forecastsRepository.findOne({
      where: { id },
    });

    if (!forecast) {
      throw new AppError("Forecast not found.");
    }

    forecast.data_previsao = data_previsao;
    forecast.temperatura_maxima = temperatura_maxima;
    forecast.temperatura_minima = temperatura_minima;
    forecast.condicao_climatica = condicao_climatica;
    forecast.umidade_ar = umidade_ar;

    await forecastsRepository.save(forecast);

    return forecast;
  }
}