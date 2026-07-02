import { Router } from 'express';
import {
  celebrate,
  Joi,
  Segments,
} from 'celebrate';

import TrainersController from '@modules/trainers/controllers/TrainerController';

const trainersRouter = Router();

const trainersController =
  new TrainersController();

trainersRouter.get(
  '/',
  async (req, res, next) => {
    try {
      await trainersController.index(
        req,
        res,
        next,
      );
    } catch (err) {
      next(err);
    }
  },
);

trainersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string()
        .uuid()
        .required(),
    },
  }),
  async (req, res, next) => {
    try {
      await trainersController.show(
        req,
        res,
        next,
      );
    } catch (err) {
      next(err);
    }
  },
);

trainersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      city_origin: Joi.string().required(),
      age: Joi.number().required(),
      badges: Joi.number().required(),
      trainer_level: Joi.number().required(),
    },
  }),
  async (req, res, next) => {
    try {
      await trainersController.create(
        req,
        res,
        next,
      );
    } catch (err) {
      next(err);
    }
  },
);

trainersRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string()
        .uuid()
        .required(),
    },

    [Segments.BODY]: {
      name: Joi.string().required(),
      city_origin: Joi.string().required(),
      age: Joi.number().required(),
      badges: Joi.number().required(),
      trainer_level: Joi.number().required(),
    },
  }),
  async (req, res, next) => {
    try {
      await trainersController.update(
        req,
        res,
        next,
      );
    } catch (err) {
      next(err);
    }
  },
);

trainersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string()
        .uuid()
        .required(),
    },
  }),
  async (req, res, next) => {
    try {
      await trainersController.delete(
        req,
        res,
        next,
      );
    } catch (err) {
      next(err);
    }
  },
);

export default trainersRouter;