import moment from 'moment'; 
import { toastr } from 'react-redux-toastr';
export const updateProfile = (user) => 
  async(dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
      if(user.dateOfBirth){
          //convert into a javascript date.  
          user.dateOfBirth = moment(user.dateOfBirth).toDate(); 
      }

      try {
        await firebase.updateProfile(user); 
        toastr.success('Success', 'Profile updated!')
      } catch (error) {
          console.log(error); 
      }
  }

//No need for a reducer we will use firebase and its created  consts and reducers. 