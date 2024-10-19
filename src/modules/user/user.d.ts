import { User } from "./user.entity";

export class UserResponse implements Omit<User, 'password'>  {
    id: number;
    uid: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
}