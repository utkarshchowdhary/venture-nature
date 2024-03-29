import React, { useState, useContext } from 'react'

import MapModal from '../MapModal/MapModal'
import DeleteModal from '../DeleteModal/DeleteModal'
import Button from '../Button/Button'
import AuthContext from '../../context/AuthContext'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import ErrorModal from '..//ErrorModal/ErrorModal'
import useHttpClient from '../../hooks/useHttpClient'

import './VentureItem.scss'

const VentureItem = ({ venture, onDeleteVenture }) => {
  const { isLoading, error, dispatchRequest, clearError } = useHttpClient()
  const auth = useContext(AuthContext)
  const [showMap, setShowMap] = useState(false)
  const [showDeleteWarning, setShowDeleteWarning] = useState(false)

  const openMapHandler = () => setShowMap(true)
  const closeMapHandler = () => setShowMap(false)

  const showDeleteWarningHandler = () => setShowDeleteWarning(true)
  const cancelDeleteWarningHandler = () => setShowDeleteWarning(false)

  const confirmDeleteHandler = async () => {
    setShowDeleteWarning(false)

    try {
      await dispatchRequest(
        `${process.env.REACT_APP_BACKEND_URL}/ventures/${venture.id}`,
        'DELETE',
        null,
        {
          Authorization: `Bearer ${auth.token}`
        }
      )

      onDeleteVenture(venture.id)
    } catch (err) {}
  }

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />
      {isLoading && <LoadingSpinner />}
      <MapModal
        show={showMap}
        onCancel={closeMapHandler}
        location={venture.location}
      />
      <DeleteModal
        show={showDeleteWarning}
        onCancel={cancelDeleteWarningHandler}
        onConfirmDelete={confirmDeleteHandler}
      />
      <div className="venture-item">
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/ventures/${venture.id}/image`}
          alt={venture.title}
        ></img>
        <div className="venture-item__info">
          <h2>{venture.title}</h2>
          <h3>{venture.location.formattedAddress}</h3>
          <p>{venture.description}</p>
        </div>
        <div className="venture-item__actions">
          <Button inverse onClick={openMapHandler}>
            VIEW ON MAP
          </Button>
          {auth.userId === venture.creator && (
            <Button to={`/ventures/${venture.id}`}>EDIT</Button>
          )}
          {auth.userId === venture.creator && (
            <Button danger onClick={showDeleteWarningHandler}>
              DELETE
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

export default VentureItem
