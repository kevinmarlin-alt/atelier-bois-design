import { prisma } from "../../lib/prisma.js"

export const mediasRepositories = {

    async addOne(data: any) {
        return await prisma.media.create({
            data: {
                title: data.title,
                description: data.description,
                alt: data.alt,
                filename: data.filename,
                height: data.height,
                width: data.width,
                slug: data.slug,
                projectId: data.projectId
            }
        })
    },

    async findAllByIdProject(projectId: number) {
        return await prisma.media.findMany({
            where: { projectId: projectId }
        })
    },

    async findOneById(id: number) {
        return await prisma.media.findUnique({
            where: { id: id }
        })
    },

    async updateOne(idMedia: number, data: any) {
        return await prisma.media.update({
            where: { id: idMedia },
            data: {
                title: data.title,
                description: data.description,
                alt: data.alt,
                filename: data.filename,
                height: data.height,
                width: data.width,
                slug: data.slug,
                projectId: data.projectId
            }
        })
    },

    async deleteOne(idMedia: number) {
        return await prisma.media.delete({
            where: { id: idMedia }
        })
    }
}