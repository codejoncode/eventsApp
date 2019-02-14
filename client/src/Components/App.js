import React, { Component } from 'react';
import '../Styles/App.css';
import EventDashboard from './EventDashboard';
import NavBar from './NavBar';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        
        <EventDashboard />
      </div>
    );
  }
}

export default App;

