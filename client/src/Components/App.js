import React, { Component } from "react";
import "../Styles/App.css";
import { Container } from "semantic-ui-react";
import { Route } from 'react-router-dom';
import EventDashboard from "../Components/events/EventDashboard/EventDashboard.js";
import NavBar from "./NavBar";
import UserDetailedPage from "./user/UserDetailed/UserDetailedPage";
import PeopleDashboard from "./user/PeopleDashboard/PeopleDashboard";
import SettingsDashboard from "./user/Settings/SettingsDashboard";
import EventDetailedPage from "./user/UserDetailed/UserDetailedPage";
import HomePage from "./home/HomePage";
import EventForm from "./events/EventForm/EventForm";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container className="main">
        <Route path='/' component={HomePage}/>
          <Route path='/events' component={EventDashboard}/>
          <Route path='/event/:id' component={EventDetailedPage}/>
          <Route path='/people' component={PeopleDashboard}/>
          <Route path='/profile/:id' component={UserDetailedPage}/>
          <Route path='/settings' component={SettingsDashboard}/>
          <Route path='/createEvent' component={EventForm}/>

        </Container>
      </div>
    );
  }
}

export default App;
