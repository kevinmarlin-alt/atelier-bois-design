import type { Response, Request, NextFunction } from 'express';
import type { AppError } from './AppError.js';

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {

    err.statusCode = err.statusCode || 500;
    err.code = err.code || "INTERNAL_SERVER_ERROR";

    // Reponse selon l'environnement
    if(process.env.NODE_ENV === "development") {
        res.status(err.statusCode).json({
            "success": false,
            "error": {
                "message": err.message,
                "stack": err.stack,
                "details": err
            }
        })
    } else {
        // Mode production : masquer les détails techniques
        res.status(err.statusCode).json({
            "success": false,
            "error": {
                "code": err.code,
                "message": err.message,
            }
        })
    }
}