//import { getAllCategories } from '../controllers/categories.controllers.js';
// import { findAll, findOneByName, findById, createOne, updateOne, deleteOne } from '../repositories/categories.repositories.js'
import { categoriesRepository } from '../repositories/categories.repositories.js';

export const categoriesService = {

    async getAllCategories() {
        return categoriesRepository.findAll();
    },

    async getOneCategory(index: number|string) {
        switch (typeof(index)) {
            case "number":
                console.log("number")
                return categoriesRepository.findById(index);
                break;
                
            case "string":
                console.log("string")
                return categoriesRepository.findByName(index);
                break;
        }
    },

    async addCategory(name: string) {
        return categoriesRepository.createOne(name);
    },

    async updateCategory(id: number, name: string) {
        return categoriesRepository.updateOne(id, name)
    },

    async deleteCategory(id: number) {
        return categoriesRepository.deleteOne(id)
    }
};




// export async function updateOneCategory(paramsId: string, data: object) {
//     const name = data.name
//     const idCategory = Number.parseInt(paramsId)
//     const categoryExisting = await findById(idCategory)
//     if(categoryExisting) {
        
//     }
//     return await updateOne(idCategory, name)
// }

// export async function deleteCategory(idCategory:number) {
//     return await deleteOne(idCategory)
// }

// async function categoryExiste(name: string): Promise<boolean> {
//     if(! await findOneByName(name)) {
//         return false
//     }
//     return true
// }