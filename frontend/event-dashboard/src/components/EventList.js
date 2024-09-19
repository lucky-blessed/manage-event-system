import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EventList() {
    cons [EventSource, setEvents] = useState([]);

    useEffect(()  => {
        axios.get('http://localhost:5000/api/events')
            .then(Response => {
                setEvents(response.date);
            })
            .catch(error => {
                console.error('Error fetching events!', error);
            });
    }, []);

    return (
        <div>
            <h1>Events</h1>
            <ul>
                {events.map(event => (
                    <li key={event._id}>{event.name} - {event.date}</li>
                ))}
            </ul>
        </div>
    );
}

export default EventList;