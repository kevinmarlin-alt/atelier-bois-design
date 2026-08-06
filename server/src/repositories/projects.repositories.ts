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

    async findAllByCategory(idCategory: number) {
        return await prisma.project.findMany({
            include: { },
            where: { }
        })
    }
}
