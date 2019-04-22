import React from "react";
import {connect} from 'react-redux'; 
import { Grid } from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";

/* Because rooter properites are attched to the component as its own properities and not something we get from the store we can pass in a second property*/
const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id; 

  let event = {};// an empty event will not thrown an error. 

  if (eventId && state.events.length > 0){
    event = state.events.filter(event => event.id === eventId)[0]; // filter returns an array 
  }

  return {
    event
  }
}

//stateless functional component
const EventDetailedPage = ({event}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event = {event}/>
        <EventDetailedInfo event = {event}/>
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees = {event.attendees}/>
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapState)(EventDetailedPage);
