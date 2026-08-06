import type { NextFunction, Request, Response } from 'express'
import { categoriesService } from '../services/categories.services.js';
import { AppError } from '../errors/AppError.js';
import { handleRouteError } from '../utils/handleRouteError.js'
import { BadRequestError } from '../errors/BadRequestError.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { apiJsonResponse } from '../utils/ApiJsonResponse.js';

export const categoriesController = {

    async getAllCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const allCategories = await categoriesService.getAllCategories();

            const message = "La liste des catégories à bien été retournée."
            res.status(200).json(apiJsonResponse.success( message, allCategories ))

        } catch (error: unknown) {
            const message = "La liste des catégories n'a pas pu être récupérée. Réessayez dans quelques instants."
            handleRouteError(next, message, error);
        }
    },

    async getOneCategory(req: Request, res: Response, next: NextFunction) {

        if(req.params.id === undefined) {
            const message = `Veuillez indiquer un numéro d'ID dans l'URL de la requête.`
            return res.status(400).json(apiJsonResponse.failure( message ))
        }

        const idCategory = Number.parseInt(req.params.id);

        console.log(idCategory)
        
        try {
            const category = await categoriesService.getOneCategory(idCategory)

            if(!category) {
                const message = `La catégorie avec l'ID n°${idCategory} n'existe pas. Réessayez avec un ID différent.`;
                throw new AppError(message, 404, "NOT_FOUND_ERROR")
            }
    
            const message = `La catégorie ${category?.name} à bien été retournée.`
            return res.status(200).json(apiJsonResponse.success( message, category ))
            
        } catch (error: unknown) {
            const message = `La catégorie avec l'ID n°${idCategory} n'a pas pu être récupérée. Réessayez dans quelques instants.`
            handleRouteError(next, message, error);
        }
    },

    async addCategory(req: Request, res: Response, next: NextFunction) {
        const name = req.body.name;

        try {
            const categoryExist = await categoriesService.getOneCategory(name)

            if(categoryExist !== null) {
                const message = `La catégorie " ${name} " existe déjà. Réessayez avec un nom différent.`;
                throw new BadRequestError(message);
            }

            const category = await categoriesService.addCategory(name)

            const message = `La catégorie ${category.name} à bien été ajoutée.`
            res.status(201).json(apiJsonResponse.success( message, category ))
            
        } catch (error: unknown) {
            const message = `Une erreur est survenue lors de l'ajout de la catégorie " ${name} ". Réessayez dans quelques instants.`;
            handleRouteError(next, message, error);
        }
    },

    async updateCategory(req: Request, res: Response, next: NextFunction) {

        try {
            if(req.headers['content-type'] !== "application/x-www-form-urlencoded") {
                const message = `Le content-type de la requête doit être au format " application/x-www-form-urlencoded " ou alors la body est vide.`;
                throw new BadRequestError(message);
            }

            const name: string = req.body.name;

            if(req.params.id === undefined) {
                const message = `Veuillez indiquer un numéro d'ID dans l'URL de la requête.`
                throw new BadRequestError(message);
            }
            const idCategory = Number.parseInt(req.params.id);

            if(!await categoriesService.getOneCategory(idCategory)) {
                const message = `La catégorie avec l'ID n°${idCategory} n'existe pas. Réessayez avec un numéro d'ID existant.`
                throw new NotFoundError(message);
            }

            const categoryUpdated = await categoriesService.updateCategory(idCategory, name)

            const message = `La catégorie avec l'ID n° ${idCategory} à bien été mise à jour en "${categoryUpdated.name}".`;
            res.status(200).json(apiJsonResponse.success( message, categoryUpdated ))
            
        } catch (error: unknown) {
            const message = `Une erreur est survenue lors de la mise à jour de la catégorie avec l'ID n° ${req.params.id}. Réessayez dans quelques instants.`
            handleRouteError(next, message, error);
        }

    },

    async deleteCategory(req: Request, res: Response, next: NextFunction) {

        try {
            if(req.params.id === undefined) {
                const message = `Veuillez indiquer un numéro d'ID dans l'URL de la requête.`
                throw new BadRequestError(message);
            }

            const idCategory = Number.parseInt(req.params.id);

            const categoryToBeDeleted = await categoriesService.getOneCategory(idCategory)

            if(categoryToBeDeleted === null) {
                const message = `La catégorie avec l'ID n° ${idCategory} n'existe pas. Réessayez avec un ID différent.`;
                throw new NotFoundError(message);
            };

            const categoryDeleted = await categoriesService.deleteCategory(categoryToBeDeleted.id);

            const message = `La catégorie " ${categoryDeleted.name} ", à bien été supprimée.` 
            res.status(200).json(apiJsonResponse.success( message, categoryDeleted ))
            
        } catch (error: unknown) {
            const message = `Une erreur est survenue lors de la suppression de la catégorie avec l'ID n° ${req.params.id}. Réessayez dans quelques instants.`
            handleRouteError(next, message, error);
        }
    }
}