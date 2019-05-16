import React from "react";
import moment from "moment";
import { Grid, Header } from "semantic-ui-react";

const UserDetailedAboutInfo = ({ profile }) => {
  let memberSince = null;
  if (profile.createdAt) {
    memberSince = profile.createdAt.toDate();
    memberSince = moment(memberSince).format("YYYY-MM-DD");
  }

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
        Member Since: <strong>{profile.createdAt ? memberSince : null}</strong>
        {/* profile.createdAt ? memberSince._d : null */}
      </p>
      <p>{`Description: ${profile.about}`}</p>
    </Grid.Column>
  );
};

export default UserDetailedAboutInfo;
