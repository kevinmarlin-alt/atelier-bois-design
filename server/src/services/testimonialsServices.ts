import { TestimonialEntity } from "../entities/TestimonialEntity.js";
import { ValidationError } from "../errors/ValidationError.js";
import { testimonialsRepositories } from "../repositories/testimonials.repositories.js"

export const testimonialsServices = {

    async createOneTestimonial(data: any) {
        if(!data.projectId) throw new ValidationError('Le champ "projectId" est obligatoire.')
        
        const testimonial = new TestimonialEntity(data);
        console.log(testimonial)

        return await testimonialsRepositories.addOne(testimonial);
    },

    async getAllTestimonialsByProject(projectId: number) {
        return await testimonialsRepositories.findAllByProject(projectId);
    },

    async updateOneTestimonial(id: number, data: any) {
        if(!data.projectId) throw new ValidationError('Le champ "projectId" est obligatoire.')
        
        const testimonial = new TestimonialEntity(data);
        return await testimonialsRepositories.updateOne(id, testimonial);
    },

    async deleteOneTestimonial(id: number) {
        return await testimonialsRepositories.deleteOne(id);
    }
}