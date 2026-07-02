import { Request, Response, NextFunction } from 'express';

import CreatePokemonService from '../services/CreatePokemonService';
import DeletePokemonService from '../services/DeletePokemonService';
import ListPokemonService from '../services/ListPokemonService';
import ShowPokemonService from '../services/ShowPokemonService';
import UpdatePokemonService from '../services/UpdatePokemonService';

export default class PokemonsController {

  public async index(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {

      const listPokemons =
        new ListPokemonService();

      const pokemons =
        await listPokemons.execute();

      return response.json(pokemons);

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

      const showPokemon =
        new ShowPokemonService();

      const pokemon =
        await showPokemon.execute({
          id,
        });

      return response.json(pokemon);

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
        type,
        level,
        hp,
        rarity,
        trainer_id,
      } = request.body;

      const createPokemon =
        new CreatePokemonService();

      const pokemon =
        await createPokemon.execute({
          name,
          type,
          level,
          hp,
          rarity,
          trainer_id,
        });

      return response
        .status(201)
        .json(pokemon);

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
        type,
        level,
        hp,
        rarity,
      } = request.body;

      const updatePokemon =
        new UpdatePokemonService();

      const pokemon =
        await updatePokemon.execute({
          id,
          name,
          type,
          level,
          hp,
          rarity,
        });

      return response.json(pokemon);

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

      const deletePokemon =
        new DeletePokemonService();

      await deletePokemon.execute({
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