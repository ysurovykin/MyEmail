const EmailDto = require("../dtos/email-dto");
const EmailModel = require("../models/email-model");
const UserModel = require("../models/user-model");

class EmailService {
    async getInboxes(recipientId) {
        return await EmailModel.find({ 'recipientId': recipientId }).sort({ dateSend: -1 });
    }
    async getOutboxes(senderId) {
        const sender = await UserModel.findOne({ '_id': senderId });
        return await EmailModel.find({ 'senderEmail': sender.email }).sort({ dateSend: -1 });
    }
    async getImportans(recipientId) {
        return await EmailModel.find({ 'recipientId': recipientId, 'isImportant': true }).sort({ dateSend: -1 });
    }
    async getEmailById(id) {
        const emailData = await EmailModel.findOne({ '_id': id });
        if (!emailData) {
            throw ApiError.BadRequestError('Incorrect email');
        }
        return emailData;
    }
    async sendEmail(description, title, recipientEmail, senderId) {
        const curRecipient = await UserModel.findOne({ email: recipientEmail });
        const sender = await UserModel.findOne({ _id: senderId })
        if (!curRecipient) {
            throw ApiError.BadRequestError('Incorrect recipient email');
        }
        const { _id } = curRecipient;
        const { email, name } = sender;
        const newEmail = await EmailModel.create({ description, title, recipientId: _id, senderEmail: email, senderName: name, dateSend: Date.now() })
        const emailDto = new EmailDto(newEmail);
        return emailDto;
    }
    async editEmail(description, title, emailId) {
        const emailData = await EmailModel.findOne({ '_id': emailId });
        if (!emailData) {
            throw ApiError.BadRequestError('Incorrect email');
        }
        emailData.description = description;
        emailData.title = title;
        emailData.isEdited = true;
        emailData.dateEdited = Date.now();
        await emailData.save();
        return emailData;
    }
    async setIsImportantEmail(id) {
        const emailData = await EmailModel.findOne({ '_id': id });
        if (!emailData) {
            throw ApiError.BadRequestError('Incorrect email');
        }
        emailData.isImportant = !emailData.isImportant;
        await emailData.save();
        return emailData;
    }
    async setIsReadEmail(id) {
        const emailData = await EmailModel.findOne({ '_id': id });
        if (!emailData) {
            throw ApiError.BadRequestError('Incorrect email');
        }
        emailData.isRead = true;
        emailData.dateRead = Date.now();
        await emailData.save();
        return emailData;
    }
    async deleteEmail(id) {
        const emailData = await EmailModel.findOne({ '_id': id });
        if (!emailData) {
            throw ApiError.BadRequestError('Incorrect email');
        }
        await emailData.delete();
        return emailData;
    }
}

module.exports = new EmailService;