import React from 'react';
import {Card, Image} from "semantic-ui-react";
import {Link} from 'react-router-dom';
import imageObject from '../../../Images/imagesObject'
const PersonCard = ({user}) => {
    return (
        <Card as={Link} to='/profile/12'>
            <Image src={imageObject.user} />
            <Card.Content textAlign='center'>
                <Card.Header content='Display Name'/>
            </Card.Content>
            <Card.Meta textAlign='center'>
                <span>City</span>
            </Card.Meta>
        </Card>
    );
};

export default PersonCard;