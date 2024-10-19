import { NotFoundError } from "../../config/utils/httpErrors";
import { errorResponse, successResponse } from "../../config/utils/responseHandler";
import { User } from "../user/user.entity";
import { FileService } from "./file.service";
import { NextFunction, Request, Response } from 'express';
import path from "path";
import fs from "fs";

export class FileControler {

    // get all users
    static async uploadFile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Access authenticated user information
            const authenticatedUser = req.user as User;
            // File information is stored in req.file
            const fileData = req.file;
            const {tag} = req.body;

            if (!fileData) {
                 res.status(400).json({ message: 'No file uploaded' });
            }
        
            let newFile;
            if (fileData) {
                const { filename, path, mimetype } = fileData; 
                newFile = await FileService.create({
                    name: filename,
                    url: path,
                    type: mimetype,
                    tag: tag || null
                });
            }
            successResponse(res, {
                newFile
            }, 200);
        } catch (error: any) {
            next()
        }
    }


    static async viewFile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const filename = req.params.filename;
            const filePath = path.join(__dirname, '../../../uploads', filename); // Construct file path

            // Check if the file exists
            if (!fs.existsSync(filePath)) {
                res.status(404).json({ message: 'File not found' });
            }
            await FileService.view(filename);
            // Send the file to the client
            res.sendFile(filePath);
        } catch (error: any) {
            next()
        }
    }
    static async getFile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const filename = req.params.filename;
            const filePath = path.join(__dirname, '../../../uploads', filename); // Construct file path
            // Check if the file exists
            if (!fs.existsSync(filePath)) {
                res.status(404).json({ message: 'File not found' });
            }
            // Send the file to the client
            res.sendFile(filePath);
        } catch (error: any) {
            next()
        }
    }
    static async getFiles(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
           
           const files =  await FileService.findAll();
          
           successResponse(res, {
            files
        }, 200);
        } catch (error: any) {
            next()
        }
    }

}