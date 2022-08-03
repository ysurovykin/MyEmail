module.exports = class EmailDto{
    id;
    senderName;
    senderEmail;
    recipientId;
    title;
    description;
    dateSend;
    isImportant;
    isRead;
    dateRead;
    isEdited;
    dateEdited;

    constructor(model){
        this.id = model.id;
        this.senderEmail = model.senderEmail;
        this.senderName = model.senderName;
        this.recipientId = model.recipientId;
        this.title = model.title;
        this.description = model.description;
        this.dateSend = model.dateSend;
        this.isImportant = model.isImportant;
        this.isRead = model.isRead;
        this.dateRead = model.dateRead;
        this.isEdited = model.isEdited;
        this.dateEdited = model.dateEdited;
    }
}