import moment from 'moment'; 
import imageObject from '../../../Images/imagesObject';

export const createNewEvent = (user, photoURL, event) => {
  event.date = moment(event.date).toDate();
  return {
      ...event,
      hostUid: user.uid,
      hostedBy: user.displayName,
      hostPhotoURL: photoURL || imageObject.user,
      created: Date.now(),
      attendees: {
          [user.uid] : {
              going: true,
              joinDate: Date.now(),
              photoURL: photoURL || imageObject.user,
              displayName: user.displayName,
              host: true
          }
      }
  }
}