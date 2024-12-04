const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['order', 'stock', 'promotion', 'system'],
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    relatedId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'onModel',
        required: false
    },
    onModel: {
        type: String,
        enum: ['Order', 'Product', 'Promotion'],
        required: false
    }
});

module.exports = mongoose.model('Notification', notificationSchema); 