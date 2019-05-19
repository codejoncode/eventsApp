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
import firebase from '../../../config/firebase';
// export const fetchEvents = events => {
//   return {
//     type: FETCH_EVENTS,
//     payload: events
//   };
// };

export const createEvent = event => {
  return async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore(); 
    const uid = await firestore.auth().currentUser.uid; 
    const displayName = await getState().firebase.profile.displayName;
    const user = {uid, displayName};
    const photoURL = getState().firebase.profile.photoURL;
    let newEvent = createNewEvent(user, photoURL, event);
    try {
      let createdEvent = await firestore.add(`events`, newEvent);
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
    if (event.date !== getState().firestore.ordered.events[0].date){
      //this checks prevents a reset to 1970
      event.date = moment(event.date).toDate(); 
    }
    try {
      await firestore.update(`events/${event.id}`, event); 
      toastr.success("Success!", "Event has been updated");
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
        onOk: () => firestore.update(`events/${eventId}`, {
          cancelled
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  export const getEventsForDashboard = () => 
    async (dispatch, getState) => {
      let today = new Date(Date.now());
      const firestore = firebase.firestore();
      const eventsQuery = firestore.collection('events').where('date','>=', today); 
      console.log(eventsQuery)
      try {
        dispatch(asyncActionStart())
        let querySnap = await eventsQuery.get()
        let events = []; 
        for (let i = 0; i< querySnap.docs.length; i++){
          let evt = {...querySnap.docs[i].data(), id: querySnap.docs[i].id};
          events.push(evt); 
        }
        dispatch({type: FETCH_EVENTS, payload: events})
        dispatch(asyncActionFinish())
      } catch (error) {
        console.log(error)
        dispatch(asynActionError())
      }
    }
