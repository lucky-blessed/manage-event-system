import React, { useState } from 'react';
import axios from 'axios';

function DeleteEvent() {
    const [eventId, setEventId] = useState('');

    const handleDelete = () => {
        axios.delete(`http://localhost:5000/api/events/${eventId}`)
            .then(response => {
                console.log(response.data);
                setEventId('');
            })
            .catch(error => {
                console.error('There was an error deleting event!', error);
            });
    };

    return (
        <div>
            <input type="text" value={eventId} onChange={(e) => setEventId(e.target.value)} placeholder="Event ID" required />
            <button onClick={handleDelete}>Delete Event</button>
        </div>
    );
}

export default DeleteEvent;