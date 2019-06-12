import React, { Component } from "react";
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Menu, Button, Container, Image } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
// import logo from "../Images/users.png";
import logo from "../Images/navLogo.PNG";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";
import { openModal } from '../Components/modals/modalActions';

const actions = {
  openModal,

}

const mapState = (state) => ({
  auth : state.firebase.auth,
  profile: state.firebase.profile
});

class NavBar extends Component {


  handleSignedIn = () => {
    this.props.openModal('LoginModal');
  };

  handleRegister = () => {
    this.props.openModal('RegisterModal');
  }

  handleSignedOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/'); // redirect back to home page
  };

  render() {
    const { auth, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/" header>
            <Image src={logo} alt="logo" size = "small"/>
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" name="Events" />
          
          {authenticated && 
          <Menu.Item as={NavLink} to="/people" name="People" />}
          {authenticated &&
          <Menu.Item>
            <Button
              as={Link}
              to="/createEvent"
              floated="right"
              positive
              inverted
              content="Create Event"
            />
          </Menu.Item>}
          {authenticated ? (
            <SignedInMenu auth = {auth} profile= {profile} signOut={this.handleSignedOut} />
          ) : (
            <SignedOutMenu signIn={this.handleSignedIn} register={this.handleRegister}/>
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));//higher ordered component  
