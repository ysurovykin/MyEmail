export interface IEmail{
    id: String;
    recipientId: String;
    senderId: String;
    title: String;
    description: String;
    date: Date;
    isImportant: Boolean;
    isRead: Boolean;
}