
import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import { HttpError, NotFoundError } from '../../config/utils/httpErrors';
import logger from '../../config/logger';
import { omit } from 'lodash';
import { errorResponse, successResponse } from '../../config/utils/responseHandler';
import { User } from './user.entity';

export class UserControler {

    // user register || sign up 
    static async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const { email, name, password } = req.body;
            const signedUser = await UserService.findOne({ email });

            if (signedUser) throw new HttpError(400, "This email is already used");

            const newUser = await UserService.createUser({ email, name, password });
            logger.info(`Created new user with email: ${email}`);
            // Omit the password from the user object before sending the response
            const userResponse = omit(newUser, ['password']);

            // Use the success response handler
            successResponse(res, { user: userResponse }, 200);
        } catch (error: any) {
            logger.error('Unable to create user', error);
            // Use the error response handler
           next();
        }
    }

    static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;
            const { user, token } = await UserService.loginUser(email, password);

            // Omit the password from the user object
            const userResponse = omit(user, ['password']);

            // Use the success response handler
            successResponse(res, { user: userResponse, token }, 200);
        } catch (error: any) {
            next();
        }
    }

    // get all users
    static async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Access authenticated user information
            const authenticatedUser = req.user;
            const users = await UserService.findAll();
            if (!users.length) {
                throw new NotFoundError('No users found');
            }
            // Use the success response handler
            successResponse(res, { users }, 200);
        } catch (error: any) {
            next();
        }
    }
    // get all users
    static async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Access authenticated user information
            const authenticatedUser = req.user as User;
            const user = await UserService.findOne({ email: authenticatedUser.email });
            if (!user) {
                throw new NotFoundError('No user found');
            }
            const userResponse = omit(user, ['password']);
            // Use the success response handler
            successResponse(res, { user: userResponse }, 200);
        } catch (error:any) {
            next();
        }
    }

}