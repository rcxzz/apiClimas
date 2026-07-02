import { Router } from 'express';
import {
  celebrate,
  Joi,
  Segments,
} from 'celebrate';

import PokemonsController from '@modules/pokemons/controllers/PokemonsController';

const pokemonsRouter = Router();

const pokemonsController =
  new PokemonsController();

pokemonsRouter.get(
  '/',
  async (req, res, next) => {
    try {
      await pokemonsController.index(
        req,
        res,
        next,
      );
    } catch (err) {
      next(err);
    }
  },
);

pokemonsRouter.get(
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
      await pokemonsController.show(
        req,
        res,
        next,
      );
    } catch (err) {
      next(err);
    }
  },
);

pokemonsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      type: Joi.string().required(),
      level: Joi.number().required(),
      hp: Joi.number().required(),
      rarity: Joi.string().required(),
      trainer_id: Joi.string()
        .uuid()
        .required(),
    },
  }),
  async (req, res, next) => {
    try {
      await pokemonsController.create(
        req,
        res,
        next,
      );
    } catch (err) {
      next(err);
    }
  },
);

pokemonsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string()
        .uuid()
        .required(),
    },

    [Segments.BODY]: {
      name: Joi.string().required(),
      type: Joi.string().required(),
      level: Joi.number().required(),
      hp: Joi.number().required(),
      rarity: Joi.string().required(),
    },
  }),
  async (req, res, next) => {
    try {
      await pokemonsController.update(
        req,
        res,
        next,
      );
    } catch (err) {
      next(err);
    }
  },
);

pokemonsRouter.delete(
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
      await pokemonsController.delete(
        req,
        res,
        next,
      );
    } catch (err) {
      next(err);
    }
  },
);

export default pokemonsRouter;