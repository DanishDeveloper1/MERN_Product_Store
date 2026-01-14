import express from 'express';

import {createProduct, deleteProduct, getProducts, updateProduct} from '../controllers/product.controller.js';

const router = express.Router();

// create a product
router.post('/', createProduct)

//get all products
router.get('/', getProducts)

//update a product
router.put('/:id', updateProduct)

//delete a product
router.delete('/:id', deleteProduct)


export default router;

