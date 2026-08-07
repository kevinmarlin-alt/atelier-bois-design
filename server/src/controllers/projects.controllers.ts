import type { Request, Response, NextFunction } from "express";
import { projectServices } from "../services/projects.services.js";
import { apiJsonResponse } from "../utils/ApiJsonResponse.js";
import { handleRouteError } from "../utils/handleRouteError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { ValidationError } from "../errors/ValidationError.js";
import { BadRequestError } from "../errors/BadRequestError.js";

export const projectsControllers = {
    async getAllProjets(req: Request, res: Response, next: NextFunction) {
        try {
            const projects = await projectServices.getAll();

            const message = "Tous les projets on bien été retournés."
            res.status(200).json(apiJsonResponse.success( message, projects ))
        } catch (error: unknown) {
            handleRouteError(
                next, 
                "Une erreur est survenue lors de la récupération de l'ensemble des projets.", 
                error
            )
        }
    },

    async getProjetById(req: Request, res: Response, next: NextFunction) {
        try {
            const idProject = Number.parseInt(req.params.id);
            
            if(!idProject) {
                throw new NotFoundError(`La projet avec l'ID n°${idProject} n'existe pas. Réessayez avec un autre ID de projet.`);
            }

            const projects = await projectServices.getProjetById(idProject);

            const message = `Le projet avec l'ID n°${idProject} a bien été retourné.`
            res.status(200).json(apiJsonResponse.success( message, projects ))

        } catch (error: unknown) {
            handleRouteError(
                next, 
                "Une erreur est survenue lors de la récupération du projet.", 
                error)
        }
    },

    async addProject(req: Request, res: Response, next: NextFunction) {
        try {

            if(!req.body.slug) {
                throw new ValidationError('Le champ "slug" est obligatoire.')
            }

            const projectExist = await projectServices.getProjectBySlug(req.body.slug);

            if(projectExist) {
                throw new ValidationError(`La référence du projet (slug) existe déjà. Veuillez renseigner une autre référence de projet.`)
            }

            const project = await projectServices.addProject(req.body);

            const message = `Le projet ${project.slug} a bien été créé.`
            res.status(200).json(apiJsonResponse.success( message, project ))

        } catch (error: unknown) {
            handleRouteError(
                next, 
                "Une erreur est survenue lors de la création du projet.", 
                error)
        }
    },
    
    async updateProject(req: Request, res: Response, next: NextFunction) {
        if(isNaN(req.params.id)) {
            throw new BadRequestError("Veuillez renseigner un numéro d'ID dans les paramêtres de l'URL.")
        }
        const idProject = Number.parseInt(req.params.id);

        try {

            const projectExist = await projectServices.getProjetById(idProject)

            if(!projectExist) {
                throw new ValidationError(`Le projet avec l'ID n°${idProject} n'existe pas. Veuillez renseigner un autre ID de projet.`)
            }
            
            const project = await projectServices.updateProject(idProject, req.body);

            const message = `Le projet ${project.slug} a bien été mis à jour.`
            res.status(200).json(apiJsonResponse.success( message, project ))

        } catch (error: unknown) {
            handleRouteError(
                next, 
                "Une erreur est survenue lors de la mise à jour du projet.", 
                error)
        }
    },

    async deleteProject(req: Request, res: Response, next: NextFunction) {
        if(isNaN(req.params.id)) {
            throw new BadRequestError("Veuillez renseigner un numéro d'ID dans les paramêtres de l'URL.")
        }   
        
        const idProject = Number.parseInt(req.params.id);
        
        try {
            const projectDeleted = await projectServices.deleteProject(idProject);

            const message = `Le projet ${projectDeleted.slug} avec l'ID n°${projectDeleted.id} a bien été supprimé.`
            res.status(200).json(apiJsonResponse.success( message, projectDeleted ))
            
        } catch (error: unknown) {
            handleRouteError(
                next,
                "Une erreur est survenue lors de la suppression du projet.",
                error
            )
        }
    }
}