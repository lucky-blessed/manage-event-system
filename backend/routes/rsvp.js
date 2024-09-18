const express = require('express');
const EventModel = require('../models/event');
const Reservation = require('../models/reservations')
const verifyToken = require('../middleware/verify-token');
const  router = express.Router();
const { fromError } = require('zod-validation-error');
const CreateReservationSchema = require('../schema/create-reservation-schema');
const UpdateReservationSchema = require('../schema/update-reservation-schema');
const moment = require('moment');
const validIdParam = require('../middleware/valid-id-param');

router.post('/', verifyToken, async (req, res) => {
    const userId = req.user;
    const { eventId } = req.body;

    try {
        const validation = CreateReservationSchema.safeParse(req.body);
        if (!validation.success)  {
            return res.status(400).json({ error: fromError(validation.error).toString() });
        }

        const event = await EventModel.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Prevent event creator from making a reservation
        if (event.userId.toString() === userId) {
            return res.status(403).json({ message: 'Event creator cannot create a reservation' });
        }

        // Check if the user already has  reservation for this event
        const existingReservation = await Reservation.findOne({ userId, eventId });
        if (existingReservation) {
            return res.status(400).json({ message: 'You have already reserved a sport for this event' });
        }

        // Prevent reservtion on the day of the event 
        const now = moment();
        const eventDate = moment(event.datetime);
        if (eventDate.isSame(now, 'day')) {
            return res.status(400).json({ message: 'Reservations cannot be made on the day of event.'});
        }

        const newReservation = new Reservaation({
            userId,
            eventId,
        });

        await newReservation.save();
        res.status(201).json({ reseravtion: newReservation});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error'});
    }
});