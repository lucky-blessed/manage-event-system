import React, { useState } from 'react';
import axios from 'axios';

function CreateEvent() {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/events', { name: eventName, eventDate })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error creating the event!', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Event Name" required />
            <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
            <button type="submit">Create Event</button>
        </form>
    );
}

export default CreateEvent;