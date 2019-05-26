/*global google*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { withFirestore } from 'react-redux-firebase';
import { reduxForm, Field } from "redux-form";
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Script  from "react-load-script"
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";

import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { createEvent, updateEvent, cancelToggle } from "../EventList/eventActions";
import TextInput from "../../common/form/TextInput";
import TextArea from "../../common/form/TextArea";
import SelectInput from "../../common/form/SelectInput";
import DateInput from "../../common/form/DateInput";
import PlaceInput from "../../common/form/PlaceInput";

/* Because rooter properites are attched to the component as its own properities and not something we get from the store we can pass in a second property*/
const mapState = (state) => {

  let event = {}; // an empty event will not thrown an error.
  
  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }
  //need to use key initialValues for the form. 
  return {
    initialValues: event,
    event,
    loading: state.async.loading
  };
};

const actions = {
  createEvent,
  updateEvent,
  cancelToggle,
};

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];

const validate = combineValidators({
  title: isRequired({ message: "The event title is required" }),
  category: isRequired({ message: "Please provide a category" }),
  description: composeValidators(
    isRequired({ message: "Please enter a description" }),
    hasLengthGreaterThan(9)({ message: "Description: needs to be at least 10" })
  )(),
  city: isRequired("city"),
  venue: isRequired("venue"),
  date: isRequired('date')
});

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  }
  async componentDidMount () {
    const {firestore, match} = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount () {
    /*this is will make it so that the listener is not still open once we leave the page */
    const {firestore, match} = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }
  
  handleCitySelect = (selectedCity) => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatLng: latlng
        })
      })
      .then(() => {
        this.props.change('city', selectedCity)
      })
  }

  handleVenueSelect = (selectedVenue) => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          venueLatLng: latlng
        })
      })
      .then(() => {
        this.props.change('venue', selectedVenue)
      })
  }

  onFormSubmit = async values => {
    values.venueLatLng = this.state.venueLatLng;
    if (this.props.initialValues.id) {
      if(Object.keys(values.venueLatLng).length === 0){
        values.venueLatLng = this.props.event.venueLatLng; 
      }
      await this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      
      this.props.createEvent(values);
      this.props.history.push("/events");
    }
  };


  handleScriptLoaded = () => this.setState({scriptLoaded: true});

  render() {
    const { invalid, submitting, pristine, event, cancelToggle, loading } = this.props;
    
    return (
      <Grid>
        <Script 
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyA6o5Cp00yTK6-uI1_26PHJ0PhHBHb5RPY&libraries=places"
          onLoad={this.handleScriptLoaded}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Give your event a name"
              />
              <Field
                name="category"
                type="text"
                component={SelectInput}
                options={category}
                multiple={true}
                placeholder="What is your event about?"
              />
              <Field
                name="description"
                type="text"
                rows={3}
                component={TextArea}
                placeholder="Tell us about your event"
              />

              <Header sub color="teal" content="Event Location Details" />
              <Field
                name="city"
                type="text"
                component={PlaceInput}
                options={{types: ['(cities)']}}
                placeholder="What city is your event located?"
                onSelect={this.handleCitySelect}
              />
              {this.state.scriptLoaded && 
              <Field
                name="venue"
                type="text"
                component={PlaceInput}
                options={{
                  location : new google.maps.LatLng(this.state.cityLatLng),
                  radius : 1000,
                  types: ['establishment']
                }}
                placeholder="What venue will you use for this event?"
                onSelect={this.handleVenueSelect}
              />
              }
              <Field
                name="date"
                type="text"
                component={DateInput}
                dateFormat="YYYY-MM-DD HH:mm"
                timeFormat='HH:mm'
                showTimeSelect
                placeholder="What is the date and time of the event?"
              />
              <Button
                loading= {loading}
                disabled={invalid || submitting || pristine}
                positive
                type="submit"
              >
                Submit
              </Button>
              <Button onClick={this.props.history.goBack} type="button">
                Cancel
              </Button>
              <Button
               disabled = {loading}
               onClick = {() => cancelToggle(!event.cancelled, event.id)}
               type='button'
               color={event.cancelled ? 'green' : 'red'}
               floated = 'right'
               content = {event.cancelled ? 'Reactivate Event' : 'Cancel event'}
              />
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
//adding in another higher order component
export default withFirestore(connect(
  mapState,
  actions
)(
  reduxForm({ form: "eventForm", enableReinitialize: true, validate })(
    EventForm
  ))
);
