import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
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
  err: Error | AppError | multer.MulterError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle Multer-specific errors (file size, unexpected field, etc.)
  if (err instanceof multer.MulterError) {
    const message =
      err.code === 'LIMIT_FILE_SIZE'
        ? 'Resume size should not exceed 2 MB.'
        : `Upload error: ${err.message}`;

    logger.warn(`[Multer] Code: ${err.code} | Path: ${req.path} | ${message}`);

    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message
    });
  }

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
