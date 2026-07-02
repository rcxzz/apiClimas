import { Router } from 'express';
import AuthController from '@shared/controllers/AuthController';
import citiesRouter from './cities.routes';
import forecastsRouter from './forecasts.routes';

const routes = Router();
const authController = new AuthController();

routes.post('/register', authController.register);
routes.post('/login', authController.login);

routes.use('/cities', citiesRouter);
routes.use('/forecasts', forecastsRouter);

export default routes;