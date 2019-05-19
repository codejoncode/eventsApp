import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Grid, Button } from "semantic-ui-react";
import EventList from "../EventList/EventList.js";
import { getEventsForDashboard } from "../EventList/eventActions";

import LoadingComponent from "../../layout/LoadingComponent";
import EventActivity from "../EventActivity/EventActivity";

const mapState = state => ({
  events: state.events,
  loading: state.async.loading
 
});

const actions = {
  getEventsForDashboard
}; // passed done to connect to be aprt of props.

class EventDashboard extends Component {
  state ={
    moreEvents: false 
  }
 async componentDidMount() {
    let next = await this.props.getEventsForDashboard(); // contains query snapshot
    console.log(next);
    //currently have a limit of limit of 2
    if( next && next.docs && next.docs.length > 1 ){
      this.setState({
        moreEvents: true
      })
    }
  }

  getNextEvents = async () => {
    const {events} = this.props; 
    let lastEvent = events && events[events.length - 1];
    console.log(lastEvent);
    let next = await this.props.getEventsForDashboard(lastEvent);
    console.log(next); 
    if( next && next.docs && next.docs.length <= 1 ){
      this.setState({
        moreEvents: false
      })
    }
  }

  handleDeleteEvent = eventId => () => {
    
  };

  render() {
    const { events, loading } = this.props;
    if (loading ) return <LoadingComponent inverted={true} />; //the inverted turns the color light if true if note on the component it will be dark.
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList  events={events} />
          <Button onClick={this.getNextEvents} disabled={!this.state.moreEvents} content = 'More' color='green' floated='right'/> 
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
)(firestoreConnect([{ collection: "events" }])(EventDashboard));
//we don't have to get the event we are listening for the event. 
