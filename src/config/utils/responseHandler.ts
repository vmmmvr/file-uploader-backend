import { Response } from 'express';

interface ResponseData {
  data: any;
  status: 'Success' | 'Failed';
  statusCode: number;
}

export function successResponse(res: Response, data: any, statusCode: number = 200) {
  const response: ResponseData = {
    data,
    status: 'Success',
    statusCode
  };
   res.status(statusCode).json(response);
}

export function errorResponse(res: Response, message: string, statusCode: number = 400) {
  const response: ResponseData = {
    data: { message },
    status: 'Failed',
    statusCode
  };

  return res.status(statusCode).json(response);

}
