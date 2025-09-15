import React from 'react';

export default function EventFeed({ events }) {
  return (
    <div className="event-feed">
      {events.map(e => (
        <div key={e.id} className={`event event-${e.severity}`}>
          <strong>{e.type}</strong> — {e.message} <span>{e.time}</span>
        </div>
      ))}
    </div>
  );
}
