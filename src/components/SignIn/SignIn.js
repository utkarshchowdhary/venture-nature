import React, { useContext } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../utils/validators';
import useForm from '../../hooks/useForm';
import AuthContext from '../../context/AuthContext';

import './SignIn.scss';

const SignIn = () => {
  const auth = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      beemail: { value: '', isValid: false },
      bepassword: { value: '', isValid: false },
    },
    false
  );

  const signInSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState);
    auth.login();
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <div className="sign-in__form">
        <form onSubmit={signInSubmitHandler}>
          <Input
            element="input"
            id="beemail"
            type="email"
            label="Email"
            autoComplete="username"
            validators={[VALIDATOR_EMAIL()]}
            error="Please enter a valid email."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="bepassword"
            type="password"
            label="Password"
            autoComplete="current-password"
            validators={[VALIDATOR_MINLENGTH(8)]}
            error="Please enter a valid password (at least 8 characters)."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            SIGN IN
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
