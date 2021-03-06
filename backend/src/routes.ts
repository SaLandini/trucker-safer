import express from 'express'

import ProblemsController from './controllers/ProblemsControllers'
import ItemsController from './controllers/ItemsControllers'
import AuthController from './controllers/AuthControllers' 

const routes = express.Router()
const problemsController = new ProblemsController()
const itemsController = new ItemsController()
const authController = new AuthController()

routes.get('/items', itemsController.index)

routes.post('/problems', problemsController.create)
routes.get('/problems', problemsController.index)
routes.get('/problems/:id', problemsController.show)



export default routes