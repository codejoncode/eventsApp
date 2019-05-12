// import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import "semantic-ui-css/semantic.min.css";
import "../node_modules/react-redux-toastr/lib/css/react-redux-toastr.min.css";
import "./index.css";
import App from "./Components/App";
import * as serviceWorker from "./serviceWorker";
import { configureStore } from "./store/configureStore";
import ScrollToTop from "./Components/common/util/ScrollToTop";
// import { loadEvents } from '../src/Components/events/EventList/eventActions'

/*Hot modules allows for updating without the application having to refresh 
 refresh manually if you have issues but most of the time you wont' need to refresh. 
*/

const store = configureStore();
/*Want the events to load right when the application loads so use the store to dispatch and load the events */
// store.dispatch(loadEvents());

const rootElement = document.getElementById("root");

//https://github.com/diegoddox/react-redux-toastr
let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <ReduxToastr
            position="bottom-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
          />
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </Provider>,
    rootElement
  );
};

if (module.hot) {
  module.hot.accept("./Components/App", () => {
    setTimeout(render);
  });
}
/*Make render not take place until it has been authenicated by firebase */
store.firebaseAuthIsReady.then(() => {
  render(); 
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
