import React, { Component } from "react";
import { Menu, Button, Container } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import logo from "../Images/users.png";
import SignedOutMenu from "../Menus/SignedOutMenu";
import SignedInMenu from "../Menus/SignedInMenu";

class NavBar extends Component {
  state = {
    authenticated: false
  };

  handleSignedIn = () => {
    this.setState({
      authenticated: true
    });
  };

  handleSignedOut = () => {
    this.setState({
      authenticated: false
    });
    this.props.history.push('/'); // redirect back to home page
  };

  render() {
    const { authenticated } = this.state;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/" header>
            <img src={logo} alt="logo" />
            Re-Events
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
            <SignedInMenu signOut={this.handleSignedOut} />
          ) : (
            <SignedOutMenu signIn={this.handleSignedIn} />
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(NavBar);//higher ordered component  
