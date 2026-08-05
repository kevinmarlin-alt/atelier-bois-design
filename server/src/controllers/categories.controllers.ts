import type { Request, Response } from 'express'
import { categoriesService } from '../services/categories.services.js';

export const categoriesController = {

    async getAllCategories(req: Request, res: Response) {
        try {
            const allCategories = await categoriesService.getAllCategories();
            
            const message = "La liste des catégories à bien été retournée."
            return res.status(200).json({ message, data: allCategories })

        } catch (error: unknown) {
            const message = "La liste des catégories n'a pas pu être récupérée. Réessayez dans quelques instants."
            res.status(500).json({ message, data: error})
        }
    },

    async getOneCategory(req: Request, res: Response) {

        if(req.params.id === undefined) {
            const message = `Veuillez indiquer un numéro d'ID dans l'URL de la requête.`
            return res.status(400).json({ message })
        }

        const idCategory = Number.parseInt(req.params.id);

        console.log(idCategory)
        
        try {
            const category = await categoriesService.getOneCategory(idCategory)

            if(!category) {
                const message = `La catégorie avec l'ID n°${idCategory} n'existe pas. Réessayez avec un ID différent.`;
                return res.status(404).json({ success: false, message })
            }
    
            const message = `La catégorie ${category?.name} à bien été retournée.`
            return res.status(200).json({ message, data: category })
            
        } catch (error: unknown) {
            const message = `La catégorie avec l'ID n°${idCategory} n'a pas pu être récupérée. Réessayez dans quelques instants.`
            res.status(500).json({ message, data: error})
        }
    },

    async addCategory(req: Request, res: Response) {
        const name = req.body.name;
        console.log(name)

        try {
            const categoryExist = await categoriesService.getOneCategory(name)

            if(categoryExist !== null) {
                const message = `La catégorie " ${name} " existe déjà. Réessayez avec un nom différent.`;
                return res.status(400).json({ message })
            }

            const category = await categoriesService.addCategory(name)

            const message = `La catégorie ${category.name} à bien été ajoutée.`
            return res.status(201).json({ message, data: category })
            
        } catch (error: unknown) {
            const message = `Une erreur est survenue lors de l'ajout de la catégorie " ${name} ". Réessayez dans quelques instants.`
            res.status(500).json({ message, data: error})
        }
    },

    async updateCategory(req: Request, res: Response) {

        if(req.headers['content-type'] !== "application/x-www-form-urlencoded") {
            const message = `Le content-type de la requête doit être au format " application/x-www-form-urlencoded " ou alors la body est vide.`
            return res.status(400).json({ message })
        }

        const name: string = req.body.name;

        if(req.params.id === undefined) {
            const message = `Veuillez indiquer un numéro d'ID dans l'URL de la requête.`
            return res.status(400).json({ message })
        }
        const idCategory = Number.parseInt(req.params.id);

        try {
            const categoryUpdated = await categoriesService.updateCategory(idCategory, name)

            const message = `La catégorie avec l'ID n° ${idCategory} à bien été mise à jour en "${categoryUpdated.name}".`;
            res.status(200).json({ message })
            
        } catch (error: unknown) {
            const message = `Une erreur est survenue lors de la mise à jour de la catégorie avec l'ID n° ${idCategory}. Réessayez dans quelques instants.`
            res.status(500).json({ message, data: error})
        }

    },

    async deleteCategory(req: Request, res: Response) {

        if(req.params.id === undefined) {
            const message = `Veuillez indiquer un numéro d'ID dans l'URL de la requête.`
            return res.status(400).json({ message })
        }

        const idCategory = Number.parseInt(req.params.id);

        try {
            const categoryToBeDeleted = await categoriesService.getOneCategory(idCategory)

            if(categoryToBeDeleted === null) {
                const message = `La catégorie avec l'ID n° ${idCategory} n'existe pas. Réessayez avec un ID différent.`;
                return res.status(400).json({ message })
            };

            const categoryDeleted = await categoriesService.deleteCategory(categoryToBeDeleted.id);

            const message = `La catégorie " ${categoryDeleted.name} ", à bien été supprimée.` 
            res.status(200).json({ message })
            
        } catch (error: unknown) {
            const message = `Une erreur est survenue lors de la suppression de la catégorie avec l'ID n° ${idCategory}. Réessayez dans quelques instants.`
            res.status(500).json({ message, data: error})
        }
    }
}