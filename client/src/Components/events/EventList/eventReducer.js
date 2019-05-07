import { createReducer  } from  '../../common/util/reducerUtil';
import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENTS } from './eventConstants';

 const initialState = []


  export const createEvent = (state, payload) => {
      return [...initialState, Object.assign({}, payload.event)];
  };

  export const updateEvent = (state, payload) => {
      return [
          ...initialState.filter(event => event.id !== payload.event.id), // spread eveything but the event that is being updated 
          Object.assign({}, payload.event)
      ]
  };

  export const deleteEvent = (state, payload) => {
      return [
        ...initialState.filter(event => event.id !== payload.eventId),
      ]
  };

  export const fetchEvents = (state, payload) => {
      return payload.events // returns {events : [...events here in array as objects]}
  }


  export default createReducer(initialState, {
      [CREATE_EVENT]: createEvent, 
      [UPDATE_EVENT]: updateEvent, 
      [DELETE_EVENT]: deleteEvent, //  same as  let obj = {}   obj[DELETE_EVENT] = deleteEvent  new ES6 syntax. 
      [FETCH_EVENTS]: fetchEvents,
  });