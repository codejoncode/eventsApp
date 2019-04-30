import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Button } from "semantic-ui-react";
import cuid from "cuid";
import EventList from "../EventList/EventList.js";
import EventForm from "../EventForm/EventForm.js";
import defaultPicture from "../../../Images/users.png";
import {

  deleteEvent,
} from "../EventList/eventActions";

const mapState = state => ({
  events: state.events
});

const actions = {
  deleteEvent,
}; // passed done to connect to be aprt of props.

class EventDashboard extends Component {

  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const { events } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList deleteEvent={this.handleDeleteEvent} events={events} />
        </Grid.Column>
        <Grid.Column width={6} />
      </Grid>
    );
  }
}
export default connect(
  mapState,
  actions
)(EventDashboard);
