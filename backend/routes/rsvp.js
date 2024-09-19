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
const reservations = require('../models/reservations');

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
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:id', verifyToken, validIdParam, async (req, res) => {
    const reseravtionId = req.params.id;
    const userId = req.user;

    try {
        const reseravtion = await Reservation.findById(reseravtionId);
        if (!reseravtion) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        // Check if the user is the owner of the reservation
        if (reseravtion.userId.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to update this reservation' });
        }

        const event = await EventModel.findById(reseravtion.eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Prevent updtes 2hrs before event
        const now = moment();
        const eventDate = moment(event.datetime);
        if (eventDate.diff(now, 'hours') < 2) {
            return res.status(400).json({ message: 'You cannot update reservations 2hrs before event' });
        }

        const validation = UpdateReservationSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ error: fromError(validation.error).toString() });
        }

        await reservation.save();
        res.status(200).json({ reservation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

rounter.get('/user/:eventId', verifyToken, async (req, res) => {
    const userId = req.user;
    const { eventId } = req.params;

    try {
        const reseravtion = await Reservation.findOne({ userId, eventId });
        if (!reservation) {
            return res.status(404).json( { message: 'Reservation not found' });
        }

        res.status(200).json({ reservation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.get('/event/:eventId', verifyToken, async (req, res) => {
    const userId = req.user;
    const { eventId } = req.params;

    try {
        const event = await EventModel.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the user is the owner of the event
        if (event.userId.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to view this reservation.' });
        }

        const reservations = await Reservation.find({ eventId }).populate('userId', 'name email');
        res.status(200).json({ reservations });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.delete('/event/:reservationId', verifyToken, async (req, res) => {
    const reseravtionId = req.params.reservationId;
    const userId = req.user;

    try {
        const reseravtion = await Reservation.findById(reseravtionId);
        if (!reseravtion) {
            return res.status(404).json({ message: 'Reservation not found'});
        }

        const event = await EventModel.findById(reservation.eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check id the user is the owner of the event
        if (event.userId.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this reservation.' });
        }

        await Reservation.deleteOne({ _id: reseravtionId });
        res.status(200).json({ message: 'Reservation deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});