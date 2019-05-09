import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import { firebaseReducer} from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import testReducer from "./testReducer";
import eventReducer from "../../Components/events/EventList/eventReducer";
import modalReducer from "../../Components/modals/modalReducer";
import authReducer from "../../Components/auth/authReducer";
import asyncReducer from "../../Components/async/asyncReducer";
import { reducer as toastrReducer  } from 'react-redux-toastr';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  test: testReducer, // will be able to access testReducer using the name test.
  events: eventReducer,
  form: FormReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer,
  toastr: toastrReducer,
});

export default rootReducer;
