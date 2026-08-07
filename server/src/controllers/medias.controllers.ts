import type { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/BadRequestError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { mediasServices } from "../services/medias.services.js";
import { projectServices } from "../services/projects.services.js";
import { apiJsonResponse } from "../utils/ApiJsonResponse.js";
import { handleRouteError } from "../utils/handleRouteError.js";

export const mediasControllers = {
    async getMediasById(req: Request, res: Response, next: NextFunction) {

        if(isNaN(req.params.id_media)) throw new BadRequestError("Veuillez renseigner un numéro d'identifiant du média dans les paramêtre de l'URL.");

        const idMedia = Number.parseInt(req.params.id_media);

        try {
            const media = await mediasServices.getMediaById(idMedia);
        } catch (error: unknown) {
            handleRouteError(
                next,
                "Une erreur est survenue lors de la récupération du media. Veuillez réessayer dans quelques instants.",
                error
            )
        }
    },

    async getAllMediasOfProject(req: Request, res: Response, next: NextFunction) {

        if(isNaN(req.params.id_project)) throw new BadRequestError("Veuillez renseigner un numéro d'identifiant du projet dans les paramêtre de l'URL.")
        
        const projectId = Number.parseInt(req.params.id_project);

        try {
            const medias = await mediasServices.getMediasOfProject(projectId);
            
            const message = `Les medias du projet avec l'ID n°${projectId} ont bien été retournés.`;
            res.status(200).json(apiJsonResponse.success( message, medias ));

        } catch (error: unknown) {
            handleRouteError(
                next,
                `Une erreur est survenue lors de la récupération des medias lié au projet avec l'ID n°${projectId}. Veuillez réessayer dans quelques instants.`,
                error
            )
        }

    },

    async createOneMedia(req: Request, res: Response, next: NextFunction) {

        if(isNaN(req.params.id_project)) throw new BadRequestError("Veuillez renseigner un numéro d'identifiant du projet dans les paramêtre de l'URL.")
        
            const idProject = Number.parseInt(req.params.id_project);

        if(!req.body) {
            throw new BadRequestError('Le corps de la requête est vide. Veuillez renseigner des information a travers le corps de la requête.')
        }

        try {
            const media = await mediasServices.createOneMedia(idProject, req.body);

            const message = `Le media ${media.filename} à bien été ajouté.`;
            res.status(201).json(apiJsonResponse.success( message, media ));
            
        } catch (error: unknown) {
            handleRouteError(
                next,
                "Une erreur est survenue lors de l'ajout du media. Veuillez réessayer dans quelques instants.",
                error
            )
        }
    },

    async updateOneMedia(req: Request, res: Response, next: NextFunction) {

        if(isNaN(req.params.id_media)) {
            throw new BadRequestError("Veuillez renseigner un numéro d'identifiant du media dans les paramêtre de l'URL.")
        }

        const idMedia = Number.parseInt(req.params.id_media);

        if(!req.body) {
            throw new BadRequestError('Le corps de la requête est vide. Veuillez renseigner des information a travers le corps de la requête.')
        }

        try {
            const idProject = Number.parseInt(req.params.id_project);
            const project = await projectServices.getProjetById(idProject);

            if(!project) {
                throw new NotFoundError(`Le projet avec l'ID n°${idProject} n'existe pas. Réessayez avec un ID de projet différent.`)
            } 
            
            const media = await mediasServices.updateOneMedia(idMedia, req.body);

            const message = `Le media ${media.filename} à bien été modifié.`;
            res.status(200).json(apiJsonResponse.success( message, media ));
            
        } catch (error: unknown) {
            handleRouteError(
                next,
                "Une erreur est survenue lors de la mise à jour du media. Veuillez réessayer dans quelques instants.",
                error
            )
        }
    },

    async deleteOneMedia(req: Request, res: Response, next: NextFunction) {

        if(isNaN(req.params.id_media)) {
            throw new BadRequestError("Veuillez renseigner un numéro d'identifiant du media dans les paramêtre de l'URL.")
        }

        const idMedia = Number.parseInt(req.params.id_media);

        try {

            const media = await mediasServices.deleteOneMedia(idMedia);

            const message = `Le media ${media.filename} à bien été supprimé.`;
            res.status(200).json(apiJsonResponse.success( message, media ));
            
        } catch (error: unknown) {
            handleRouteError(
                next,
                "Une erreur est survenue lors de la suppression du media. Veuillez réessayer dans quelques instants.",
                error
            )
        }
    }

    
}