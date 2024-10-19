import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'yup';
import { errorResponse } from '../config/utils/responseHandler';

export const validate =
  (schema: AnySchema) =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        await schema.validate({
          ...req.body,
          file: req.file,
        }, { abortEarly: false });
        // If validation is successful, proceed to the next middleware or controller
        next();
      } catch (err: any) {
        // If validation fails, send an error response
        errorResponse(res, 'Validation failed', 400);

      }
    };
