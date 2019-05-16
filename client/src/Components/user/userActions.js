import moment from "moment";
import { toastr } from "react-redux-toastr";
import cuid from "cuid";

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
    return await firestore.add(
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
  } catch (error) {
    console.log(error);
    throw new Error("Problem uploading photo");
  }
};

//No need for a reducer we will use firebase and its created  consts and reducers.
