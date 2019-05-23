import React from "react";
import { Button, Grid, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";


const UserDetailedSidebar = ({ isCurrentUser, followUser, profile, isFollowing, unfollowUser}) => {
  console.log(isCurrentUser, isFollowing)
  const buttonDisplayed = isCurrentUser || isFollowing;  // if its not the current user then thats false if not folowing thats false result is false returns false 
  //if we are following buttonDisplayed will equal true
  console.log(buttonDisplayed)
  return (
    <Grid.Column width={4}>
      <Segment>
        {isCurrentUser && (
          <Button
            as={Link}
            to="/settings"
            color="teal"
            fluid
            basic
            content="Edit Profile"
          />)}
         {!isCurrentUser && 
           !isFollowing &&
          <Button onClick = {() => followUser(profile)} color="teal" fluid basic content="Follow user" />
        }

        { !isCurrentUser && isFollowing &&
          <Button onClick = {() => unfollowUser(profile)} color="teal" fluid basic content = "Unfollow"/>
        }

      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedSidebar;
