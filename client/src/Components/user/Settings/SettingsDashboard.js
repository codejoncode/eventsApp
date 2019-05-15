import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import { Switch, Route, Redirect } from "react-router-dom";

import SettingsNav from "./SettingsNav";
import AboutPage from "./AboutPage";
import BasicPage from "./BasicPage";
import PhotosPage from "./PhotosPage";
import AccountPage from "./AccountPage";
import { updatePassword } from "../../auth/authActions";
import { updateProfile } from "../../user/userActions";

const actions = {
  updatePassword,
  updateProfile
};

const mapState = state => ({
  //only do this if the user is authenticated / loaded state.firebase.auth.isLoaded &&
  providerId: state.firebase.auth.providerData[0].providerId, // whether its  google or facebook or a regular user logging it outside of social meida
  user: state.firebase.profile
});

class SettingsDashboard extends Component {
  
  render () {
    const {
      updatePassword,
      providerId,
      user,
      updateProfile
    } = this.props;
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/settings" to="settings/basic" />
          <Route
            path="/settings/basic"
            render={() => (
              <BasicPage updateProfile={updateProfile} initialValues={user} />
            )}
            // using initialValues because of the redux form's need.
          />
          <Route path="/settings/about" component={AboutPage} />
          <Route path="/settings/photos" component={PhotosPage} />
          <Route
            path="/settings/account"
            render={() => (
              <AccountPage
                updatePassword={updatePassword}
                providerId={providerId}
              />
            )}
          />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  );
};
}

export default connect(
  mapState,
  actions
)(SettingsDashboard);
