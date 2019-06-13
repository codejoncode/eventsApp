import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Header } from "semantic-ui-react";
import {
  incrementAsync,
  decrementAsync,
  testPermission
} from "../Components/testarea/testActions";
import Script from "react-load-script";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { openModal } from "../Components/modals/modalActions";
import { toastr } from "react-redux-toastr";
import firebase from "../config/firebase";

import imagesObject from "../Images/imagesObject";

const mapStateToProps = state => ({
  data: state.test.data,
  loading: state.test.loading
});

//mapDispatchToActions
// will be passed down to props
const actions = {
  incrementAsync,
  decrementAsync,
  openModal,
  testPermission
};

//
class TestComponent extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  state = {
    addresss: "",
    scriptLoaded: false
  };

  handleFormSubmit = event => {
    event.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
  };
  onChange = address => this.setState({ address });

  handleScriptLoaded = () => {
    this.setState({ scriptLoaded: true });
  };

  handleTestUpdateProfile = async () => {
    const firestore = firebase.firestore();
    // doc = diana's userUid
    let userDocRef = await firestore
      .collection("users")
      .doc("cEEFBRyUnAP6qU22mmJNFvGZEed2");
    try {
      await userDocRef.update({ displayName: "testing" });
      toastr.success("Success");
    } catch (error) {
      console.log(error);
      toastr.error("Computer says no");
    }
  };

  handleCreateTestEvent = async () => {
    const firestore = firebase.firestore();
    let eventDocRef = await firestore.collection("events").doc("DELETEME");
    try {
      await eventDocRef.set({
        title: "DELETEME"
      });
      toastr.success("Success");
    } catch (error) {
      console.log(error);
      toastr.error("Computer says no");
    }
  };

  handleTestJoinEvent = async () => {
    const firestore = firebase.firestore();
    let eventDocRef = await firestore.collection("events").doc("DELETEME");
    const attendee = {
      photoURL: imagesObject.user,
      displayName: "Testing"
    };
    try {
      await eventDocRef.update({
        [`attendees.cEEFBRyUnAP6qU22mmJNFvGZEed2`]: attendee
      });
      toastr.success("Success");
    } catch (error) {
      console.log(error);
      toastr.error("Computer says no");
    }
  };

  handleTestCancelGoingToEvent = async () => {
    const firestore = firebase.firestore();
    let eventDocRef = await firestore.collection("events").doc("DELETEME");
    try {
      await eventDocRef.update({
        [`attendees.cEEFBRyUnAP6qU22mmJNFvGZEed2`]: firebase.firestore.FieldValue.delete()
      });
      toastr.success("Success");
    } catch (error) {
      console.log(error);
      toastr.error("Computer says no");
    }
  };

  handleTestChangeAttendeePhotoInEvent = async () => {
    const firestore = firebase.firestore();
    let eventDocRef = await firestore.collection("events").doc("DELETEME");
    try {
      await eventDocRef.update({
        [`attendees.cEEFBRyUnAP6qU22mmJNFvGZEed2.photoURL`]: "testing123.jpg"
      });
      toastr.success("Success");
    } catch (error) {
      console.log(error);
      toastr.error("Computer says no");
    }
  };

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    };
    const {
      incrementAsync,
      decrementAsync,
      data,
      openModal,
      loading,
      testPermission
    } = this.props;
    return (
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyA6o5Cp00yTK6-uI1_26PHJ0PhHBHb5RPY&libraries=places"
          onLoad={this.handleScriptLoaded}
        />
        <h1>Test</h1>
        <h3>{data}</h3>
        <Button
          loading={loading}
          onClick={incrementAsync}
          color="green"
          content="Increment"
        />
        <Button
          loading={loading}
          onClick={decrementAsync}
          color="red"
          content="Decrement"
        />
        <Button
          onClick={() => openModal("TestModal", { data: 43 })}
          color="teal"
          content="Open Modal"
        />
        <br />
        <br />
        <Header as="h2" content="Permissions tests" />
        <Button
          onClick={this.handleCreateTestEvent}
          color="blue"
          fluid
          content="Test create event - should fail if anon"
        />
        <Button
          onClick={this.handleTestUpdateProfile}
          color="orange"
          fluid
          content="Test update jonathans profile - should fail if anon/not jonathan - should succeed if jonathan"
        />
        <Button
          onClick={this.handleTestJoinEvent}
          color="olive"
          fluid
          content="Test joining an event - should fail if anon/not jonathan - should succeed if jonathan"
        />
        <Button
          onClick={this.handleTestCancelGoingToEvent}
          color="purple"
          fluid
          content="Test cancelling attendance to an event - should fail if anon/not jonathan - should succeed if jonathan"
        />
        <Button
          onClick={this.handleTestChangeAttendeePhotoInEvent}
          color="violet"
          fluid
          content="Test changing photo for event attendee - should fail if anon/not jonathan - should succeed if jonathan"
        />
        <br />
        <br />
        <Button
          onClick={testPermission}
          color="teal"
          content="Test Permission"
        />
        <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoaded && (
            <PlacesAutocomplete inputProps={inputProps} />
          )}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(TestComponent);
