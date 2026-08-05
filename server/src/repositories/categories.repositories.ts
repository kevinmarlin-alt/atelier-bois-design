import { prisma } from "../../lib/prisma.js";

export const categoriesRepository = {
    async findAll() {
        return await prisma.category.findMany({
            //orderBy: { name: "asc" }
        })
    },

    async findById(id: number) {
        return await prisma.category.findUnique({
            where: { id: id }
        })
    },

    async findByName(name: string) {
        return await prisma.category.findUnique({
            where: { name: name }
        })
    },

    async createOne(name: string) {
        return await prisma.category.create({
            data: { name: name }
        })
    },

    async updateOne(id: number, name: string) {
        return await prisma.category.update({
            where: { id: id },
            data: { name: name }
        })
    },

    async deleteOne(id: number) {
        return await prisma.category.delete({
            where: { id: id }
        })
    }
}