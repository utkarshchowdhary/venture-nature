import React from 'react'
import { withRouter } from 'react-router-dom'

import Avatar from '../Avatar/Avatar'

import './UserItem.scss'

const UserItem = ({ user, history, match }) => {
  const { id, name, ventures } = user

  return (
    <div
      className="user-item"
      onClick={() => history.push(`${match.path}${id}/ventures`)}
    >
      <div className="user-item__image">
        <Avatar
          image={`${process.env.REACT_APP_BACKEND_URL}/users/${id}/avatar`}
          alt={name}
        />
      </div>
      <div className="user-item__info">
        <h2>{name}</h2>
        <h3>
          {ventures} {ventures === 1 ? 'Venture' : 'Ventures'}
        </h3>
      </div>
    </div>
  )
}

export default withRouter(UserItem)
