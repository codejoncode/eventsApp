import { SubmissionError } from 'redux-form';
// import { SIGN_OUT_USER } from "./authConstants";
import { closeModal } from '../modals/modalActions';

export const login = creds => {
  return async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    try {
      await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
      dispatch(closeModal())
    } catch (error){
      console.log(error)
      throw new SubmissionError({
        _error: 'Login Failed : Incorrect credentials'
      })
    }

    

  }
};

export const registerUser = (user) => 
async (dispatch, getState, {getFirebase, getFirestore}) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    // create the user in firebase auth
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
    // update the auth profile
    await firebase.updateProfile({
      displayName: user.displayName
    })
    // create a new profile in firestore
    let newUser = {
      displayName: user.displayName,
      createdAt: firestore.FieldValue.serverTimestamp()
    }
    await firestore.set(`users/${createdUser.uid}`, {...newUser})
    dispatch(closeModal());
  } catch (error) {
    console.log(error)
    throw new SubmissionError({
      _error: error.message
    })
  }
}

export const socialLogin = (selectedProvider) => 
  async (dispatch, getSate, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {
      dispatch(closeModal()); // close modal because something different will open for the social login. 
      let user = await firebase.login({
        provider: selectedProvider,
        type: 'popup'
      })
      if(user.additionalUserInfo.isNewUser){
        await firestore.set(`users/${user.user.uid}`, {
          displayName: user.profile.displayName,
          photoURL : user.profile.avatarUrl, // may have to be photoUrl
          createdAt: firestore.FieldValue.serverTimestamp(),
        })
      }
    } catch (error){
      console.log(error)
    }
  }