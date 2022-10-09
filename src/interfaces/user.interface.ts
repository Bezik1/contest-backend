import { Comment } from "./comment.interface";

export class UserInterface {
    username: string;
    email: string;
    password: string;
    comments?: Comment[];
}