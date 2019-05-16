import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  List,
  Menu,
  Segment
} from "semantic-ui-react";
import differenceInYears from "date-fns/difference_in_years";
import imagesObject from "../../../Images/imagesObject";
import UserDetailedHeader from "./UserDetailedHeader";
import UserDetailedAboutInfo from "./UserDetailedAboutInfo";
import UserDetailedInterests from "./UserDetailedInterests";
import UserDetailedPhotos from "./UserDetailedPhotos";

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos,
  loading: state.async.loading
});

class UserDetailedPage extends Component {
  render() {
    const { auth, profile, photos, loading } = this.props;
    console.log(profile);
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
        <Grid.Column width={4}>
          <Segment>
            <Button color="teal" fluid basic content="Edit Profile" />
          </Segment>
        </Grid.Column>
        <UserDetailedPhotos photos={photos} />

        <Grid.Column width={12}>
          <Segment attached>
            <Header icon="calendar" content="Events" />
            <Menu secondary pointing>
              <Menu.Item name="All Events" active />
              <Menu.Item name="Past Events" />
              <Menu.Item name="Future Events" />
              <Menu.Item name="Events Hosted" />
            </Menu>

            <Card.Group itemsPerRow={5}>
              <Card>
                <Image src={imagesObject.drinks} />
                <Card.Content>
                  <Card.Header textAlign="center">Event Title</Card.Header>
                  <Card.Meta textAlign="center">
                    28th March 2018 at 10:00 PM
                  </Card.Meta>
                </Card.Content>
              </Card>

              <Card>
                <Image src={imagesObject.drinks} />
                <Card.Content>
                  <Card.Header textAlign="center">Event Title</Card.Header>
                  <Card.Meta textAlign="center">
                    28th March 2018 at 10:00 PM
                  </Card.Meta>
                </Card.Content>
              </Card>
            </Card.Group>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  {}
)(UserDetailedPage);
