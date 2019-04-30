import { combineReducers } from 'redux';
import { reducer as FormReducer} from 'redux-form';
import testReducer from './testReducer';
import eventReducer from '../../Components/events/EventList/eventReducer';


const rootReducer = combineReducers({
    test: testReducer, // will be able to access testReducer using the name test. 
    events: eventReducer,
    form : FormReducer,
});

export default rootReducer; 
