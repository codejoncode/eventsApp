import { createReducer  } from  '../../common/util/reducerUtil';
import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENTS, FETCH_USER_EVENTS } from './eventConstants';

 const initialState = {
     events: [], 
     userEvents: []
 };


  export const createEvent = (state, payload) => {
    //   return [...initialState, Object.assign({}, payload.event)];
    return [...state, Object.assign({}, payload.event)];
  };

  export const updateEvent = (state, payload) => {
      return [
          //...initialState.filter(event => event.id !== payload.event.id), 
          // spread eveything but the event that is being updated 
          ...state.filter(event => event.id !== payload.event.id),
          Object.assign({}, payload.event)
      ]
  };

  export const deleteEvent = (state, payload) => {
      return [
        ...state.filter(event => event.id !== payload.eventId),
      ]
  };

  export const fetchEvents = (state, payload) => {
      //return payload.events // returns {events : [...events here in array as objects]}
      return {...state, events: payload}
  }

  export const fetchUserEvents = ( state, payload) => {
      return {
          ...state, 
          userEvents: payload
      }
  }


  export default createReducer(initialState, {
      [CREATE_EVENT]: createEvent, 
      [UPDATE_EVENT]: updateEvent, 
      [DELETE_EVENT]: deleteEvent, //  same as  let obj = {}   obj[DELETE_EVENT] = deleteEvent  new ES6 syntax. 
      [FETCH_EVENTS]: fetchEvents,
      [FETCH_USER_EVENTS]: fetchUserEvents,
  });