import { createStore, applyMiddleware } from "redux";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";
import thunk from "redux-thunk";
import rootReducer from "../store/Reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import firebase from "../config/firebase";

const rrfConfig = {
  userProfile: "users",
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  updateProfileOnLogin: false
};

export const configureStore = preloadedState => {
  //normally would just add [thunk] but to use firebase and firestore get functions the withExtraArgument function allows for adding this in.
  const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const storeEnhancers = [middlewareEnhancer];

  const composedEnhancer = composeWithDevTools(
    ...storeEnhancers,
    reactReduxFirebase(firebase, rrfConfig),// firebase comes from what was created with the api keys etc.
    reduxFirestore(firebase)// firebase comes from what was created with the api keys etc. 
  );

  const store = createStore(rootReducer, preloadedState, composedEnhancer);

  //hot module replacement for reducers allows updates without a refresh.

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("../store/Reducers/rootReducer", () => {
        const newRootReucer = require("../store/Reducers/rootReducer").default;
        store.replaceReducer(newRootReucer);
      });
    }
  }

  return store;
};
