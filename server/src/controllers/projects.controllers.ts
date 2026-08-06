import type { Request, Response, NextFunction } from "express";
import { projectServices } from "../services/projects.services.js";
import { apiJsonResponse } from "../utils/ApiJsonResponse.js";
import { handleRouteError } from "../utils/handleRouteError.js";

export const projectsControllers = {
    async getAllProjets(req: Request, res: Response, next: NextFunction) {
        try {
            const projects = await projectServices.getAll();

            const message = "Tous les projets on bien été retournés."
            res.status(200).json(apiJsonResponse.success( message, projects ))
        } catch (error: unknown) {
            const message = "Une erreur est survenue lors de la récupération de l'ensemble des projets."
            handleRouteError(next, message, error)
        }
    }
}