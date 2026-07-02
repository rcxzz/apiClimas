import { Router } from 'express';

import trainersRouter from './trainers.routes';
import pokemonsRouter from './pokemon.routes';

const routes = Router();

routes.use(
  '/trainers',
  trainersRouter,
);

routes.use(
  '/pokemons',
  pokemonsRouter,
);

export default routes;