const { validationResult } = require("express-validator");
const emailService = require("../services/email-service");

class EmailController {
    async getInboxes(req, res, next){      
        try {
            const {recipientId} = req.params;
            const emails = await emailService.getInboxes(recipientId);
            return res.json(emails);
        } catch (error) {
            next(error);
        }
    }
    async getOutboxes(req, res, next){      
        try {
            const {senderId} = req.params;
            const emails = await emailService.getOutboxes(senderId);
            return res.json(emails);
        } catch (error) {
            next(error);
        }
    }
    async getImportans(req, res, next){      
        try {
            const {recipientId} = req.params;
            const emails = await emailService.getImportans(recipientId);
            return res.json(emails);
        } catch (error) {
            next(error);
        }
    }
    async getEmailById(req, res, next){
        try {
            const {id} = req.params;
            const email = await emailService.getEmailById(id);
            return res.json(email);
        } catch (error) {
            next(error);
        }
    }
    async sendEmail(req, res, next){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.BadRequestError('Validation error', errors.array()))
            }
            const {title, description, recipientEmail, senderId} = req.body;
            const email = await emailService.sendEmail(description, title, recipientEmail, senderId);
            return res.json(email);
        } catch (error) {
            next(error);
        }
    }
    async editEmail(req, res, next){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.BadRequestError('Validation error', errors.array()))
            }
            const {title, description, emailId} = req.body;
            const editedEmail = await emailService.editEmail(description, title, emailId);
            return res.json(editedEmail);
        } catch (error) {
            next(error);
        }
    }
    async setIsImportantEmail(req, res, next){
        try {
            const {id} = req.body;
            const email = await emailService.setIsImportantEmail(id);
            return res.json(email);
        } catch (error) {
            next(error);
        }
    }
    async setIsReadEmail(req, res, next){
        try {
            const {id} = req.body;
            const email = await emailService.setIsReadEmail(id);
            return res.json(email);
        } catch (error) {
            next(error);
        }
    }
    async deleteEmail(req, res, next){
        try {            
            const {id} = req.params;
            await emailService.deleteEmail(id);
            return res.json('Ok');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new EmailController;