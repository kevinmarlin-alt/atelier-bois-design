import { projectRepositories } from "../repositories/projects.repositories.js"
import { ValidationError } from "../errors/ValidationError.js";

export const projectServices = {
    async getAll() {
        return await projectRepositories.findAll();
    },

    async getProjetById(id: number) {
        return await projectRepositories.findOneById(id)
    },

    async getProjectBySlug(slug: string) {
        return await projectRepositories.findOneBySlug(slug)
    },

    async getAllProjectsByCategory(idCategory: number) {
        return await projectRepositories.findAllByCategory(idCategory);
    },

    async addProject(data: any) {
        const dataValidate = await validationData(data); 
        return await projectRepositories.createProject(dataValidate);
    },

    async updateProject(id: number, data: any) {

        const dataValidate = await validationData(data); 
        console.log(dataValidate) 
        return await projectRepositories.updateProject(id, dataValidate);
    },

    async getSlugList() {
        return await projectRepositories.findAllSlug();
    },

    async deleteProject(id: number) {
        return await projectRepositories.deleteOne(id);
    }
}

async function validationData(data: any) {
    if(data.slug) {
        data.slug = data.slug.trim()
        const projectExist = await projectServices.getProjectBySlug(data.slug);
        console.log(projectExist)
        if(projectExist) throw new ValidationError('La référence du projet existe déjà. Veuillez réessayer avec une référence différente.');
    }

    if(data.status) {
        const dataStatusIsValid = data.status === "draft" || data.status === "published" ? true : false
        if(!dataStatusIsValid) throw new ValidationError('Le status du projet doit être "draft" ou "published".')
    }

    if(data.categoryId) data.categoryId = Number.parseInt(data.categoryId);

    return data;
}