import React, { Component } from "react";
import { Form, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";


class DateInput extends Component {
  
  render () {
    const {
      //value and onChange and all of the other properties
      input: { value, onChange, onBlur, ...restInput },
      width,
      placeholder,
      meta: { touched, error },
      ...rest
    } = this.props; 
    let newValue;
    if (value) {
      console.log(value)
      newValue = moment(value, 'X')
    }
  return (
    
    <Form.Field error={touched && !!error} width={width}>
      <DatePicker
        {...rest}
        placeholderText={placeholder}
        // selected = {value && isValid(new Date(value)) ? moment(value) : null} import { isValid } from 'date-fns';
        selected = {newValue ? moment(newValue) : null}
        onChange={onChange}
        onBlur={() => onBlur()}
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
