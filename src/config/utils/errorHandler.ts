import { Request, Response, NextFunction } from 'express';

interface ErrorResponse {
    statusCode: number;
  message: string;
//   status: "Success" | "Failed";
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const statusCode = err.status || 500;
  const message = err.message || 'An unexpected error occurred';

  const errorResponse: ErrorResponse = {
    statusCode,
    message,
  }; 
  if (res.headersSent) {
    return next(err);
  }
  res.status(statusCode).json(errorResponse);
}
