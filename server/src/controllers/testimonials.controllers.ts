import type { Request, Response, NextFunction } from "express"
import { handleRouteError } from "../utils/handleRouteError.js"
import { testimonialsServices } from "../services/testimonialsServices.js"
import { BadRequestError } from "../errors/BadRequestError.js"
import { apiJsonResponse } from "../utils/ApiJsonResponse.js"

export const testimonialsControllers = {

    async createTestimonial(req: Request, res: Response, next: NextFunction) {

        if(!req.body) throw new BadRequestError('Le corps de la requête est vide. Veuillez renseigner des information dans le corps de la requête HTTP.')
        const data = req.body;

        try {

            const testimonial = await testimonialsServices.createOneTestimonial(data)

            const message = `Le témoignage à bien été enregistré.`;
            res.status(201).json(apiJsonResponse.success( message, testimonial ));

        } catch (error) {
            handleRouteError(
                next,
                `Une erreur est survenue lors de la création du témoignage. Réessayez dans quelques instants.`,
                error
            )
        }
    },

    async getAllTestimonialsOfProject(req: Request, res: Response, next: NextFunction) {

        if(!req.params.id_project) throw new BadRequestError('Veuillez renseigner un ID de project dans l\'URL de la requête HTTP.')
        const projectId = Number.parseInt(req.params.id_project);

        try {

            const testimonials = await testimonialsServices.getAllTestimonialsByProject(projectId)

            if(!testimonials) {
                const message = `Il n'y a actuellement aucun témoignage enregistré.`;
                res.status(200).json(apiJsonResponse.success( message, testimonials ));
            }

            const message = `Les témoignages ont bien été récupérés.`;
            res.status(201).json(apiJsonResponse.success( message, testimonials ));

        } catch (error) {
            handleRouteError(
                next,
                `Une erreur est survenue lors de la récupération des témoignages. Réessayez dans quelques instants.`,
                error
            )
        }
    },

    async updateTestimonial(req: Request, res: Response, next: NextFunction) {

        if(!req.params.id_testimonial) throw new BadRequestError('Veuillez renseigner un ID de témoignage dans l\'URL de la requête HTTP.')
        const testimanialId = Number.parseInt(req.params.id_testimonial);

        if(!req.body) throw new BadRequestError('Le corps de la requête est vide. Veuillez renseigner des information dans le corps de la requête HTTP.')
        const data = req.body;

        try {

            const testimonial = await testimonialsServices.updateOneTestimonial(testimanialId, data)

            const message = `Le témoignage à bien été mis à jour.`;
            res.status(200).json(apiJsonResponse.success( message, testimonial ));

        } catch (error) {
            handleRouteError(
                next,
                `Une erreur est survenue lors de la mise à jour du témoignage. Réessayez dans quelques instants.`,
                error
            )
        }
    },

    async deleteTestimonial(req: Request, res: Response, next: NextFunction) {

        if(!req.params.id_testimonial) throw new BadRequestError('Veuillez renseigner un ID de témoignage dans l\'URL de la requête HTTP.')
        const testimanialId = Number.parseInt(req.params.id_testimonial);

        try {

            const testimonial = await testimonialsServices.deleteOneTestimonial(testimanialId)

            const message = `Le témoignage à bien été supprimé.`;
            res.status(200).json(apiJsonResponse.success( message, testimonial ));

        } catch (error) {
            handleRouteError(
                next,
                `Une erreur est survenue lors de la suppression du témoignage. Réessayez dans quelques instants.`,
                error
            )
        }
    }
}