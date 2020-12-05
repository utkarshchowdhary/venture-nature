import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../utils/validators'
import useForm from '../../hooks/useForm'

import './UpdateVenturePage.scss'

const ventures = [
  {
    id: 'u1',
    title: 'Empire State Building',
    description: 'One of the famous sky scrapers in the world ',
    image: 'https://images.alphacoders.com/302/302721.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484,
      lng: -73.9857
    },
    creator: 'u1'
  },
  {
    id: 'u2',
    title: 'Leaning Tower Of Pisa',
    description:
      "We can't choose where we come from, but we can choose where we go",
    image: 'https://images6.alphacoders.com/409/409802.jpg',
    address: 'Piazza del Duomo, 56126 Pisa PI, Italy',
    location: {
      lat: 43.723,
      lng: 10.3966
    },
    creator: 'u2'
  }
]

const UpdateVenturePage = ({ match }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false }
    },
    false
  )

  const identifiedVenture = ventures.find(
    (venture) => venture.id === match.params.ventureId
  )

  useEffect(() => {
    if (identifiedVenture) {
      setFormData(
        {
          title: { value: identifiedVenture.title, isValid: true },
          description: { value: identifiedVenture.description, isValid: true }
        },
        true
      )
    }
    setIsLoading(false)
  }, [setFormData, identifiedVenture])

  const ventureUpdateSubmitHandler = (e) => {
    e.preventDefault()
    console.log(formState.inputs)
  }

  if (!identifiedVenture) {
    return <h2>Could not find venture!</h2>
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <div className="update-venture-page">
      <form onSubmit={ventureUpdateSubmitHandler}>
        <Input
          element="input"
          id="title"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          error="Please enter a valid title."
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
          initialValid={formState.inputs.title.isValid}
        />
        <Input
          element="textarea"
          rows={3}
          id="description"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          error="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialValid={formState.inputs.description.isValid}
        />
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE VENTURE
        </Button>
      </form>
    </div>
  )
}

export default withRouter(UpdateVenturePage)
