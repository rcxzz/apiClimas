import { Request, Response, NextFunction } from 'express';

import CreateForecastService from '../services/CreateForecastService';
import DeleteForecastService from '../services/DeleteForecastService';
import ListForecastService from '../services/ListForecastService';
import ShowForecastService from '../services/ShowForecastService';
import UpdateForecastService from '../services/UpdateForecastService';

export default class ForecastsController {

  public async index(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const listForecasts = new ListForecastService();

      const forecasts = await listForecasts.execute();

      return response.json(forecasts);
    } catch (err) {
      next(err);
    }
  }

  public async show(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const id = request.params.id as string;

      const showForecast = new ShowForecastService();

      const forecast = await showForecast.execute({
        id,
      });

      return response.json(forecast);
    } catch (err) {
      next(err);
    }
  }

  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const {
        data_previsao,
        temperatura_maxima,
        temperatura_minima,
        condicao_climatica,
        umidade_ar,
        city_id, 
      } = request.body;

      const createForecast = new CreateForecastService();

      const forecast = await createForecast.execute({
        data_previsao,
        temperatura_maxima,
        temperatura_minima,
        condicao_climatica,
        umidade_ar,
        city_id,
      });

      return response
        .status(201)
        .json(forecast);
    } catch (err) {
      next(err);
    }
  }

  public async update(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const id = request.params.id as string;

      const {
        data_previsao,
        temperatura_maxima,
        temperatura_minima,
        condicao_climatica,
        umidade_ar,
      } = request.body;

      const updateForecast = new UpdateForecastService();

      const forecast = await updateForecast.execute({
        id,
        data_previsao,
        temperatura_maxima,
        temperatura_minima,
        condicao_climatica,
        umidade_ar,
      });

      return response.json(forecast);
    } catch (err) {
      next(err);
    }
  }

  public async delete(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const id = request.params.id as string;

      const deleteForecast = new DeleteForecastService();

      await deleteForecast.execute({
        id,
      });

      return response
        .status(204)
        .send();
    } catch (err) {
      next(err);
    }
  }
}