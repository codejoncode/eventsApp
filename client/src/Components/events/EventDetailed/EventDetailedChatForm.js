import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextArea from '../../common/form/TextArea'

class EventDetailedChatForm extends Component {

  handleCommentSubmit = (values) => {
      //reset comes from reduxForm being connected
      const {addEventComment, reset, eventId, closeForm, parentId} = this.props;
      addEventComment(eventId, values, parentId); 
      reset(); 
      if(parentId !== 0){
        closeForm(); 
      }
  }
  render() {
    return (
      <Form onSubmit = {this.props.handleSubmit(this.handleCommentSubmit)}>
        <Field 
           
           name = 'comment'
           type = 'text'
           component = {TextArea}
           rows = {2} 
        />
        <Button content="Add Reply" labelPosition="left" icon="edit" primary />
      </Form>
    );
  }
}
export default reduxForm({Fields: 'comment'})(EventDetailedChatForm);
