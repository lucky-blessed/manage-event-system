import React from 'react';
import { BrowserRuter as Router, Route, Swithch } from 'react-router-dom';
import Login from './components/Login';
import CreateEvent from './components/CreateEvent';
import EventList from './components/EventList';
import RSVP from './components/RSVP';
import Dashboard from './components/Dashboard';
import UpdateEvent from './components/UpdateEvent';
import DeleteEvent from './components/DeleteEvent';

function App() {
  return (
    <Router>
      <div>
        <h1>Event Management App</h1>
        <Swithch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/events" component={EventList} />
          <Route path="/create-event" component={CreateEvent} />
          <Route path="/rsvp" component={RSVP}/>
          <Route path="/update-event/:id" component={UpdateEvent}/>
          <Route path="/delete-event" component={DeleteEvent}/>
          <Route path="/login" component={Login} />
        </Swithch>
      </div>
    </Router>
  );
};








export default App;