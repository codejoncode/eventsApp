import React, { Component } from "react";
import { Segment, Header, Comment, Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import distanceInWords from "date-fns/distance_in_words";
import userImage from "../../../Images/user.png";
import EventDetailedChatForm from "./EventDetailedChatForm";

class EventDetailedChat extends Component {
  state = {
    showReplyform: false,
    selectedCommentId: null
  };

  handleOpenReplyForm = (id) => () => {
    this.setState({
      showReplyForm: true, 
      selectedCommentId: id
    });
  };

  handleCloseReplyForm  = () => {
    this.setState({
      showReplyForm: false,
      selectedCommentId: null
    })
  }

  render() {
    const { addEventComment, eventId, eventChat } = this.props;
    const { showReplyForm, selectedCommentId } = this.state;
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
                      <Comment.Action onClick={this.handleOpenReplyForm(comment.id)}>
                        Reply
                      </Comment.Action>
                      {showReplyForm && selectedCommentId === comment.id && (
                        <EventDetailedChatForm
                          addEventComment={addEventComment}
                          eventId={eventId}
                          form={`reply_${comment.id}`}
                          closeForm = {this.handleCloseReplyForm}
                          parentId = {comment.id}
                        />
                      )}
                    </Comment.Actions>
                  </Comment.Content>
                  {/* here add the replies */}
                  { 
                    comment.childNodes && comment.childNodes.map((child) => (

                      <Comment.Group>
                      <Comment>
                  <Comment.Avatar src={child.photoURL} />
                  <Comment.Content>
                    <Comment.Author as={Link} to={`/profile/${child.uid}`}>
                      {comment.displayName}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>{distanceInWords(child.date, Date.now())}</div>
                    </Comment.Metadata>
                    <Comment.Text>{child.text}</Comment.Text>
                    <Comment.Actions>
                      {/* <Comment.Action onClick={this.handleOpenReplyForm(child.id)}>
                        Reply
                      </Comment.Action> */}
                      {showReplyForm && selectedCommentId === child.id && (
                        <EventDetailedChatForm
                        addEventComment={addEventComment}
                        eventId={eventId}
                        form={`reply_${child.id}`}
                        closeForm = {this.handleCloseReplyForm}
                        parentId = {child.parentId}
                        />
                        )}
                    </Comment.Actions>
                  </Comment.Content>

                  
                </Comment>
                    </Comment.Group>
                ))}

                  
                </Comment>
              </Comment.Group>
            ))}
          <EventDetailedChatForm
            addEventComment={addEventComment}
            eventId={eventId}
            form={'newComment'}
            parentId ={0}
          />
        </Segment>
      </div>
    );
  }
}

export default EventDetailedChat;
