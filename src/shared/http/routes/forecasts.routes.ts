import { Router } from 'express';
import ForecastsController from '@modules/forecasts/controllers/ForecastsController';

const forecastsRouter = Router();
const forecastsController = new ForecastsController();

forecastsRouter.get('/', forecastsController.index);
forecastsRouter.get('/:id', forecastsController.show);
forecastsRouter.post('/', forecastsController.create);
forecastsRouter.put('/:id', forecastsController.update);
forecastsRouter.delete('/:id', forecastsController.delete);

export default forecastsRouter;