import React from "react";
import moment from "moment";
import { Grid, Header } from "semantic-ui-react";

const UserDetailedAboutInfo = ({ profile }) => {
    let memberSince = null; 
    if (profile.createdAt) {
        memberSince = moment(profile.createdAt, 'X')
    }
    console.log(moment(memberSince))
    // console.log(profile.createdAt.seconds)
  return (
    <Grid.Column width={10}>
      <Header icon="smile" content={`About ${profile.displayName}`} />
      <p>
        I am a: <strong>{profile.occupation}</strong>
      </p>
      <p>
        Originally from <strong>{profile.origin}</strong>
      </p>
      <p>
        Member Since: <strong></strong>
        {/* profile.createdAt ? memberSince._d : null */}
      </p>
      <p>{`Description: ${profile.about}`}</p>
    </Grid.Column>
  );
};

export default UserDetailedAboutInfo;
