import React, { Component } from "react";
import "../Styles/App.css";
import { Container } from "semantic-ui-react";
import EventDashboard from "./EventDashboard";
import NavBar from "./NavBar";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container className="main">
          <EventDashboard />
        </Container>
      </div>
    );
  }
}

export default App;
