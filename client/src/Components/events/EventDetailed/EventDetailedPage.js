import React, { Component } from "react";
import { connect } from "react-redux";
import { toastr } from 'react-redux-toastr'
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
import LoadingComponent from '../../layout/LoadingComponent';

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
    requesting: state.firestore.status.requesting,
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

  state = {
    initialLoading : true
  }

  async componentDidMount() {
    const { firestore, match } = this.props;
    let event = await firestore.get(`events/${match.params.id}`);
    if(!event.exists){
      toastr.error('Not found', 'Event does not exist');
      this.props.history.push('/error');
    }
    await firestore.setListener(`events/${match.params.id}`);
    this.setState({
      initialLoading: false
    })
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
      loading,
      requesting,
      match,
    } = this.props;
    const attendees =
      event && event.attendees && objectToArray(event.attendees).sort(function(a,b) {
        return a.joinDate - b.joinDate; //order the people going to an event by their joinDate this will keep the host at the top. 
      });
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid);
    const chatTree = !isEmpty(eventChat) && createDataTree(eventChat); // turns the data into a tree where parents will have children (replies)
    const authenticated = auth.isLoaded && !auth.isEmpty;
    const loadingEvent = requesting[`events/${match.params.id}`];
    if (loadingEvent || this.state.initialLoading) return <LoadingComponent inverted={true}/>
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
  firebaseConnect(props => props.auth.isLoaded && !props.auth.isEmpty && [`event_chat/${props.match.params.id}`])
)(EventDetailedPage);
