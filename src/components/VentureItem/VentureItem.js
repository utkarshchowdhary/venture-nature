import React, { useState, useContext } from 'react'

import MapModal from '../MapModal/MapModal'
import DeleteModal from '../DeleteModal/DeleteModal'
import Button from '../Button/Button'
import AuthContext from '../../context/AuthContext'

import './VentureItem.scss'

const VentureItem = ({ venture }) => {
  const auth = useContext(AuthContext)
  const [showMap, setShowMap] = useState(false)
  const [showDeleteWarning, setShowDeleteWarning] = useState(false)

  const openMapHandler = () => setShowMap(true)

  const closeMapHandler = () => setShowMap(false)

  const showDeleteWarningHandler = () => setShowDeleteWarning(true)

  const cancelDeleteWarningHandler = () => setShowDeleteWarning(false)

  const confirmDeleteHandler = () => {
    setShowDeleteWarning(false)
    console.log('Deleting...')
  }

  return (
    <>
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
        <div className="venture-item__content">
          <div className="venture-item__image">
            <img src={venture.image} alt={venture.title}></img>
          </div>
          <div className="venture-item__info">
            <h2>{venture.title}</h2>
            <h3>{venture.location.formattedAddress}</h3>
            <p>{venture.description}</p>
          </div>
          <div className="venture-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.isLoggedIn && (
              <Button to={`/ventures/${venture.id}`}>EDIT</Button>
            )}
            {auth.isLoggedIn && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default VentureItem
