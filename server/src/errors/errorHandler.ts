import type { Response, Request, NextFunction, ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {

    const statusCode = err.statusCode || 500;
    const code = err.code || "INTERNAL_SERVER_ERROR";

    // Reponse selon l'environnement
    if(process.env.NODE_ENV === "development") {
        res.status(statusCode).json({
            "success": false,
            code,
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
                "message": err.isOperational ? err.message : 'Une erreur interne est survenue.'
            }
        })
    }
}