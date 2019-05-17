import React, { Component } from "react";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import { toastr } from 'react-redux-toastr';
import { Grid } from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { objectToArray } from '../../common/util/helpers';
/* Because rooter properites are attched to the component as its own properities and not something we get from the store we can pass in a second property*/
const mapState = (state) => {
  

  let event = {}; // an empty event will not thrown an error.
  
  if (state.firestore.ordered.event && state.firestore.ordered.event[0]) {
    event = state.firestore.ordered.event[0];
  }

  return {
    event
  };
};



class EventDetailedPage extends Component {

  async componentDidMount () {
    const {firestore, match, history} = this.props;
    let event = await firestore.get(`event/${match.params.id}`)
    if(!event.exists){// if the user goes to a file instead of a 404  just send them to the events page. 
      history.push('/events');
      toastr.error('Sorry', "Event not found")
    }
  }

  render() {
    const { event } = this.props;
    const attendees = event && event.attendees && objectToArray(event.attendees);

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader event={event} />
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

export default withFirestore(connect(mapState)(EventDetailedPage));
