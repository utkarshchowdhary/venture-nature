import React from 'react'

import Button from '../Button/Button'
import VentureItem from '../VentureItem/VentureItem'

import './VenturesList.scss'

const VenturesList = ({ ventures, onDeleteVenture }) => {
  return (
    <div className="ventures-list">
      {ventures.length === 0 && (
        <div className="ventures-list__empty">
          <h2>No Ventures found. Maybe create one?</h2>
          <Button to="/ventures/new">Share Venture</Button>
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

export default VenturesList
