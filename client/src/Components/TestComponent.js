import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button } from 'semantic-ui-react'
import {incrementAsync, decrementAsync, testPermission} from '../Components/testarea/testActions';
import Script from 'react-load-script'; 
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { openModal} from "../Components/modals/modalActions";
const mapStateToProps = (state) => ({
    data: state.test.data,
    loading: state.test.loading
});

//mapDispatchToActions   
// will be passed down to props
const actions = {
    incrementAsync, 
    decrementAsync,
    openModal,
    testPermission,
}


// 
class TestComponent extends Component {
    static defaultProps = {
        center: {
          lat: 59.95,
          lng: 30.33
        },
        zoom: 11
      };

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
        const {incrementAsync, decrementAsync, data, openModal, loading, testPermission} = this.props;
        return (
            <div>
                <Script 
                  url= "https://maps.googleapis.com/maps/api/js?key=AIzaSyA6o5Cp00yTK6-uI1_26PHJ0PhHBHb5RPY&libraries=places"
                  onLoad={this.handleScriptLoaded}
                />
                <h1>Test</h1>
                <h3>{data}</h3>
                <Button loading = {loading} onClick={incrementAsync} color='green' content= 'Increment'/>
                <Button loading = {loading} onClick={decrementAsync} color='red' content= 'Decrement'/>
                <Button onClick ={() => openModal('TestModal', {data: 43})} color = "teal" content = "Open Modal" /> 
                <Button onClick ={testPermission} color = "teal" content = "Test Permission" /> 
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