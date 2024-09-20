const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const EventModel = require('./models/event'); // Correctly import the Event model
const UserModel = require('./models/user'); // Import User model if needed for other routes

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Event Management API');
});

// Get all events
app.get("/api/events", (req, res) => {
    EventModel.find()
        .then(events => res.json(events))
        .catch(error => res.status(500).json({ message: 'Error fetching events', error }));
});

// Create a new event
app.post("/api/events", (req, res) => {
    const { title, description, datetime, isPublic, cover, userId } = req.body;

    const newEvent = new EventModel({ title, description, datetime, isPublic, cover, userId });

    newEvent.save()
        .then(event => res.status(201).json(event))
        .catch(error => res.status(400).json({ message: 'Error creating event', error }));
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});