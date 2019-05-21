import React, {Component} from "react";
import { Segment, Header, Comment, Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import distanceInWords from "date-fns/distance_in_words";
import userImage from "../../../Images/user.png";
import EventDetailedChatForm from "./EventDetailedChatForm";

class EventDetailedChat extends Component {
  render() {
    const { addEventComment, eventId, eventChat } = this.props; 

  return (
    <div>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>

      <Segment attached>
        {eventChat &&
          eventChat.map(comment => (
            <Comment.Group key={comment.id}>
              <Comment>
                <Comment.Avatar src={comment.photoURL} />
                <Comment.Content>
                  <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                    {comment.displayName}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>{distanceInWords(comment.date, Date.now())}</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.text}</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>
          ))}
        <EventDetailedChatForm
          addEventComment={addEventComment}
          eventId={eventId}
        />
      </Segment>
    </div>
  );
};
}

export default EventDetailedChat;
