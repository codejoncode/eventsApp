import { combineReducers } from 'redux';
import testReducer from './testReducer';


const rootReducer = combineReducers({
    test: testReducer // will be able to access testReducer using the name test. 
});

export default rootReducer; 
