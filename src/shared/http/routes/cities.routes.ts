import { Router } from 'express';
import CitiesController from '@modules/cities/controllers/CitiesController';

const citiesRouter = Router();
const citiesController = new CitiesController();

citiesRouter.get('/', citiesController.index);
citiesRouter.get('/:id', citiesController.show);
citiesRouter.post('/', citiesController.create);
citiesRouter.put('/:id', citiesController.update);
citiesRouter.delete('/:id', citiesController.delete);

export default citiesRouter;