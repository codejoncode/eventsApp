import React, { Component } from "react";
import { connect } from 'react-redux';
import { Grid, Button } from "semantic-ui-react";
import cuid from 'cuid'; 
import EventList from "../EventList/EventList.js";
import EventForm from "../EventForm/EventForm.js";
import defaultPicture from "../../../Images/users.png";
import { createEvent, deleteEvent, updateEvent } from '../EventList/eventActions';

const mapState = (state) => ({
  events : state.events
})

const actions = {
  createEvent, 
  deleteEvent, 
  updateEvent, 
}; // passed done to connect to be aprt of props. 


class EventDashboard extends Component {
  state = {
    isOpen: false,
    selectedEvent : null,
  };

  handleFormOpen = () => {
    this.setState({
      selectedEvent: null,
      isOpen: true
    });
  };

  handleCancel = () => {
    this.setState({
      isOpen: false
    });
  };

  handleCreateEvent = (newEvent) => {
    newEvent.id = cuid(); //generates a random id 
    newEvent.hostPhotoURL = defaultPicture; // default photo for when a user does not have one. 
    this.props.createEvent(newEvent);
    this.setState({
      isOpen: false, 
    });
  }

  handleUpdateEvent = (updatedEvent) => {
    this.props.updateEvent(updatedEvent);
    this.setState({
      isOpen: false, 
      selectedEvent: null
    })
  }

  handleOpenEvent = (eventToOpen) => () => {
    this.setState({
      selectedEvent: eventToOpen,
      isOpen: true,
    });
  }
  
  handleDeleteEvent = (eventId) => () => {
    this.props.deleteEvent(eventId); 
  }

  render() {
    const {selectedEvent} = this.state; 
    const {events} = this.props; 
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList deleteEvent = {this.handleDeleteEvent} onEventOpen = {this.handleOpenEvent} events={events} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            onClick={this.handleFormOpen}
            positive
            content="Create Event"
          />
          {/* if this.state.isOpen is true then the event form will show else it will not show */}
          {this.state.isOpen && <EventForm updateEvent = {this.handleUpdateEvent} selectedEvent = {selectedEvent} createEvent = {this.handleCreateEvent} handleCancel={this.handleCancel} />}
        </Grid.Column>
      </Grid>
    );
  }
}
export default connect(mapState, actions)(EventDashboard);
