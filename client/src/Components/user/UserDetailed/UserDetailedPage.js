import React, { Component } from "react";
import { connect } from "react-redux";
import { toastr } from 'react-redux-toastr'
import { firestoreConnect, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import { Grid, Segment } from "semantic-ui-react";
import UserDetailedHeader from "./UserDetailedHeader";
import UserDetailedAboutInfo from "./UserDetailedAboutInfo";
import UserDetailedInterests from "./UserDetailedInterests";
import UserDetailedPhotos from "./UserDetailedPhotos";
import UserDetailedEvents from "./UserDetailedEvents";
import { userDetailedQuery } from "../userQueries";
import UserDetailedSidebar from "./UserDetailedSidebar";
import LoadingComponent from '../../layout/LoadingComponent';
import { getUserEvents, followUser, unfollowUser } from "../userActions";

const mapState = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile;
  } else {
    //profile for the other user not logged in
    profile =
      !isEmpty(state.firestore.ordered.profile) &&
      state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }
  return {
    auth: state.firebase.auth,
    userUid,
    profile,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting,
    events: state.events.userEvents,
    eventsLoading: state.async.loading,
    following: state.firestore.ordered.following,
    loading : state.async.loading,
  };
};

const actions = {
  getUserEvents,
  followUser,
  unfollowUser,
};

class UserDetailedPage extends Component {
  async componentDidMount() {
    let user = await this.props.firestore.get(`users/${this.props.match.params.id}`); 
    if(!user.exists){
      toastr.error('Not Found', "User doesn't exist")
      this.props.history.push('/error');
    }
    await this.props.getUserEvents(this.props.userUid);
  }

  changeTab = (e, data) => {
    this.props.getUserEvents(this.props.userUid, data.activeIndex);
  };

  render() {
    const {
      profile,
      photos,
      auth,
      match,
      events,
      eventsLoading,
      followUser,
      following, 
      unfollowUser,
      requesting
    } = this.props; 
    const isCurrentUser = auth.uid === match.params.id;
    const isFollowing = !isEmpty(following);
    
    
    const loading = requesting[`users/${match.params.id}`]

    if ( loading ) return <LoadingComponent  inverted={true}/>

    return (
      <Grid>
        <UserDetailedHeader profile={profile} />
        <Grid.Column width={12}>
          <Segment>
            <Grid columns={2}>
              <UserDetailedAboutInfo profile={profile} />
              <UserDetailedInterests profile={profile} />
            </Grid>
          </Segment>
        </Grid.Column>
        <UserDetailedSidebar
          isFollowing={isFollowing}
          isCurrentUser={isCurrentUser}
          followUser={followUser}
          profile={profile}
          unfollowUser = {unfollowUser}
        />
        {photos && photos.length > 0 && <UserDetailedPhotos photos={photos} />}
        <UserDetailedEvents
          changeTab={this.changeTab}
          events={events}
          eventsLoading={eventsLoading}
        />
      </Grid>
    );
  }
}

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect((auth, userUid, match) =>
    userDetailedQuery(auth, userUid, match)
  )
)(UserDetailedPage);
