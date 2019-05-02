import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button} from 'semantic-ui-react'
import {incrementCounter, decrementCounter} from '../Components/testarea/testActions';
import Script from 'react-load-script'; 
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
const mapStateToProps = (state) => ({
    data: state.test.data
});

//mapDispatchToActions   
// will be passed down to props
const actions = {
    incrementCounter, 
    decrementCounter
}
// 
class TestComponent extends Component {
    state ={
      addresss : '',
      scriptLoaded: false
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
    
        geocodeByAddress(this.state.address)
          .then(results => getLatLng(results[0]))
          .then(latLng => console.log('Success', latLng))
          .catch(error => console.error('Error', error))
      }
    onChange = (address) => this.setState({address})
    
    handleScriptLoaded = () => {
        this.setState({scriptLoaded: true})
    }
    render () {
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
          }
        const {incrementCounter, decrementCounter, data} = this.props;
        return (
            <div>
                <Script 
                  url= "https://maps.googleapis.com/maps/api/js?key=AIzaSyA6o5Cp00yTK6-uI1_26PHJ0PhHBHb5RPY&libraries=places"
                  onLoad={this.handleScriptLoaded}
                />
                <h1>Test</h1>
                <h3>{data}</h3>
                <Button onClick={incrementCounter} color='green' content= 'Increment'/>
                <Button onClick={decrementCounter} color='red' content= 'Decrement'/>
                <form onSubmit={this.handleFormSubmit}>
                  {this.state.scriptLoaded &&   
                    <PlacesAutocomplete inputProps={inputProps} />}
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}



export default connect(mapStateToProps, actions)(TestComponent); 