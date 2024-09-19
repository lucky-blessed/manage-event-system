import React, { useState } from 'react';
import axios from 'axios';

function RSVP() {
    const [eventId, setEventId] = useState('');

    const handleRSVP = () => {
        axios.post(`http://localhost:5000/api/rsvp/${eventId}`)  // Fixed URL
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error creating RSVP!", error);
            });
    };

    return (
        <div>
            <input type="text" value={eventId} onChange={(e) => setEventId(e.target.value)} placeholder="Event ID" required />
            <button onClick={handleRSVP}>RSVP</button>
        </div>
    );
}

export default RSVP;