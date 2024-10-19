import { ENV } from "../../config";
import prisma from "../../config/database";
import * as bcrypt from 'bcrypt';
import { UserResponse } from "./user";
import { generateToken } from "../../config/utils/jwt";

export class UserService {
    // Find all users
    static async findAll(): Promise<UserResponse[]> {
        const user = await prisma.user.findMany({ });
        return user as UserResponse[];
    }

    // Find a user by ID
    static async findById(userId: number): Promise<UserResponse | null> {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        return user as UserResponse;
    }

    // Find a user by email or other criteria
    static async findOne(criteria: { email?: string }): Promise<UserResponse | null> {
        const user = await prisma.user.findUnique({
            where: { email: criteria.email || '' },
        });
        return user as UserResponse;
    }

    // Create a new user with hashed password
    static async createUser(data: { email: string, name: string, password: string }): Promise<UserResponse> {
        const hashedPassword = await this.hashPassword(data.password);

        const user = await prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: hashedPassword,
            },
        });

        return user as UserResponse;
    }

    // Update user details
    static async updateUser(userId: number, data: { email?: string, name?: string, password?: string }): Promise<UserResponse | null> {
        const updateData: any = {};

        if (data.email) updateData.email = data.email;
        if (data.name) updateData.name = data.name;
        if (data.password) updateData.password = await this.hashPassword(data.password);

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
        });

        return updatedUser as UserResponse;
    }

    // Delete a user by ID
    static async deleteUser(userId: number): Promise<UserResponse | null> {
        const deletedUser = await prisma.user.delete({
            where: { id: userId },
        });
        return deletedUser as UserResponse; 
    }


      // Authenticate a user and generate a JWT
  static async loginUser(email: string, password: string): Promise<{ user: UserResponse; token: string }> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await this.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT
    const token = generateToken({ id: user.id, email: user.email });

    return { user: user as UserResponse, token };
  }

    // Hash the password
    static async hashPassword(password: string): Promise<string> {
        const salt = Number(ENV.SALT_ROUNDS) || 10;
        
        return await bcrypt.hash(password, salt);
    }

    // Compare password when login
    static async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}
