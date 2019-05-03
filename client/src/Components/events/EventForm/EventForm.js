/*global google*/
import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { reduxForm, Field } from "redux-form";
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Script  from "react-load-script"
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";
import cuid from "cuid";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { createEvent, updateEvent } from "../EventList/eventActions";
import defaultPhoto from "../../../Images/user.png";
import TextInput from "../../common/form/TextInput";
import TextArea from "../../common/form/TextArea";
import SelectInput from "../../common/form/SelectInput";
import DateInput from "../../common/form/DateInput";
import PlaceInput from "../../common/form/PlaceInput";

/* Because rooter properites are attched to the component as its own properities and not something we get from the store we can pass in a second property*/
const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {}; //Redux forms takes care of the property names needed for the event

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0]; // filter returns an array
  }

  return {
    initialValues: event // will return the data for when a user clicks on manage event
  };
};

const actions = {
  createEvent,
  updateEvent
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

  onFormSubmit = values => {
    values.date = moment(values.date).format();
    values.venueLatLng = this.state.venueLatLng;
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: defaultPhoto,
        hostedBy: "Jonathan"
      };
      this.props.createEvent(newEvent);
      this.props.history.push("/events");
    }
  };
  handleScriptLoaded = () => this.setState({scriptLoaded: true});

  render() {
    const { invalid, submitting, pristine } = this.props;
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
                disabled={invalid || submitting || pristine}
                positive
                type="submit"
              >
                Submit
              </Button>
              <Button onClick={this.props.history.goBack} type="button">
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
//adding in another higher order component
export default connect(
  mapState,
  actions
)(
  reduxForm({ form: "eventForm", enableReinitialize: true, validate })(
    EventForm
  )
);
