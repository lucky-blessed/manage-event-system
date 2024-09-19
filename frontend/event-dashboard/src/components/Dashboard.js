import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <nav>
                <ul>
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