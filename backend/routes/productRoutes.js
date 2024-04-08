import { Router } from 'express';
import upload from './upload.js';
import { getProducts, addProducts } from '../controllers/productController.js';
import isAuthenticated from '../middleware/middleware.js';

const productRoutes = Router();

productRoutes.get('/', isAuthenticated, getProducts);
productRoutes.post('/', isAuthenticated, upload.single("file"), addProducts);

export default productRoutes;