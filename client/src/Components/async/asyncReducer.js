import { createReducer } from "../common/util/reducerUtil";
import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR
} from "./asyncConstants";

const initialState = {
  loading: false
};

export const asyncActionStarted = state => {
  return { ...state, loading: true };
};

export const asyncActionFinshed = state => {
  return { ...state, loading: false };
};

export const asyncActionError = state => {
  return { ...state, loading: false };
};

export default createReducer(initialState, {
  [ASYNC_ACTION_START]: asyncActionStarted,
  [ASYNC_ACTION_FINISH]: asyncActionFinshed,
  [ASYNC_ACTION_ERROR]: asyncActionError
});
