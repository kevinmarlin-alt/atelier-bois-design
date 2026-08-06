import express from 'express';
import { projectsControllers } from '../controllers/projects.controllers.js';

const router = express.Router();

router.get('/', projectsControllers.getAllProjets);

export { router };