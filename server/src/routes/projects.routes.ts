import express from 'express';
import { projectsControllers } from '../controllers/projects.controllers.js';
import { router as mediasRoutes } from './medias.routes.js';
import { router as testimonialsRouter } from './testimonials.routes.js';

const router = express.Router();

router.get('/', projectsControllers.getAllProjets);
router.get('/:id', projectsControllers.getProjetById);
router.post('/', projectsControllers.addProject);
router.patch('/:id', projectsControllers.updateProject);
router.delete('/:id', projectsControllers.deleteProject);

router.use('/', mediasRoutes);
router.use('/', testimonialsRouter);

export { router };