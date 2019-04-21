import { createStore, applyMiddleware} from 'redux'
import rootReducer from '../store/Reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension'; 


export const configureStore = (preloadedState) => {
    const middlewares = []; 
    const middlewareEnhancer = applyMiddleware(...middlewares); 

    const storeEnhancers = [middlewareEnhancer];

    const composedEnhancer = composeWithDevTools(...storeEnhancers);

    const store = createStore(
        rootReducer, 
        preloadedState,
        composedEnhancer
    );

    //hot module replacement for reducers allows updates without a refresh. 

    if(process.env.NODE_ENV !== "production"){
        if (module.hot) {
            module.hot.accept("../store/Reducers/rootReducer", () => {
              const newRootReucer = require("../store/Reducers/rootReducer").default; 
              store.replaceReducer(newRootReucer); 
            })
        }
    }

    return store; 
}