import moment from "moment";
import { toastr } from "react-redux-toastr";
import cuid from "cuid";
import {
  asynActionError,
  asyncActionFinish,
  asyncActionStart
} from "../async/asyncActions";
import imagesObject  from '../../Images/imagesObject';

export const updateProfile = user => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  //same as the loadAsh omit
  const { isLoaded, isEmpty, ...updatedUser } = user; //updatedUser will be everything except for isLoaded and isEmpty.
  if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
    //convert into a javascript date.  only if they are different than what's on state.
    updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
  }

  try {
    await firebase.updateProfile(updatedUser);
    toastr.success("Success", "Profile updated!");
  } catch (error) {
    console.log(error);
  }
};

export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const imageName = cuid();
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const path = `${user.uid}/user_images`;
  const options = {
    name: imageName
  };

  try {
    dispatch(asyncActionStart);
    // upload the file to firebase storage
    let uploadedFile = await firebase.uploadFile(path, file, null, options);
    // get url of image
    let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
    // get userdoc from firestore
    let userDoc = await firestore.get(`users/${user.uid}`);
    // check if user has photo, if not update profile with new image
    if (!userDoc.data().photoURL) {
      //update firestore document
      await firebase.updateProfile({
        photoURL: downloadURL
      });
      //update the profile inside of firebase authentication
      await user.updateProfile({
        photoURL: downloadURL
      });
    }
    // add the new phto as a new image in photo collection
    await firestore.add(
      {
        collection: "users",
        doc: user.uid,
        subcollections: [{ collection: "photos" }]
      },
      {
        name: imageName,
        url: downloadURL
      }
    );
    dispatch(asyncActionFinish);
  } catch (error) {
    console.log(error);
    dispatch(asynActionError);
    throw new Error("Problem uploading photo");
  }
};

export const deletePhoto = photo => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  try {
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
    await firestore.delete({
      collection: "users",
      doc: user.uid,
      subcollections: [{ collection: "photos", doc: photo.id }]
    });
  } catch (error) {
    console.log(error);
    throw new Error("Problem deleting the photo");
  }
};

export const setMainPhoto = photo => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  try {
    return await firebase.updateProfile({
      photoURL: photo.url
    });
  } catch (error) {
    console.log(error);
    throw new Error("Problem setting main photo");
  }
};

export const goingToEvent = event => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const user = firestore.auth().currentUser;
  const photoURL = getState().firebase.profile.photoURL;
  const displayName = getState().firebase.profile.displayName;
  const attendee = {
    going: true,
    joinDate: Date.now(),
    photoURL : photoURL || imagesObject.user,
    displayName: displayName,
    host: false
  };
  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: attendee
    });
    //look up data to query later
    await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
      eventId: event.id,
      userUid: user.uid,
      eventDate: event.date,
      host: false
    });
    toastr.success("Success", "You have signed up to the event");
  } catch (error) {
    console.log(error);
    toastr.error("Sorry", "Problem signing up to the event");
  }
};

export const cancelGoingToEvent = event => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const user = firestore.auth().currentUser;
  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: firestore.FieldValue.delete()
    });
    //remove from lookup
    await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
    toastr.success("Success", "You have removed yourself from the event");
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Something went wrong");
  }
};

//No need for a reducer we will use firebase and its created  consts and reducers.