import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Grid } from "semantic-ui-react";
import EventList from "../EventList/EventList.js";
import { deleteEvent } from "../EventList/eventActions";

import LoadingComponent from "../../layout/LoadingComponent";
import EventActivity from "../EventActivity/EventActivity";

const mapState = state => ({
  events: state.firestore.ordered.event,
  loading: state.async.loading
});

const actions = {
  deleteEvent
}; // passed done to connect to be aprt of props.

class EventDashboard extends Component {
  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };

  render() {
    const { events, loading } = this.props;
    if (loading) return <LoadingComponent inverted={true} />; //the inverted turns the color light if true if note on the component it will be dark.
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList deleteEvent={this.handleDeleteEvent} events={events} />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
      </Grid>
    );
  }
}
export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: "event" }])(EventDashboard));
//we don't have to get the event we are listening for the event. 
