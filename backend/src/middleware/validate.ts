import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { HTTP_STATUS } from '../constants/statusCodes';

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message
        }));

        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: 'Validation failed',
          errors: errorMessages
        });
        return;
      }
      next(error);
    }
  };
};
