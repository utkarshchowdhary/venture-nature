import React, { useContext } from 'react'

import Input from '../Input/Input'
import Button from '../Button/Button'
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

  const [formState, inputHandler] = useForm(
    {
      signInEmail: { value: '', isValid: false },
      signInPassword: { value: '', isValid: false }
    },
    false
  )

  const signInSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const responseData = await dispatchRequest(
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

      auth.login(responseData.data.id, responseData.token)
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
              validators={[VALIDATOR_EMAIL()]}
              error="Please enter a valid email."
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="signInPassword"
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
    </>
  )
}

export default SignIn
