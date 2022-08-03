import { AxiosResponse } from "axios";
import api from "../http";
import { IAuthResponse } from "../models/response/IAuthResponse";

export default class UserService {
    static async getUserByEmail(email: string): Promise<AxiosResponse<IAuthResponse>> {
        return api.get<IAuthResponse>('/user/' + email)
    }
    static async changeTheme(email: string, theme: string): Promise<AxiosResponse<IAuthResponse>> {
        return api.put<IAuthResponse>('/theme', {email, theme})
    }
}
