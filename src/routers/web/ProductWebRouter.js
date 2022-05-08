import express from 'express'
import { adminMiddleware } from "../../middleware/AdminMiddleware.js"
import ProductController from '../../controllers/web/ProductController.js';

const productWebRouter = express.Router();

productWebRouter.get('/', ProductController.getAll);

productWebRouter.get('/:category', ProductController.getByCategory);

productWebRouter.post('/:id', ProductController.deleteById);

productWebRouter.get('/update/:id', ProductController.getUpdate);

export { productWebRouter };