import { toastr } from "react-redux-toastr";
import {
  // CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS
} from "./eventConstants";
import {
  asyncActionStart,
  asyncActionFinish,
  asynActionError
} from "../../async/asyncActions";
import { fetchSampleData } from "../../../data/mockApi";
import { createNewEvent } from '../../common/util/helpers';
import moment from 'moment'; 

export const fetchEvents = events => {
  return {
    type: FETCH_EVENTS,
    payload: events
  };
};

export const createEvent = event => {
  return async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore(); 
    const uid = await firestore.auth().currentUser.uid; 
    const displayName = await getState().firebase.profile.displayName;
    const user = {uid, displayName};
    const photoURL = getState().firebase.profile.photoURL;
    let newEvent = createNewEvent(user, photoURL, event);
    try {
      let createdEvent = await firestore.add(`event`, newEvent);
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventID: createdEvent.id, 
        userUid: user.uid,
        eventDate: event.date,
        host: true
      })
      toastr.success("Success!", "Event has been created");
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const updateEvent = event => {
  return async (dispatch, getState, {getFirestore} )=> {
    const firestore = getFirestore(); 
    if (event.date !== getState().firestore.ordered.event[0].date){
      //this checks prevents a reset to 1970
      event.date = moment(event.date).toDate(); 
    }
    try {
      await firestore.update(`event/${event.id}`, event); 
      toastr.success("Success!", "Event has been updated");
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const deleteEvent = eventId => {
  return async dispatch => {
    try {
      dispatch({
        type: DELETE_EVENT,
        payload: {
          eventId
        }
      });
      toastr.success("Success!", "Event has been deleted");
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const cancelToggle = (cancelled, eventId) => 
  async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const message = cancelled ? 'Are you sure you want to cancel the event?' : 'This will reactivate the event - are you sure'; 
    try {
      toastr.confirm(message, {
        onOk: () => firestore.update(`event/${eventId}`, {
          cancelled
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      let events = await fetchSampleData();
      dispatch(fetchEvents(events));
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asynActionError());
    }
  };
};
