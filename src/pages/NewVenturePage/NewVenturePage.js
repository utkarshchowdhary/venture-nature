import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'

import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import ImageUpload from '../../components/ImageUpload/ImageUpload'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../utils/validators'
import useForm from '../../hooks/useForm'
import AuthContext from '../../context/AuthContext'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import ErrorModal from '../../components/ErrorModal/ErrorModal'
import useHttpClient from '../../hooks/useHttpClient'

import './NewVenturePage.scss'

const NewVenturePage = ({ history }) => {
  const auth = useContext(AuthContext)
  const { isLoading, error, dispatchRequest, clearError } = useHttpClient()
  const { formState, inputHandler } = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
      address: { value: '', isValid: false },
      image: { value: null, isValid: false }
    },
    false
  )

  const ventureNewSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append('title', formState.inputs.title.value)
      formData.append('description', formState.inputs.description.value)
      formData.append('address', formState.inputs.address.value)
      formData.append('image', formState.inputs.image.value)

      await dispatchRequest(
        `${process.env.REACT_APP_BACKEND_URL}/ventures`,
        'POST',
        formData,
        {
          Authorization: `Bearer ${auth.token}`
        }
      )

      history.push('/')
    } catch (err) {}
  }

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />
      {isLoading && <LoadingSpinner />}
      <div className="new-venture-page">
        <ImageUpload id="image" onInput={inputHandler} />
        <form onSubmit={ventureNewSubmitHandler}>
          <Input
            element="input"
            id="title"
            type="text"
            label="Title"
            value={formState.inputs.title.value}
            validators={[VALIDATOR_REQUIRE()]}
            isValid={formState.inputs.title.isValid}
            error="Please enter a valid title."
            onInput={inputHandler}
          />
          <Input
            element="textarea"
            rows={3}
            id="description"
            label="Description"
            value={formState.inputs.description.value}
            validators={[VALIDATOR_MINLENGTH(5)]}
            isValid={formState.inputs.description.isValid}
            error="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="address"
            type="text"
            label="Address"
            value={formState.inputs.address.value}
            validators={[VALIDATOR_REQUIRE()]}
            isValid={formState.inputs.address.isValid}
            error="Please enter a valid address."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            ADD VENTURE
          </Button>
        </form>
      </div>
    </>
  )
}

export default withRouter(NewVenturePage)
