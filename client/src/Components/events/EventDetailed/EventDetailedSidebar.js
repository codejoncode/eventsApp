import React from 'react'
import { Segment, List, Item, Label } from 'semantic-ui-react';

const EventDetailedSidebar  = ({attendees}) => {
 
  return (
       <div>
          <Segment
            textAlign="center"
            style={{ border: 'none' }}
            attached="top"
            secondary
            inverted
            color="teal"
          >
            {attendees && attendees.length} {attendees && attendees.length === 1 ? 'Person' : 'People'} Going
          </Segment>
          <Segment attached>
            <List relaxed divided>
              {attendees && attendees.map((attendee) => (
              <Item key = {attendee.id} style={{ position: 'relative' }}>
                {attendee.host && 
                <Label
                  style={{ position: 'absolute' }}
                  color="orange"
                  ribbon="right"
                >
                  Host
                </Label>}
                <Item.Image size="tiny" src={attendee.photoUrl || attendee.photoURL} />
                <Item.Content verticalAlign="middle">
                  <Item.Header as="h3">
                     {/* /events added just to take away warning likely will point to the users profile */}
                    <a href="/events">{attendee.name || attendee.displayName}</a>
                  </Item.Header>
                </Item.Content>
              </Item>

              ))}
            </List>
          </Segment>
        </div>
  )
}

export default EventDetailedSidebar 
