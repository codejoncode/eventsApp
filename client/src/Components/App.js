import React, { Component } from "react";
import "../Styles/App.css";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import EventDashboard from "../Components/events/EventDashboard/EventDashboard.js";
import NavBar from "./NavBar";
import UserDetailedPage from "./user/UserDetailed/UserDetailedPage";
import PeopleDashboard from "./user/PeopleDashboard/PeopleDashboard";
import SettingsDashboard from "./user/Settings/SettingsDashboard";
import EventDetailedPage from "../Components/events/EventDetailed/EventDetailedPage";
import HomePage from "./home/HomePage";
import EventForm from "./events/EventForm/EventForm";
import TestComponent from "./TestComponent";
import ModalManager from "../Components/modals/ModalManager";
import { UserIsAuthenticated } from "../Components/auth/authWrapper";//Higher Ordered Component
import NotFound from "./layout/NotFound";

class App extends Component {
  render() {
    return (
      <div>
        <ModalManager />
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
        {/* Search for something other than just the / statement. This will keep the Nav bar off of the home page*/}
        <Route
          path="/(.+)"
          render={() => (
            <div>
              <NavBar />
              <Container className="main">
                <Switch>
                  <Route path="/events" component={EventDashboard} />
                  <Route path="/test" component={TestComponent} />
                  <Route path="/event/:id" component={EventDetailedPage} />
                  <Route path="/manage/:id" component={UserIsAuthenticated(EventForm)} />
                  <Route path="/people" component={UserIsAuthenticated(PeopleDashboard)} />
                  <Route path="/profile/:id" component={UserIsAuthenticated(UserDetailedPage)} />
                  <Route path="/settings" component={UserIsAuthenticated(SettingsDashboard)} />
                  <Route path="/createEvent" component={UserIsAuthenticated(EventForm)} />
                  <Route path="/error" component={NotFound} />
                  <Route path="/:id" component={HomePage} />
                  
                </Switch>
              </Container>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
