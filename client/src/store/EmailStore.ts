import { IEmail } from "../models/IEmail";
import EmailService from "../services/EmailService";

export default class EmailStore {
    emails = [] as IEmail[];
    curEmail = {} as IEmail;
    isLoading = true;

    setEmails(emails: IEmail[]) {
        this.emails = emails;
    }
    
    setCurEmail(curEmail: IEmail) {
        this.curEmail = curEmail;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }
 
    async getInboxes(userId: string) {
        this.setLoading(true);
        try {
            const response = await EmailService.getInboxes(userId);
            this.setEmails(response.data);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
        finally{
            this.setLoading(false);
        }
    }

    async getOutboxes(userId: string) {
        this.setLoading(true);
        try {
            const response = await EmailService.getOutboxes(userId);
            this.setEmails(response.data);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
        finally{
            this.setLoading(false);
        }
    }

    async getImportans(userId: string) {
        this.setLoading(true);
        try {
            const response = await EmailService.getImportans(userId);
            this.setEmails(response.data);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
        finally{
            this.setLoading(false);
        }
    }

    async getEmailById(emailId: string) {
        this.setLoading(true);
        try {
            const response = await EmailService.getEmailById(emailId);
            this.setCurEmail(response.data);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
        finally{
            this.setLoading(false);
        }
    }

    async sendEmail(description: string, title: string, recipientEmail: string, senderId: string) {
        try {
            await EmailService.sendEmail(description, title, recipientEmail, senderId);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async setIsImportantEmail(id: string) {
        try {
            await EmailService.setIsImportantEmail(id);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async setIsReadEmail(id: string) {
        try {
            await EmailService.setIsReadEmail(id);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async editEmail(description: string, title: string, emailId: string) {
        try {
            await EmailService.editEmail(description, title, emailId);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }
    
    async deleteEmail(id: string) {
        try {
            await EmailService.deleteEmail(id);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }


}

