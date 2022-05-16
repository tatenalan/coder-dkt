import express from 'express'
import { adminMiddleware } from "../../middleware/AdminMiddleware.js"
import ProductController from '../../controllers/web/ProductController.js';

const productWebRouter = express.Router();

productWebRouter.get('/', ProductController.getAll);

productWebRouter.get('/:id', ProductController.getProduct);

productWebRouter.get('/category/:category', ProductController.getByCategory);

productWebRouter.post('/:id', ProductController.deleteById);

productWebRouter.get('/update/:id', ProductController.edit);

productWebRouter.post('/update/:id', ProductController.update);

export { productWebRouter };