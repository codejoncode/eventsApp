import React, { Component } from "react";
import { Segment, Item, List, Icon, Button, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import EventListAttendee from "./EventListAttendee";

class EventListItem extends Component {
  state = {};

  render() {
    const { event, deleteEvent } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header as="a">{event.title}</Item.Header>
                <Item.Description>
                  {/* only added for now likely to link to that users profile */}
                  Hosted by <a href="/events">{event.hostedBy}</a>
                </Item.Description>
                {event.cancelled && (
                  <Label
                    style={{ top: "-40px" }}
                    ribbon="right"
                    color="red"
                    content="This event has been cancelled"
                  />
                )}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            {/* {' ' } just gives an extra space */}
            <Icon name="clock" /> {format(event.date.toDate(), "dddd Do MMMM")}{" "}
            at {format(event.date.toDate(), "HH:mm")} |
            <Icon name="marker" /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {/* have to turn an object into something we can use map() with */}
            {event.attendees &&
              Object.values(event.attendees).map((attendee, id) => (
                <EventListAttendee key={id} attendee={attendee} />
              ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>

          <Button
            onClick={deleteEvent(event.id)}
            as="a"
            color="red"
            floated="right"
            content="Delete"
          />
          <Button
            as={Link}
            to={`/event/${event.id}`}
            color="teal"
            floated="right"
            content="View"
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
