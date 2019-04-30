import React, { Component } from "react";
import EventListItem from "./EventListItem.js";

class EventList extends Component {
  state = {};

  render() {
    //destructor props for the events.
    const { events, deleteEvent } = this.props;

    return (
      <div>
        {events.map(event => (
          <EventListItem
            key={event.id}
            event={event}
            deleteEvent={deleteEvent}
          />
        ))}
      </div>
    );
  }
}

export default EventList;
