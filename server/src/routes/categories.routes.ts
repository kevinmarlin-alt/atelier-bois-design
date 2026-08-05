import express from 'express';
import { categoriesController } from '../controllers/categories.controllers.js';

const router = express.Router();

router.get('/', categoriesController.getAllCategories);
router.get('/:id', categoriesController.getOneCategory);
router.post('/', categoriesController.addCategory);
router.patch('/:id', categoriesController.updateCategory);
router.delete('/:id', categoriesController.deleteCategory);

export { router };