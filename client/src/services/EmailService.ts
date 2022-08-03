import { AxiosResponse } from "axios";
import api from "../http";
import { IEmail } from "../models/IEmail";

export default class EmailService {
    static async getInboxes(userId: string): Promise<AxiosResponse<IEmail[]>>{
        return api.get<IEmail[]>('/inboxes/' + userId)
    }
    static async getOutboxes(userId: string): Promise<AxiosResponse<IEmail[]>>{
        return api.get<IEmail[]>('/outboxes/' + userId)
    }
    static async getImportans(userId: string): Promise<AxiosResponse<IEmail[]>>{
        return api.get<IEmail[]>('/importans/' + userId)
    }
    static async getEmailById(id: string): Promise<AxiosResponse<IEmail>>{
         return api.get<IEmail>('/email/' + id)
    }
    static async sendEmail(description: string, title: string, recipientEmail: string, senderId: string): Promise<AxiosResponse<IEmail>>{
        return api.post<IEmail>('/send', {description, title, recipientEmail, senderId})
    }
    static async editEmail(description: string, title: string, emailId: string): Promise<AxiosResponse<IEmail>>{
        return api.put<IEmail>('/edit/email', {description, title, emailId})
    }
    static async setIsImportantEmail(id: string): Promise<AxiosResponse<IEmail>>{
        return api.put<IEmail>('/important', {id})
    }
    static async setIsReadEmail(id: string): Promise<AxiosResponse<IEmail>>{
        return api.put<IEmail>('/read', {id})
    }
    static async deleteEmail(id: string): Promise<AxiosResponse<IEmail>>{
        return api.delete<IEmail>('/delete/' + id)
    }
}