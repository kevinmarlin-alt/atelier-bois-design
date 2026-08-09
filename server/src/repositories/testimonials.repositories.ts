import { prisma } from "../../lib/prisma.js"
import { TestimonialEntity } from "../entities/TestimonialEntity.js"

export const testimonialsRepositories = {

    async addOne(data: any) {
        const testimonialPrisma =  await prisma.testimonial.create({
            data: {
                title: data.title,
                content: data.content,
                author: data.author,
                status: data.status,
                projectId: data.projectId
            }
        })

        return new TestimonialEntity(testimonialPrisma)
    },

    async findAllByProject(projectId: number) {
        const testimonialsPrisma = await prisma.testimonial.findMany({
            where: { projectId },
            orderBy: { createdAt: "desc" }
        })

        const testimonials: TestimonialEntity[] = []

        testimonialsPrisma.forEach(testimonial => {
            testimonials.push(new TestimonialEntity(testimonial))
        })
        return testimonials;
    },

    async updateOne(id: number, data: any) {
        const testimonialPrisma = await prisma.testimonial.update({
            where: { id },
            data: {
                title: data.title,
                content: data.content,
                author: data.author,
                status: data.status,
                projectId: data.projectId
            }
        });

        return new TestimonialEntity(testimonialPrisma);
    },

    async deleteOne(id: number) {
        const testimonialPrisma = await prisma.testimonial.delete({
            where: { id }
        });

        return new TestimonialEntity(testimonialPrisma);
    }


}