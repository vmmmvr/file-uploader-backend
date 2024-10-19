import {  Response, NextFunction, Request } from 'express';
import { verifyToken } from '../config/utils/jwt';
import { errorResponse } from '../config/utils/responseHandler';

// Middleware to authenticate the user
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        errorResponse(res, 'Access denied. No token provided.',401);
    }

    const token = authHeader?.split(' ')[1]; // Extract token after 'Bearer '
    try {
        if (token) {
            const {id, email} = verifyToken(token);
            // Attach user information to the request object
            req.user = {id, email};
        }
        // Proceed to the next middleware or route handler
        next();
    } catch (error: any) {
        errorResponse(res, error['message'] ?? 'Invalid token', error['status'] ?? 401);
    }
}
