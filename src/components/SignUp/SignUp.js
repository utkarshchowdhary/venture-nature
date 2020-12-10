import React, { useContext } from 'react'

import Input from '../Input/Input'
import Button from '../Button/Button'
import ImageUpload from '../ImageUpload/ImageUpload'
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE
} from '../../utils/validators'
import useForm from '../../hooks/useForm'
import AuthContext from '../../context/AuthContext'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import ErrorModal from '../ErrorModal/ErrorModal'
import useHttpClient from '../../hooks/useHttpClient'

import './SignUp.scss'

const SignUp = () => {
  const auth = useContext(AuthContext)
  const { isLoading, error, dispatchRequest, clearError } = useHttpClient()

  const [formState, inputHandler] = useForm(
    {
      name: { value: '', isValid: false },
      signUpEmail: { value: '', isValid: false },
      signUpPassword: { value: '', isValid: false },
      avatar: { value: null, isValid: false }
    },
    false
  )

  const signUpSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append('name', formState.inputs.name.value)
      formData.append('email', formState.inputs.signUpEmail.value)
      formData.append('password', formState.inputs.signUpPassword.value)
      formData.append('avatar', formState.inputs.avatar.value)

      const responseData = await dispatchRequest(
        'http://localhost:5000/users/signup',
        'POST',
        formData
      )

      auth.login(responseData.data.id)
    } catch (err) {}
  }

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />
      {isLoading && <LoadingSpinner />}
      <div className="sign-up">
        <h2>I do not have a account</h2>
        <span>Sign up with your name, email and password</span>
        <div className="sign-up__form">
          <form onSubmit={signUpSubmitHandler}>
            <ImageUpload id="avatar" onInput={inputHandler} />
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
              id="signUpEmail"
              type="email"
              label="Email"
              autoComplete="username"
              validators={[VALIDATOR_EMAIL()]}
              error="Please enter a valid email."
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="signUpPassword"
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
