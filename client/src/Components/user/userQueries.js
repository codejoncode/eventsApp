export const userDetailedQuery = ({ auth, userUid, match }) => {
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
            },
            {
                collection: 'users',
                doc: auth.uid, //user logged in looking at another profile
                subcollections: [{collection: 'following', doc: match.params.id}],
                storeAs: 'following'
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