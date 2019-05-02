import React, { Component } from 'react'
import { Form, Label } from 'semantic-ui-react';
import Script from 'react-load-script';
import PlacesAutocomplete from 'react-places-autocomplete';


class PlaceInput extends Component {
  state = {
    scriptLoaded: false, 

  }

  handleScriptLoaded = () => this.setState({scriptLoaded: true});

  handleError = (status, clearSuggestions) => {
    console.log('Google Maps API returned error with status: ', status)
    clearSuggestions()
  } 

  render() {
    const {input, width, onSelect, placeholder, options, meta: {touched, error}} = this.props; 
    return (
      <Form.Field error={touched && !!error} width = {width}>
        <Script 
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyA6o5Cp00yTK6-uI1_26PHJ0PhHBHb5RPY&libraries=places"
          onLoad={this.handleScriptLoaded}
        />
        {this.state.scriptLoaded && 
        <PlacesAutocomplete 
          inputProps={{...input, placeholder}}
          options={options}
          onSelect={onSelect}
          clearItemsOnError={true}
          onError = {this.handleError}
        />}
        {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
      </Form.Field>
    )
  }
}
export default PlaceInput;