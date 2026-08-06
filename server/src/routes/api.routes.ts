import express from 'express';
import { router as categoriesRoutes } from './categories.routes.js'
import { router as projectsRoutes } from './projects.routes.js';

const router = express.Router();

router.use('/categories', categoriesRoutes)
router.use('/projects', projectsRoutes)

export { router };