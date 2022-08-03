const {Schema, model} = require('mongoose');

const EmailSchema = new Schema({
    senderEmail: {type: String, ref: 'User'},
    senderName: {type: String, ref: 'User'},
    recipientId: {type: Schema.Types.ObjectId, ref: 'User'},
    title: {type: String, required: true},
    description: {type: String, required: true},
    dateSend: {type: Date, required: true, default: Date.now()},
    isImportant: {type: Boolean, required: true, default: false},
    isRead: {type: Boolean, required: true, default: false},
    dateRead: {type: Date, required: true, default: Date.now()},
    isEdited: {type: Boolean, required: true, default: false},
    dateEdited: {type: Date, required: true, default: Date.now()},
})

module.exports = model('Email', EmailSchema);