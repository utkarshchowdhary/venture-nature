import React, { useEffect, useState, useContext } from 'react'
import { withRouter } from 'react-router-dom'

import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validators'
import useForm from '../../hooks/useForm'
import AuthContext from '../../context/AuthContext'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import ErrorModal from '../../components/ErrorModal/ErrorModal'
import useHttpClient from '../../hooks/useHttpClient'

import './UpdateVenturePage.scss'

const UpdateVenturePage = ({ match, history }) => {
  const { isLoading, error, dispatchRequest, clearError } = useHttpClient()
  const [venture, setVenture] = useState(null)
  const auth = useContext(AuthContext)
  const { ventureId } = match.params

  const { formState, inputHandler, setFormData } = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false }
    },
    false
  )

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await dispatchRequest(
          `${process.env.REACT_APP_BACKEND_URL}/ventures/${ventureId}`
        )

        setVenture(data)
        setFormData(
          {
            title: { value: data.title, isValid: true },
            description: { value: data.description, isValid: true }
          },
          true
        )
      } catch (err) {}
    })()
  }, [dispatchRequest, setFormData, ventureId])

  const ventureUpdateSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      await dispatchRequest(
        `${process.env.REACT_APP_BACKEND_URL}/ventures/${ventureId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`
        }
      )

      history.push(`/${auth.userId}/ventures`)
    } catch (err) {}
  }

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />
      {isLoading && <LoadingSpinner />}
      <div className="update-venture-page">
        {!isLoading && !venture && (
          <div className="update-venture__empty">Could not find venture!</div>
        )}
        {!isLoading && venture && (
          <form
            className="update-venture__form"
            onSubmit={ventureUpdateSubmitHandler}
          >
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
              initialValue={venture.title}
              initialValid={true}
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
              initialValue={venture.description}
              initialValid={true}
            />
            <Button type="submit" disabled={!formState.isValid}>
              UPDATE VENTURE
            </Button>
          </form>
        )}
      </div>
    </>
  )
}

export default withRouter(UpdateVenturePage)
