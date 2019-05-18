import React, { Component } from "react";
import { connect } from "react-redux";
import { withFirestore, authIsReady } from "react-redux-firebase";
import { toastr } from 'react-redux-toastr';
import { Grid } from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { objectToArray } from '../../common/util/helpers';
import { goingToEvent } from "../../user/userActions"; 


/* Because rooter properites are attched to the component as its own properities and not something we get from the store we can pass in a second property*/
const mapState = (state) => {
  

  let event = {}; // an empty event will not thrown an error.
  
  if (state.firestore.ordered.event && state.firestore.ordered.event[0]) {
    event = state.firestore.ordered.event[0];
  }

  return {
    event,
    auth: state.firebase.auth
  };
};

const actions = {
  goingToEvent
}


class EventDetailedPage extends Component {

  async componentDidMount () {
    const {firestore, match, history} = this.props;
    await firestore.setListener(`event/${match.params.id}`)
    // let event = await firestore.get(`event/${match.params.id}`)
    // if(!event.exists){// if the user goes to a file instead of a 404  just send them to the events page. 
    //   history.push('/events');
    //   toastr.error('Sorry', "Event not found")
    // }
  }
  async componentWillUnmount() {
    const {firestore, match, history} = this.props;
    await firestore.unsetListener(`event/${match.params.id}`)
  }

  render() {
    const { event, auth, goingToEvent } = this.props;
    const attendees = event && event.attendees && objectToArray(event.attendees);
    const isHost = event.hostUid === auth.uid; 
    const isGoing = attendees && attendees.some(a => a.id === auth.uid);
    
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader event={event} isHost = {isHost} isGoing = {isGoing} goingToEvent = {goingToEvent}/>
          <EventDetailedInfo event={event} />
          <EventDetailedChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(connect(mapState, actions)(EventDetailedPage));
