import express from 'express';
import { testimonialsControllers } from '../controllers/testimonials.controllers.js';

const router = express.Router()

router.post('/:id_project/testimonials', testimonialsControllers.createTestimonial)
router.get('/:id_project/testimonials', testimonialsControllers.getAllTestimonialsOfProject)
router.patch('/:id_project/testimonials/:id_testimonial', testimonialsControllers.updateTestimonial)
router.delete('/:id_project/testimonials/:id_testimonial', testimonialsControllers.deleteTestimonial)

export { router }