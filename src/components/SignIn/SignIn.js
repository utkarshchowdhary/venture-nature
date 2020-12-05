import React, { useContext, useState } from 'react'

import Input from '../Input/Input'
import Button from '../Button/Button'
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../utils/validators'
import useForm from '../../hooks/useForm'
import AuthContext from '../../context/AuthContext'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import ErrorModal from '../ErrorModal/ErrorModal'

import './SignIn.scss'

const SignIn = () => {
  const auth = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const [formState, inputHandler] = useForm(
    {
      hasEmail: { value: '', isValid: false },
      hasPassword: { value: '', isValid: false }
    },
    false
  )

  const signInSubmitHandler = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formState.inputs.hasEmail.value,
          password: formState.inputs.hasPassword.value
        })
      })

      const responseData = await response.json()
      if (!response.ok) {
        throw new Error(responseData.message)
      }
      setIsLoading(false)
      auth.login()
    } catch (err) {
      setIsLoading(false)
      setError(err.message)
    }
  }

  const errorHandler = () => {
    setError(null)
  }

  return (
    <>
      <ErrorModal error={error} onCancel={errorHandler} />
      {isLoading && <LoadingSpinner />}
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <div className="sign-in__form">
          <form onSubmit={signInSubmitHandler}>
            <Input
              element="input"
              id="hasEmail"
              type="email"
              label="Email"
              autoComplete="username"
              validators={[VALIDATOR_EMAIL()]}
              error="Please enter a valid email."
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="hasPassword"
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
