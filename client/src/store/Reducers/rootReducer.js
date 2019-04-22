import { combineReducers } from 'redux';
import testReducer from './testReducer';
import eventReducer from '../../Components/events/EventList/eventReducer';


const rootReducer = combineReducers({
    test: testReducer, // will be able to access testReducer using the name test. 
    events: eventReducer,
});

export default rootReducer; 
