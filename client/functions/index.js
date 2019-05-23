const functions = require("firebase-functions");
//full rights to the application no need to worry about permissions
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const newActivity = (type, event, id) => {
  return {
    type: type,
    eventDate: event.date,
    hostedBy: event.hostedBy,
    title: event.title,
    photoURL: event.hostPhotoURL,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    hostUid: event.hostUid,
    eventId: id
  };
};

exports.createActivity = functions.firestore
  .document("events/{eventId}")
  .onCreate(event => {
    let newEvent = event.data(); //provides the event document that is being created.

    console.log(newEvent);

    const activity = newActivity("newEvent", newEvent, event.id);

    console.log(activity);

    return admin
      .firestore()
      .collection("activity")
      .add(activity)
      .then(docRef => {
        return console.log("Activity created with ID: ", docRef.id);
      })
      .catch(error => {
        return console.log("Error adding activity", error);
      });
  });

exports.cancelActivity = functions.firestore
  .document("events/{eventId}")
  .onUpdate((event, context) => {
    let updatedEvent = event.after.data(); // before and after query snapshots
    let previousEventData = event.before.data();
    console.log({ event });
    console.log({ context });
    console.log({ updatedEvent });
    console.log({ previousEventData });

    if (
      !updatedEvent.cancelled ||
      updatedEvent.cancelled === previousEventData.cancelled
    )
      return false;

    const activity = newActivity(
      "cancelledEvent",
      updatedEvent,
      context.params.eventId
    ); // gives access to {eventId} at the top

    console.log({ activity });

    return admin
      .firestore()
      .collection("activity")
      .add(activity)
      .then(docRef => {
        return console.log("Activity created with ID: ", docRef.id);
      })
      .catch(error => {
        return console.log("Error adding activity", error);
      });
  });

exports.userFollowing = functions.firestore 
  .document('users/{followerUid}/following/{followingUid}') // in the users  the current user followerUid  and following is the collection of who we want to follow which is followingUid
  .onCreate((event, context) => {
    console.log("version 1");
    const followerUid = context.params.followerUid;
    const followingUid = context.params.followingUid;

    const followerDoc = admin
      .firestore()
      .collection('users')
      .doc(followerUid);

      console.log(followerDoc);

      return followerDoc.get().then(doc => {
        let userData = doc.data();
        console.log({ userData });
        let follower = {
          displayName: userData.displayName,
          photoURL: userData.photoURL || '../src/Images/user.png',
          city: userData.city || 'unknown city'
        };
        return admin
          .firestore()
          .collection('users')
          .doc(followingUid)
          .collection('followers')
          .doc(followerUid)
          .set(follower);
      });
  });

exports.unfollowUser = functions.firestore
  .document('users/{followerUid}/following/{followingUid}')
  .onDelete((event, context) => {
    return admin
      .firestore()
      .collection('users')
      .doc(context.params.followingUid) // one we want to delete
      .collection('followers')
      .doc(context.params.followerUid)
      .delete()
      .then(() => {
        return console.log('doc deleted');
      })
      .catch(err => {
        return console.log(err);
      })
  })