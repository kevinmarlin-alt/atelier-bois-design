import { projectRepositories } from "../repositories/projects.repositories.js"

export const projectServices = {
    async getAll() {
        return await projectRepositories.findAll();
    },

    async getOneProject(id: number) {
        return await projectRepositories.findOneById(id)
    },

    async getAllProjectsByCategory(idCategory: number) {
        return await projectRepositories.findAllByCategory(idCategory);
    }
}