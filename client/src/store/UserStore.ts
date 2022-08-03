import axios from "axios";
import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";

import { IAuthResponse } from "../models/response/IAuthResponse"
import { API_URL } from "../http";
import UserService from "../services/UserService";


export default class UserStore {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;
    isFreeEmail = false;
    themes = ['winter', 'summer', 'autumn', 'spring']
    colorTheme = ''
    
    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setIsFreeEmail(bool: boolean) {
        this.isFreeEmail = bool;
    }

    setColorTheme(theme: string) {
        this.colorTheme = theme;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('mode', 'inboxes');
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async registration(email: string, password: string, name: string) {
        try {
            const response = await AuthService.registration(email, password, name);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('mode', 'inboxes');
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
        finally {
            this.setLoading(false);
        }
    }

    async getUserByEmail(email: string) {
        try {
            const user = await UserService.getUserByEmail(email);
            if (user) {
                this.setIsFreeEmail(false)
            } else { this.setIsFreeEmail(true) }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async changeTheme(email: string, theme: string) {
        try {
            await UserService.changeTheme(email, theme);
        } catch (e: any) {
            console.log(e);
        }
    }
}