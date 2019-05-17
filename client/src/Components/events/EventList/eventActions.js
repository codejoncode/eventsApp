import { toastr } from "react-redux-toastr";
import {
  // CREATE_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  FETCH_EVENTS
} from "./eventConstants";
import {
  asyncActionStart,
  asyncActionFinish,
  asynActionError
} from "../../async/asyncActions";
import { fetchSampleData } from "../../../data/mockApi";
import { createNewEvent } from '../../common/util/helpers';


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
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_EVENT,
        payload: {
          event
        }
      });
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
