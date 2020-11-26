import React, { useContext } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from '../../utils/validators';
import useForm from '../../hooks/useForm';
import AuthContext from '../../context/AuthContext';

import './SignUp.scss';

const SignUp = () => {
  const auth = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      name: { value: '', isValid: false },
      email: { value: '', isValid: false },
      password: { value: '', isValid: false },
    },
    false
  );

  const signUpSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState);
    auth.login();
  };

  return (
    <div className="sign-up">
      <h2>I do not have a account</h2>
      <span>Sign up with your name, email and password</span>
      <div className="sign-up__form">
        <form onSubmit={signUpSubmitHandler}>
          <Input
            element="input"
            id="name"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            error="Please enter a valid name."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="email"
            type="email"
            label="Email"
            autoComplete="username"
            validators={[VALIDATOR_EMAIL()]}
            error="Please enter a valid email."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            autoComplete="new-password"
            validators={[VALIDATOR_MINLENGTH(8)]}
            error="Please enter a valid password (at least 8 characters)."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            SIGN UP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
