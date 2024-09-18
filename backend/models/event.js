const mongoose = require('mongoose');
const UserModel = require('./user');

const EventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        datetime: {
            type: Date,
            required: true,
        },
        isPublic: {
            type: Boolean,
            default: true,
        },
        cover: {
            type: String,
            required: true, //URL or path to the cover image
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: UserModel,
            required: true,
        },
    },
    { timestamps: true}
);

module.exports = mongoose.model('EventModel', EventSchema);