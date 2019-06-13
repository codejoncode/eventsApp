import { toastr } from "react-redux-toastr";
import {
  FETCH_EVENTS
} from "./eventConstants";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../../async/asyncActions";
// import { fetchSampleData } from "../../../data/mockApi";
import { createNewEvent } from "../../common/util/helpers";
import moment from "moment";
import firebase from "../../../config/firebase";
import compareAsc from "date-fns/compare_asc";
// export const fetchEvents = events => {
//   return {
//     type: FETCH_EVENTS,
//     payload: events
//   };
// };
import imagesObject from "../../../Images/imagesObject";

export const createEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const uid = await firestore.auth().currentUser.uid;
    const displayName = await getState().firebase.profile.displayName;
    const user = { uid, displayName };
    const photoURL = getState().firebase.profile.photoURL;
    let newEvent = createNewEvent(user, photoURL, event);
    try {
      dispatch(asyncActionStart())
      let createdEvent = await firestore.add(`events`, newEvent);
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true
      });
      toastr.success("Success!", "Event has been created");
      dispatch(asyncActionFinish())
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
      dispatch(asyncActionError())
    }
  };
};

export const updateEvent = event => {
  return async (dispatch, getState) => {
    dispatch(asyncActionStart());
    const firestore = firebase.firestore();
    if (event.date !== getState().firestore.ordered.events[0].date) {
      //this checks prevents a reset to 1970
      event.date = moment(event.date).toDate();
    }
    try {
      let eventDocRef = firestore.collection("events").doc(event.id);
      let dateEqual = compareAsc(
        getState().firestore.ordered.events[0].date.toDate(), //toDate needed for successful comparision
        event.date
      ); // workds like C programming compare  0 1 or -1
      if (dateEqual !== 0) {
        let batch = firestore.batch();
        await batch.update(eventDocRef, event);

        let eventAttendeeRef = firestore.collection("event_attendee");
        let eventAttendeeQuery = await eventAttendeeRef.where(
          "eventId",
          "==",
          event.id
        );
        let eventAttendeeQuerySnap = await eventAttendeeQuery.get();

        for (let i = 0; i < eventAttendeeQuerySnap.docs.length; i++) {
          let eventAttendeeDocRef = await firestore
            .collection("event_attendee")
            .doc(eventAttendeeQuerySnap.docs[i].id);

          await batch.update(eventAttendeeDocRef, {
            eventDate: event.date
          });
        }
        await batch.commit();
      } else {
        await eventDocRef.update(event);
      }

      dispatch(asyncActionFinish());
      toastr.success("Success!", "Event has been updated");
    } catch (error) {
      dispatch(asyncActionError());
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const cancelToggle = (cancelled, eventId) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const message = cancelled
    ? "Are you sure you want to cancel the event?"
    : "This will reactivate the event - are you sure";
  try {
    toastr.confirm(message, {
      onOk: () =>
        firestore.update(`events/${eventId}`, {
          cancelled
        })
    });
  } catch (error) {
    console.log(error);
  }
};

export const getEventsForDashboard = lastEvent => async (
  dispatch,
  getState
) => {
  let today = new Date(Date.now());
  const firestore = firebase.firestore();
  const eventsRef = firestore.collection("events");
  try {
    dispatch(asyncActionStart());
    let startAfter =
      lastEvent &&
      (await firestore
        .collection("events")
        .doc(lastEvent.id)
        .get());
    let query;

    lastEvent
      ? (query = eventsRef
          .where("date", ">=", today)
          .orderBy("date")
          .startAfter(startAfter)
          .limit(2))
      : (query = eventsRef
          .where("date", ">=", today)
          .orderBy("date")
          .limit(2));

    let querySnap = await query.get();

    if (querySnap.docs.length === 0) {
      dispatch(asyncActionFinish());
      return;
    }

    let events = [];
    for (let i = 0; i < querySnap.docs.length; i++) {
      let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      events.push(evt);
    }
    dispatch({ type: FETCH_EVENTS, payload: events });
    dispatch(asyncActionFinish());
    return querySnap;
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError ());
  }
};

export const addEventComment = (eventId, values, parentId) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const profile = getState().firebase.profile;
  const { displayName, photoURL } = profile;
  const uid = firebase.auth().currentUser.uid;
  let newComment = {
    parentId,
    displayName,
    photoURL: photoURL || imagesObject.user,
    uid,
    text: values.comment,
    date: Date.now()
  };
  try {
    await firebase.push(`event_chat/${eventId}`, newComment);
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Problem adding comment");
  }
};
