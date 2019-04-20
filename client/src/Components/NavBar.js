import React, { Component } from "react";
import { Menu, Button, Container } from "semantic-ui-react";
import {NavLink, Link } from 'react-router-dom'; 


class NavBar extends Component {
  state = {};

  render() {
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item header>
            <img src="assets/users.png" alt="logo" />
            Re-Events
          </Menu.Item>
          <Menu.Item as = {NavLink} to ='/events' name="Events" />
          <Menu.Item as = {NavLink} to ='/people' name="People" />
          <Menu.Item>
            <Button floated="right" positive inverted content="Create Event" />
          </Menu.Item>
          <Menu.Item position="right">
            <Button basic inverted content="Login" />
            <Button
              basic
              inverted
              content="Sign Up"
              style={{ marginLeft: "0.5em" }}
            />
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

export default NavBar;
