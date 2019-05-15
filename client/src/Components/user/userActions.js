import moment from 'moment'; 
import { toastr } from 'react-redux-toastr';
export const updateProfile = (user) => 
  async(dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
      //same as the loadAsh omit
      const {isLoaded, isEmpty, ...updatedUser} = user; //updatedUser will be everything except for isLoaded and isEmpty. 
      if(updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth){
          //convert into a javascript date.  only if they are different than what's on state. 
          updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate(); 
      }

      try {
        await firebase.updateProfile(updatedUser); 
        toastr.success('Success', 'Profile updated!')
      } catch (error) {
          console.log(error); 
      }
  }

//No need for a reducer we will use firebase and its created  consts and reducers. 