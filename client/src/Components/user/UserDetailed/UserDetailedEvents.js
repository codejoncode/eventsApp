import React from "react";
import { Card, Grid, Header, Image, Segment, Tab} from "semantic-ui-react";
import { Link } from 'react-router-dom'
import imagesObject from "../../../Images/imagesObject";
import format from 'date-fns/format';

const panes = [
  {menuItem: 'All Events', pane: {key: 'allEvents'}},
  {menuItem: 'Past Events', pane: {key: 'pastEvents'}},
  {menuItem: 'Future Events', pane: {key: 'futureEvents'}},
  {menuItem: 'Hosting', pane: {key: 'hosted'}}
]

const UserDetailedEvents = ({events, eventsLoading, changeTab}) => {
  return (
    <Grid.Column width={12}>
      <Segment attached loading={eventsLoading}>
        <Header icon="calendar" content="Events" />
        <Tab onTabChange = {(event, data) => changeTab(event, data)} panes={panes} menu={{secondary: true, pointing: true}}/>
        <br/>
        {/* May want to change itemsPerRow depending on the size of the view port */}
        <Card.Group itemsPerRow={5}>
          {events && events.map((event) => (
            <Card as={Link} to={`/event/${event.id}`} key={event.id}>
              <Image src={imagesObject[event.category[0]]} />
              <Card.Content>
                <Card.Header textAlign="center">{event.title}</Card.Header>
                <Card.Meta textAlign="center">
                  <br/>
                  <div>{format(event.date && event.date.toDate(), 'DD MMM YYYY')}</div>
                  <div>{format(event.date && event.date.toDate(), 'h:mm A')}</div>
                </Card.Meta>
              </Card.Content>
            </Card>

          ))}

          
        </Card.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedEvents;
