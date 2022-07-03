import React, { useContext } from 'react'

import Button from '../Button/Button'
import Input from '../Input/Input'
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../utils/validators'
import useForm from '../../hooks/useForm'
import AuthContext from '../../context/AuthContext'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import ErrorModal from '../ErrorModal/ErrorModal'
import useHttpClient from '../../hooks/useHttpClient'

import './SignIn.scss'

const SignIn = () => {
  const auth = useContext(AuthContext)
  const { isLoading, error, dispatchRequest, clearError } = useHttpClient()

  const { formState, inputHandler } = useForm(
    {
      signInEmail: { value: '', isValid: false },
      signInPassword: { value: '', isValid: false }
    },
    false
  )

  const signInSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const {
        token,
        data: { id }
      } = await dispatchRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
        'POST',
        JSON.stringify({
          email: formState.inputs.signInEmail.value,
          password: formState.inputs.signInPassword.value
        }),
        {
          'Content-Type': 'application/json'
        }
      )

      auth.login(id, token)
    } catch (err) {}
  }

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />
      {isLoading && <LoadingSpinner />}
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <div className="sign-in__form">
          <form onSubmit={signInSubmitHandler}>
            <Input
              element="input"
              id="signInEmail"
              type="email"
              label="Email"
              autoComplete="username"
              value={formState.inputs.signInEmail.value}
              validators={[VALIDATOR_EMAIL()]}
              isValid={formState.inputs.signInEmail.isValid}
              error="Please enter a valid email."
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="signInPassword"
              type="password"
              label="Password"
              autoComplete="current-password"
              value={formState.inputs.signInPassword.value}
              validators={[VALIDATOR_MINLENGTH(8)]}
              isValid={formState.inputs.signInPassword.isValid}
              error="Please enter a valid password (at least 8 characters)."
              onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
              SIGN IN
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignIn
