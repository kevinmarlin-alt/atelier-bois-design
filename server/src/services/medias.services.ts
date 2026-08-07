import { mediasRepositories } from "../repositories/medias.repositories.js"


export const mediasServices = {
    async getMediaById(id: number) {
        return await mediasRepositories.findOneById(id);
    },

    async getMediasOfProject(projectId: number) {
        return await mediasRepositories.findAllByIdProject(projectId);
    },

    async createOneMedia(id: number, data: any) {

        const media = {
            title: data.title.trim(),
            description: data.description.trim(),
            alt: data.alt.trim(),
            filename: data.filename.trim(),
            height: Number.parseInt(data.height),
            width: Number.parseInt(data.width),
            slug: data.slug.trim(),
            projectId: id
        }

        return await mediasRepositories.addOne(media)
    },

    async updateOneMedia(idMedia: number, data: any) {

        const media = {
            title: data.title.trim(),
            description: data.description.trim(),
            alt: data.alt.trim(),
            filename: data.filename.trim(),
            height: typeof(data.height) === "string" ? Number.parseInt(data.height.trim()) : data.height,
            width: typeof(data.width) === "string" ? Number.parseInt(data.width.trim()) : data.width,
            slug: data.slug.trim(),
            projectId: typeof(data.projectId) === "string" ? Number.parseInt(data.projectId.trim()) : data.projectId
        }

        return await mediasRepositories.updateOne(idMedia, media)
    },

    async deleteOneMedia(idMedia: number) {
        return await mediasRepositories.deleteOne(idMedia);
    }
}   