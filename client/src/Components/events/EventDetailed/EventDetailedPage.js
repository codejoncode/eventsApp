import React, { Component } from "react";
import { connect } from "react-redux";
import { withFirestore, firebaseConnect, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import { Grid } from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { objectToArray, createDataTree } from "../../common/util/helpers";
import { goingToEvent, cancelGoingToEvent } from "../../user/userActions";
import { addEventComment } from "../EventList/eventActions";
import { openModal } from '../../modals/modalActions'

/* Because rooter properites are attched to the component as its own properities and not something we get from the store we can pass in a second property*/
const mapState = (state, ownProps) => {
  let event = {}; // an empty event will not thrown an error.

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }
  let eventChat; 
  // data available check
  if (state.firebase.data.event_chat && !isEmpty(state.firebase.data.event_chat) ){
    eventChat = objectToArray(state.firebase.data.event_chat[ownProps.match.params.id])//filter out the chats for the id of the event
  }

  return {
    event,
    auth: state.firebase.auth,
    eventChat,
    loading : state.async.loading,
  };
};

const actions = {
  goingToEvent,
  cancelGoingToEvent,
  addEventComment,
  openModal
};

class EventDetailedPage extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
    // let event = await firestore.get(`event/${match.params.id}`)
    // if(!event.exists){// if the user goes to a file instead of a 404  just send them to the events page.
    //   history.push('/events');
    //   toastr.error('Sorry', "Event not found")
    // }
  }
  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const {
      openModal,
      event,
      auth,
      goingToEvent,
      cancelGoingToEvent,
      addEventComment,
      eventChat,
      loading
    } = this.props;
    const attendees =
      event && event.attendees && objectToArray(event.attendees);
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid);
    const chatTree = !isEmpty(eventChat) && createDataTree(eventChat); // turns the data into a tree where parents will have children (replies)
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader
            loading = {loading}
            event={event}
            isHost={isHost}
            isGoing={isGoing}
            goingToEvent={goingToEvent}
            cancelGoingToEvent={cancelGoingToEvent}
            authenticated = {authenticated}
            openModal = {openModal}
          />
          <EventDetailedInfo event={event} />
          {authenticated && 
          <EventDetailedChat
            eventChat={chatTree}
            addEventComment={addEventComment}
            eventId={event.id}
          />}
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  withFirestore,
  connect(
    mapState,
    actions
  ),
  firebaseConnect(props => [`event_chat/${props.match.params.id}`])
)(EventDetailedPage);
