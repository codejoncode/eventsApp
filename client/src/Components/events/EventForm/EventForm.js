import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import cuid from "cuid";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { createEvent, updateEvent } from "../EventList/eventActions";
import defaultPhoto from "../../../Images/user.png";
import TextInput from "../../common/form/TextInput";
import TextArea from "../../common/form/TextArea";
import SelectInput from "../../common/form/SelectInput";

/* Because rooter properites are attched to the component as its own properities and not something we get from the store we can pass in a second property*/
const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};//Redux forms takes care of the property names needed for the event

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
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

class EventForm extends Component {

  onFormSubmit = values => {

    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: defaultPhoto,
        hostedBy: 'Jonathan'
      };
      this.props.createEvent(newEvent);
      this.props.history.push("/events");
    }
  };

  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color ='teal' content='Event Details'/>
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
                options = {category}
                multiple={true}
                placeholder="What is your event about?"
              />
              <Field
                name="description"
                type="text"
                rows = {3}
                component={TextArea}
                placeholder="Tell us about your event"
              />

              <Header sub color ='teal' content = 'Event Location Details'/>
              <Field
                name="city"
                type="text"
                component={TextInput}
                placeholder="What city is your event located?"
              />
              <Field
                name="venue"
                type="text"
                component={TextInput}
                placeholder="What venue will you use for this event?"
              />
              <Field
                name="date"
                type="text"
                component={TextInput}
                placeholder="On what date will you have this event?"
              />
              <Button positive type="submit">
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
)(reduxForm({ form: "eventForm", enableReinitialize: true })(EventForm));
