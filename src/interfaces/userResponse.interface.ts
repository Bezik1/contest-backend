import { User } from "src/schemas/user.schema";

export interface UserResponse {
    status: string;
    message: string
    data?: User | User[]
}