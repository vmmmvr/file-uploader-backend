import prisma from "../../config/database";
import { File } from "./files.entity";

export class FileService { 

     // Create a new user with hashed password
     static async create(data: {name: string, url: string, tag?: string, type: string }): Promise<File> {
        const file = await prisma.file.create({ data});
        return file as File;
    }

     static async view(filename: string): Promise<File> {
        
        const file = await prisma.file.update({where: { name: filename  }, 
        data: {views: { increment: 1,  },
        }});
        return file as File;
    }
    
     static async findAll(): Promise<File[]> {
        
        const files = await prisma.file.findMany();
        return files as File[];
    }
}