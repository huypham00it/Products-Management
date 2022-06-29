import express from 'express';

import { getAllProducts, createProduct, updateProduct, deleteProduct, showStatus } from '../controllers/products.js';

const router = express.Router();

router.get('/', getAllProducts);

router.post('/', createProduct);

router.patch('/:id', updateProduct);

router.delete('/:id', deleteProduct);

router.get('/status', showStatus);

export default router;