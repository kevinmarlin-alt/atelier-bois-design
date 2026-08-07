import type { Project } from "../../generated/prisma/client.js"
import { prisma } from "../../lib/prisma.js"

export const projectRepositories = {
    async findAll() {
        return await prisma.project.findMany()
    },

    async findOneById(id: number) {
        return await prisma.project.findUnique({
            where: { id: id }
        })
    },

    async findOneBySlug(slug: string) {
        return await prisma.project.findUnique({
            where: { slug: slug }
        })
    },

    async findAllByCategory(idCategory: number) {
        return await prisma.project.findMany({
            include: { },
            where: { }
        })
    },

    async createProject(data: any) {
        return await prisma.project.create({
            data: {
                title: data.title,
                description: data.description,
                slug: data.slug,
                categoryId: data.categoryId,
                status: data.status
            }
        })
    },

    async updateProject(id: number, data: any) {
        return await prisma.project.update({
            where: { id: id },
            data: {
                title: data.title,
                description: data.description,
                slug: data.slug,
                categoryId: data.categoryId,
                status: data.status
            }        
        })
    },

    async deleteOne(id: number) {
        return await prisma.project.delete({
            where: { id: id}
        })
    },

    async findAllSlug() {
        return await prisma.project.findMany({
            select: { slug: true }
        })
    }
}