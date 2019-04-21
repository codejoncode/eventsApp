import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button} from 'semantic-ui-react'
import {incrementCounter, decrementCounter} from '../Components/testarea/testActions';

const mapStateToProps = (state) => ({
    data: state.test.data
});

//mapDispatchToActions   
// will be passed down to props
const actions = {
    incrementCounter, 
    decrementCounter
}

class TestComponent extends Component {
    
    render () {
        const {incrementCounter, decrementCounter, data} = this.props;
        return (
            <div>
                <h1>Test</h1>
                <h3>{data}</h3>
                <Button onClick={incrementCounter} color='green' content= 'Increment'/>
                <Button onClick={decrementCounter} color='red' content= 'Decrement'/>

            </div>
        )
    }
}



export default connect(mapStateToProps, actions)(TestComponent); 