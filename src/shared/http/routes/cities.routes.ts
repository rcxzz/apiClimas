import { Router } from 'express';
import CitiesController from '@modules/cities/controllers/CitiesController';
import isAuthenticated from '@shared/middlewares/isAuthenticated';

const citiesRouter = Router();
const citiesController = new CitiesController();

// Se quiser que a listagem seja pública, deixa sem o middleware:
citiesRouter.get('/', citiesController.index);

// Todas as rotas abaixo desta linha vão exigir o Token no Insomnia!
citiesRouter.use(isAuthenticated);

citiesRouter.get('/:id', citiesController.show);
citiesRouter.post('/', citiesController.create);
citiesRouter.put('/:id', citiesController.update);
citiesRouter.delete('/:id', citiesController.delete);

export default citiesRouter;