import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'

import Button from '../Button/Button'
import VentureItem from '../VentureItem/VentureItem'
import AuthContext from '../../context/AuthContext'

import './VenturesList.scss'

const VenturesList = ({ ventures, onDeleteVenture, match }) => {
  const auth = useContext(AuthContext)
  const { userId } = match.params

  return (
    <div className="ventures-list">
      {!ventures.length && (
        <div className="ventures-list__empty">
          <h2>
            No Ventures found.
            {auth.userId === userId && <span> Maybe create one?</span>}
          </h2>
          {auth.userId === userId && (
            <Button to="/ventures/new">Share Venture</Button>
          )}
        </div>
      )}
      {ventures.map((venture) => (
        <VentureItem
          key={venture.id}
          venture={venture}
          onDeleteVenture={onDeleteVenture}
        />
      ))}
    </div>
  )
}

export default withRouter(VenturesList)
