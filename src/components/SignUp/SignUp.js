import React, { useContext, useState } from 'react'

import Input from '../Input/Input'
import Button from '../Button/Button'
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE
} from '../../utils/validators'
import useForm from '../../hooks/useForm'
import AuthContext from '../../context/AuthContext'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import ErrorModal from '../ErrorModal/ErrorModal'

import './SignUp.scss'

const SignUp = () => {
  const auth = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const [formState, inputHandler] = useForm(
    {
      name: { value: '', isValid: false },
      email: { value: '', isValid: false },
      password: { value: '', isValid: false }
    },
    false
  )

  const signUpSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      const response = await fetch('http://localhost:5000/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
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
    </>
  )
}

export default SignUp
