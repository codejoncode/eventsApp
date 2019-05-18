export const userDetailedQuery = ({ auth, userUid }) => {
    if (userUid !== null){
        //get another profile 
        return [
            {
                collection: 'users', 
                doc: userUid,
                storeAs: 'profile'
            },
            {
                collection: 'users', 
                doc: userUid,
                subcollections: [{collection: 'photos'}],
                storeAs: 'photos'
            }
        ]
    } else {
        //get the profile logged in 
        return [
            {
              collection: "users",
              doc: auth.uid,
              subcollections: [{ collection: "photos" }],
              storeAs: "photos"
            }
          ]
    }
    
  };