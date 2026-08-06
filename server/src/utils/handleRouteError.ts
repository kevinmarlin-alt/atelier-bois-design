import { AppError } from "../errors/AppError.js";
import type { NextFunction } from "express";

export const handleRouteError = (next: NextFunction, message: string, error: unknown) => {
    if(error instanceof AppError) {
        return next(error);
    }

    console.error('Erreur technique masquée :', error);
    next(new AppError(message, 500, "INTERNAL_SERVER_ERROR"));
};