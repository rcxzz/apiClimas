import { Router } from 'express';
import citiesRouter from './cities.routes';
import forecastsRouter from './forecasts.routes';

const routes = Router();

routes.use('/cities', citiesRouter);
routes.use('/forecasts', forecastsRouter);

export default routes;