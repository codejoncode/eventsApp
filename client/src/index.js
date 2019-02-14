import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';

/*Hot modules allows for updating without the application having to refresh 
 refresh manually if you have issues but most of the time you wont' need to refresh. 
*/
const rootElement = document.getElementById('root')

let render = () => {
    ReactDOM.render(<App />, rootElement)
}

if(module.hot){
    module.hot.accept('./Components/App', () => {
        setTimeout(render)
    })
}
render() 


// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
