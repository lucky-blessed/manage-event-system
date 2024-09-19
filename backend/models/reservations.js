const mongoose = require('mongoose');
const UserModel = require('./user');
const EventModel = require('./event');

const ReservationShema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: UserModel,
            required: true,
        },
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: EventModel,
            required: true,
        },
    },
    { timeseries: true }
);

module.exports = mongoose.model('ReservationModel', ReservationShema);