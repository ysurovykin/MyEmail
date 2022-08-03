import api from "../http";
import { AxiosResponse } from "axios";
import { IAuthResponse } from "../models/response/IAuthResponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return api.post<IAuthResponse>('/login', { email, password })
    }

    static async registration(email: string, password: string, name: string): Promise<AxiosResponse<IAuthResponse>> {
        return api.post<IAuthResponse>('/registration', { email, password, name })
    }

    static async logout(): Promise<void> {
        return api.post('/logout')
    }
}