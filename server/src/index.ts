import dotenvx from "@dotenvx/dotenvx";
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { urlencoded } from "express";
import express from 'express';
import type { Request, Response, NextFunction } from 'express'

import { router as apiRouter } from './routes/api.routes.js'
import { errorHandler } from "./errors/errorHandler.js";
import { AppError } from "./errors/AppError.js";

dotenvx.config()

const app = express();

if(process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

app
  .use(urlencoded({ extended: true }))
  .use(express.json())
  .use(cors())
  .use(helmet())
  .use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json("Welcome to the API of website Atelier Bois & Design")
})

app.use('/api', apiRouter);

// 404 Error
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError(
    `Impossible de trouver ${req.originalUrl}, ressayez avec une nouvelle URL.`,
    404, 
    "NOT_FOUND_ERROR"
  ))
})

// logErrors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  next(err);
})


//app.use(errorHandler);
app.use(errorHandler)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  process.stdout.write(`\nExample app listening on http://localhost:${PORT}\n`);
});