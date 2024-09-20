const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const rsvpRoutes = require("./routes/rsvp");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Event Management API');
});

// Event route
app.get("/api/events", (req, res) => {
    res.json({ message: 'Welcome to the Event Management API' }); // You can change this to return events
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
