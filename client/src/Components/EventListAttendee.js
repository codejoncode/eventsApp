import React, { Component } from 'react';
import {List, Image} from 'semantic-ui-react';
import axios from 'axios';

class EventListAttendee extends Component {
    state = {}

    componentDidMount() {
        // this.getRandomUser();
    }

    getRandomUser = () => {
        /*This is just taking a look at the randomuser website this function may not be needed */
        const urls = ["https://randomuser.me/api/?gender=male", "https://randomuser.me/api/?gender=female"]
        const index = Math.floor(Math.random() * urls.length)
        const promise = axios.get(urls[index]);
        promise
            .then(response => {
                console.log(response);
            })
            . catch (error => {
                console.log(error.response)
            })
    }

    render (){
        const {attendee} = this.props; 
        console.log(attendee);
        // https://randomuser.me/api/portaits/women/42.jpg
        return (
            <List.Item >
                <Image as='a' size='mini' circular src={attendee.photoURL}/>
                                                        {/* https://randomuser.me/api/portaits/women/42.jpg */}
            </List.Item>
        )
    }
}

export default EventListAttendee; 