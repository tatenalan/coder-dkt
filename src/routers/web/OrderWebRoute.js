import express from 'express'
import OrderWebController from '../../controllers/web/OrderWebController.js';

const orderWebRoute = express.Router();

orderWebRoute.get('/', OrderWebController.getAll);

export { orderWebRoute };