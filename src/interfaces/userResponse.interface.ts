import { User } from "src/schemas/user.schema";

export interface Response<T> {
    status: string;
    message: string
    data?: T | T[]
}