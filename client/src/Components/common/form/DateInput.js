import React, { Component } from "react";
import { Form, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import { isValid } from 'date-fns';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";


class DateInput extends Component {
  
  render () {
    const {
      //value and onChange and all of the other properties
      input: { value, onChange, ...restInput },
      width,
      placeholder,
      meta: { touched, error },
      ...rest
    } = this.props; 
  return (
    
    <Form.Field error={touched && !!error} width={width}>
      <DatePicker
        {...rest}
        placeholderText={placeholder}
        selected = {value && isValid(new Date(value)) ? moment(value) : null}
        onChange={onChange}
        {...restInput}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
}
}

export default DateInput;
