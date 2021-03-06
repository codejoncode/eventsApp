import React from "react";
import { connect } from "react-redux";
import { Form, Segment, Button, Label, Divider } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../common/form/TextInput";
import { login, socialLogin } from "../authActions";
import SocialLogin from '../SocialLogin/SocialLogin';

const actions = {
  login,
  socialLogin
};
//handleSubmit comes from redux-form
const LoginForm = ({ login, handleSubmit, error, socialLogin, submitting }) => {
  return (
    <Form size="large" onSubmit={handleSubmit(login)}>
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />
        {error && <Label basic color="red">{error}</Label>}
        <Button loading = {submitting} fluid size="large" color="teal">
          Login
        </Button>
        <Divider horizontal>
        Or
        </Divider>
        <SocialLogin socialLogin = {socialLogin}/>
      </Segment>
    </Form>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: "loginForm" })(LoginForm));
