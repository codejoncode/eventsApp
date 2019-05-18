import React from "react";
import { Segment, Image, Item, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import imagesObject from "../../../Images/imagesObject";

const eventImageStyle = {
  filter: "brightness(30%)"
};

const eventImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white"
};

const EventDetailedHeader = ({ event, isHost, isGoing }) => {
  const chosenCategory =
    event.category && event.category[0] ? event.category[0] : "culture";
  let eventDate;
  if (event.date) {
    eventDate = event.date.toDate();
  }
  return (
    <div>
      <Segment.Group>
        <Segment basic attached="top" style={{ padding: "0" }}>
          <Image
            src={imagesObject[chosenCategory]}
            fluid
            style={eventImageStyle}
          />

          <Segment basic style={eventImageTextStyle}>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size="huge"
                    content={event.title}
                    style={{ color: "white" }}
                  />
                  <p>
                    {event.date ? format(eventDate, "dddd, Do MMMM") : null}
                  </p>
                  <p>
                    Hosted by <strong>{event.hostedBy}</strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>

        <Segment attached="bottom">
          {!isHost && (
            <div>
              {isGoing ? (
                <Button>Cancel My Place</Button>
              ) : (
                <Button color="teal">JOIN THIS EVENT</Button>
              )}
            </div>
          )}

          {isHost && (
            <Button
              as={Link}
              to={`/manage/${event.id}`}
              color="orange"
              // floated="right"
            >
              Manage Event
            </Button>
          )}
        </Segment>
      </Segment.Group>
    </div>
  );
};

export default EventDetailedHeader;
