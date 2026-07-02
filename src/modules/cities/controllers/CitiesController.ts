import { Request, Response, NextFunction } from 'express';

import CreateCityService from '../services/CreateCityService';
import DeleteCityService from '../services/DeleteCityService';
import ListCityService from '../services/ListCityService';
import ShowCityService from '../services/ShowCityService';
import UpdateCityService from '../services/UpdateCityService';

export default class CitiesController {

  public async index(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {

      const listCities =
        new ListCityService();

      const cities =
        await listCities.execute();

      return response.json(cities);

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

      const id =
        request.params.id as string;

      const showCity =
        new ShowCityService();

      const city =
        await showCity.execute({
          id,
        });

      return response.json(city);

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
        nome,
        estado,
        pais,
        latitude,
        longitude,
      } = request.body;

      const createCity =
        new CreateCityService();

      const city =
        await createCity.execute({
          nome,
          estado,
          pais,
          latitude,
          longitude,
        });

      return response
        .status(201)
        .json(city);

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

      const id =
        request.params.id as string;

      const {
        nome,
        estado,
        pais,
        latitude,
        longitude,
      } = request.body;

      const updateCity =
        new UpdateCityService();

      const city =
        await updateCity.execute({
          id,
          nome,
          estado,
          pais,
          latitude,
          longitude,
        });

      return response.json(city);

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

      const id =
        request.params.id as string;

      const deleteCity =
        new DeleteCityService();

      await deleteCity.execute({
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