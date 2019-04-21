import { createReducer } from '../../Components/common/util/reducerUtil';
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "../../Components/testarea/testConstants";

const initialState = {
    data: 42
}

export const incrementCounter = (state, payload) => {
  return {...state, data: state.data + 1}; 
}

export const decrementCounter = (state, payload) => {
  return {...state, data: state.data - 1};
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
    [DECREMENT_COUNTER] : decrementCounter
})