import { Request, Response, NextFunction } from 'express';

import CreateTrainerService from '../services/CreateTrainerService';
import DeleteTrainerService from '../services/DeleteTrainerService';
import ListTrainerService from '../services/ListTrainerService';
import ShowTrainerService from '../services/ShowTrainerService';
import UpdateTrainerService from '../services/UpdateTrainerService';

export default class TrainersController {

  public async index(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {

      const listTrainers =
        new ListTrainerService();

      const trainers =
        await listTrainers.execute();

      return response.json(trainers);

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

      const showTrainer =
        new ShowTrainerService();

      const trainer =
        await showTrainer.execute({
          id,
        });

      return response.json(trainer);

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
        name,
        city_origin,
        age,
        badges,
        trainer_level,
      } = request.body;

      const createTrainer =
        new CreateTrainerService();

      const trainer =
        await createTrainer.execute({
          name,
          city_origin,
          age,
          badges,
          trainer_level,
        });

      return response
        .status(201)
        .json(trainer);

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
        name,
        city_origin,
        age,
        badges,
        trainer_level,
      } = request.body;

      const updateTrainer =
        new UpdateTrainerService();

      const trainer =
        await updateTrainer.execute({
          id,
          name,
          city_origin,
          age,
          badges,
          trainer_level,
        });

      return response.json(trainer);

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

      const deleteTrainer =
        new DeleteTrainerService();

      await deleteTrainer.execute({
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