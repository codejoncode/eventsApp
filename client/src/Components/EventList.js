import React, { Component } from "react";
import  EventListItem from './EventListItem.js'

class EventList extends Component {
  state = {};

  render() {
    return (
      <div>
          <h1>Event List </h1>
          <EventListItem />
          <EventListItem />
          <EventListItem />
          <EventListItem />
      </div>
    );
  }
}

export default EventList;
