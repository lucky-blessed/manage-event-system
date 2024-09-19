import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);          // Error state

    useEffect(() => {
        fetch('http://localhost:5000/events')
            .then((response) => response.json())
            .then((data) => {
                setEvents(data);
                setIsLoading(false); // Stop loading when data is fetched
            })
            .catch((error) => {
                console.error('Error fetching events:', error);
                setError(error);
                setIsLoading(false);  // Stop loading even if error occurs
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;  // Display loading indicator
    }

    if (error) {
        return <div>Error: {error.message}</div>;  // Display error if any
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <nav>
                <ul>
                    {events.length > 0 ? (
                        events.map((event) => (
                            <li key={event.id}>
                                {event.name} - {event.date} at {event.location}
                            </li>
                        ))
                    ) : (
                        <li>No events available</li>
                    )}
                    <li><Link to="/events">View Events</Link> </li>
                    <li><Link to="/create-event">Create Event</Link></li>
                    <li><Link to="/rsvp">RSVP</Link></li>
                    <li><Link to="/update-event">Update Event</Link></li>
                    <li><Link to="/delete-event">Delete Event</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Dashboard;