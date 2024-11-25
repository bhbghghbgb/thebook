import {User} from "../models/User.ts";

export interface AuthResponse {
    success: boolean;
    user?: User;
    token: string;
    message: string;
}