import express from 'express'
import ProductController from '../../controllers/web/ProductController.js';

const productWebRouter = express.Router();

productWebRouter.get('/', ProductController.getAll);

productWebRouter.get('/:category', ProductController.getByCategory);

export { productWebRouter };