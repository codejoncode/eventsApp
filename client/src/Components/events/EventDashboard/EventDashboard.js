import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import EventList from "../EventList/EventList.js";
import {

  deleteEvent,
} from "../EventList/eventActions";

import LoadingComponent from '../../layout/LoadingComponent';

const mapState = state => ({
  events: state.events,
  loading: state.async.loading,
});

const actions = {
  deleteEvent,
}; // passed done to connect to be aprt of props.

class EventDashboard extends Component {

  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const { events, loading } = this.props;
    if (loading) return <LoadingComponent inverted={true}/> //the inverted turns the color light if true if note on the component it will be dark. 
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
