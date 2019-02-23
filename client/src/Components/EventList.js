import React, { Component } from "react";
import  EventListItem from './EventListItem.js'

class EventList extends Component {
  state = {};

  render() {
    //destructor props for the events. 
    const {events} = this.props; 

    return (
      <div>
          <h1>Event List </h1>
          {events.map((event) => <EventListItem  key = {event.id} event = {event}/>)}
          
      </div>
    );
  }
}

export default EventList;
