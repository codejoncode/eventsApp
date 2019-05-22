import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Grid, Loader } from "semantic-ui-react";
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
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: [],
  }
 async componentDidMount() {
    let next = await this.props.getEventsForDashboard(); // contains query snapshot
    //currently have a limit of limit of 2
    if( next && next.docs && next.docs.length > 1 ){
      this.setState({
        moreEvents: true,
        loadingInitial: false,
      })
    }
  }

  async componentWillReceiveProps (nextProps) {
    if(this.props.events !== nextProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...nextProps.events]
      })
    }
  }

  getNextEvents = async () => {
    const {events} = this.props; 
    let lastEvent = events && events[events.length - 1];
    let next = await this.props.getEventsForDashboard(lastEvent);
    if( next && next.docs && next.docs.length <= 1 ){
      this.setState({
        moreEvents: false
      })
    }
  }


  render() {
    const {  loading } = this.props;
    const { loadedEvents, loadingInitial, moreEvents} = this.state; 
    if (loadingInitial ) return <LoadingComponent inverted={true} />; //the inverted turns the color light if true if note on the component it will be dark.
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList  events = {loadedEvents} loading = {loading} moreEvents ={moreEvents} getNextEvents = {this.getNextEvents}/>
          
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
        <Grid.Column width = {10}>
          <Loader active={loading}/>
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
