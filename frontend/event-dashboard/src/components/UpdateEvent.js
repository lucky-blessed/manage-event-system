import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdateEvent() {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/events/${id}`)
            .then(response => {
                setEventName(response.data.name);
                setEventDate(response.data.date);
            })
            .catch(error => {
                console.error('Error fetching event!', error);
            });
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/events/${id}`, { name: eventName, date: eventDate })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error updating event!', error);
            });
    };

    return (
        <form onSubmit={handleUpdate}>
            <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Event Name" required />
            <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
            <button type="submit">Update Event</button>
        </form>
    );
}

export default UpdateEvent;