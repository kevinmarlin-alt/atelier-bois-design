import express from 'express';
import { router as categoriesRoutes } from './categories.routes.js'

const router = express.Router();

router.use('/categories', categoriesRoutes)

export { router };