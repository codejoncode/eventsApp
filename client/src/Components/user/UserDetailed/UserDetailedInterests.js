import React from "react";
import { Grid, Header, List, Icon, Item } from "semantic-ui-react";

const UserDetailedInterests = ({ profile }) => {
  return (
    <Grid.Column width={6}>
      <Header icon="heart outline" content="Interests" />
      <List>
        {profile.interests &&
          profile.interests.map((interest, id) => (
            <Item key ={id}>
              <Icon name="heart" />
              <Item.Content>{interest}</Item.Content>
            </Item>
          ))}
      </List>
    </Grid.Column>
  );
};

export default UserDetailedInterests;
