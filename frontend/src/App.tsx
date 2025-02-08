import React, { useState } from 'react';
import EventRoom from './components/EventRoom';

const App = () => {
  const [userToken, setUserToken] = useState('');
  const [eventId, setEventId] = useState('');

  return (
    <div>
      <h1>Event Room</h1>
      <input
        type="text"
        placeholder="Enter your token"
        value={userToken}
        onChange={(e) => setUserToken(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
      />
      <button onClick={() => {/* Logic to join event */}}>Join Event</button>
      {userToken && eventId && <EventRoom eventId={eventId} token={userToken} />}
    </div>
  );
};

export default App;