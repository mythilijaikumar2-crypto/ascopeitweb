import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../constants/statusCodes';
import { logger } from '../config/logger';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof AppError ? err.statusCode : HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || 'An unexpected error occurred';

  // Log error via Winston
  logger.error(`[Error] Code: ${statusCode} | Path: ${req.path} | Message: ${message}`, {
    stack: err.stack,
    body: req.body,
    query: req.query
  });

  // Never expose raw stack traces in production environment
  const responsePayload = {
    success: false,
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  };

  return res.status(statusCode).json(responsePayload);
};
