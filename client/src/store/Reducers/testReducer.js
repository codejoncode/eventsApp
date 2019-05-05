import { createReducer } from '../../Components/common/util/reducerUtil';
import { INCREMENT_COUNTER, DECREMENT_COUNTER, COUNTER_ACTION_FINISHED, COUNTER_ACTION_STARTED } from "../../Components/testarea/testConstants";

const initialState = {
    data: 42,
    loading: false
}

export const incrementCounter = (state, payload) => {
  return {...state, data: state.data + 1}; 
}

export const decrementCounter = (state, payload) => {
  return {...state, data: state.data - 1};
}

export const counterActionStarted = (state, payload) => {
  return { ...state, loading: true};
}

export const counterActionFinished = (state, payload) => {
  return {...state, loading: false};
}
// const testReducer = (state = initialState, action) => {
//     switch(action.type){
//       case INCREMENT_COUNTER:
//         return {...state, data: state.data + 1}; 
//       case DECREMENT_COUNTER:
//         return {...state, data: state.data - 1};
//       default:
//         return state; 
//     }
// }

// export default testReducer; 

export default createReducer(initialState, {
    [INCREMENT_COUNTER] : incrementCounter, // ES6 feature computred property name    let obj = {}   obj[INCREMENT_COUNTER] = incrementCounter  equalivaent. 
    [DECREMENT_COUNTER] : decrementCounter,
    [COUNTER_ACTION_STARTED] : counterActionStarted,
    [COUNTER_ACTION_FINISHED] : counterActionFinished
});

