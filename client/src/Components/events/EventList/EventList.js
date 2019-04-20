import React, { Component } from "react";
import EventListItem from "./EventListItem.js";

class EventList extends Component {
  state = {};

  render() {
    //destructor props for the events.
    const { events, onEventOpen, deleteEvent } = this.props;

    return (
      <div>
        <h1>Event List </h1>
        {events.map(event => (
          <EventListItem
            key={event.id}
            event={event}
            onEventOpen={onEventOpen}
            deleteEvent={deleteEvent}
          />
        ))}
      </div>
    );
  }
}

export default EventList;
