import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAi8qFj7TxsiIBRysWjRzKhhTimuWqwmjY",
    authDomain: "the-events-app.firebaseapp.com",
    databaseURL: "https://the-events-app.firebaseio.com",
    projectId: "the-events-app",
    storageBucket: "the-events-app.appspot.com",
    messagingSenderId: "1000549486898",
    appId: "1:1000549486898:web:7c020277d0d42ccc"
  };

firebase.initializeApp(firebaseConfig);
firebase.firestore();


/* using a couple of packages redux-firestore and react-redux-firebase 


redux-firestore gives us the ability and reducers and functionality to connect and use firestore 
but the bindings to connect the react application to firebase and firestore are contained within react-redux-firebase 

therefore both are required. 

allows for easy connect and disconnect when listening for data. 
*/

export default firebase; 
